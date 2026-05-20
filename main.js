const ether = document.querySelector(".liquid-ether");
document.documentElement.classList.remove("custom-cursor");

if (ether) {
  let targetX = 0.5;
  let targetY = 0.48;
  let currentX = targetX;
  let currentY = targetY;
  let softX = 0.52;
  let softY = 0.42;
  let velocity = 0;
  let lastX = window.innerWidth * targetX;
  let lastY = window.innerHeight * targetY;
  let lastMoveTime = performance.now();

  const setEtherTarget = (clientX, clientY) => {
    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.innerHeight);
    const now = performance.now();
    const distance = Math.hypot(clientX - lastX, clientY - lastY);
    const delta = Math.max(16, now - lastMoveTime);

    targetX = clientX / width;
    targetY = clientY / height;
    velocity = Math.min(1, distance / delta / 1.4);
    lastX = clientX;
    lastY = clientY;
    lastMoveTime = now;
  };

  const renderEther = () => {
    const now = performance.now() * 0.00018;
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;
    softX += (targetX + Math.sin(now * 9) * 0.08 - softX) * 0.035;
    softY += (targetY + Math.cos(now * 7) * 0.07 - softY) * 0.035;
    velocity *= 0.92;

    ether.style.setProperty("--ether-x", `${(currentX * 100).toFixed(2)}%`);
    ether.style.setProperty("--ether-y", `${(currentY * 100).toFixed(2)}%`);
    ether.style.setProperty("--ether-x-soft", `${(softX * 100).toFixed(2)}%`);
    ether.style.setProperty("--ether-y-soft", `${(softY * 100).toFixed(2)}%`);
    ether.style.setProperty("--ether-scale", (1 + velocity * 0.18).toFixed(3));

    requestAnimationFrame(renderEther);
  };

  window.addEventListener("pointermove", (event) => setEtherTarget(event.clientX, event.clientY));
  requestAnimationFrame(renderEther);
}

const galaxyContainer = document.querySelector(".galaxy-container");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (galaxyContainer && !prefersReducedMotion) {
  const galaxyPointerTarget = galaxyContainer.closest(".contact-panel") || galaxyContainer;
  const vertexShader = `
    attribute vec2 uv;
    attribute vec2 position;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fragmentShader = `
    precision highp float;

    uniform float uTime;
    uniform vec3 uResolution;
    uniform vec2 uFocal;
    uniform vec2 uRotation;
    uniform float uStarSpeed;
    uniform float uDensity;
    uniform float uHueShift;
    uniform float uSpeed;
    uniform vec2 uMouse;
    uniform float uGlowIntensity;
    uniform float uSaturation;
    uniform bool uMouseRepulsion;
    uniform float uTwinkleIntensity;
    uniform float uRotationSpeed;
    uniform float uRepulsionStrength;
    uniform float uMouseActiveFactor;
    uniform float uAutoCenterRepulsion;
    uniform bool uTransparent;

    varying vec2 vUv;

    #define NUM_LAYER 4.0
    #define STAR_COLOR_CUTOFF 0.2
    #define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
    #define PERIOD 3.0

    float Hash21(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float tri(float x) {
      return abs(fract(x) * 2.0 - 1.0);
    }

    float tris(float x) {
      float t = fract(x);
      return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
    }

    float trisn(float x) {
      float t = fract(x);
      return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
    }

    vec3 hsv2rgb(vec3 c) {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    float Star(vec2 uv, float flare) {
      float d = length(uv);
      float m = (0.05 * uGlowIntensity) / d;
      float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
      m += rays * flare * uGlowIntensity;
      uv *= MAT45;
      rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
      m += rays * 0.3 * flare * uGlowIntensity;
      m *= smoothstep(1.0, 0.2, d);
      return m;
    }

    vec3 StarLayer(vec2 uv) {
      vec3 col = vec3(0.0);
      vec2 gv = fract(uv) - 0.5;
      vec2 id = floor(uv);

      for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
          vec2 offset = vec2(float(x), float(y));
          vec2 si = id + offset;
          float seed = Hash21(si);
          float size = fract(seed * 345.32);
          float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
          float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

          float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
          float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
          float grn = min(red, blu) * seed;
          vec3 base = vec3(red, grn, blu);

          float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
          hue = fract(hue + uHueShift / 360.0);
          float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
          float val = max(max(base.r, base.g), base.b);
          base = hsv2rgb(vec3(hue, sat, val));

          vec2 pad = vec2(
            tris(seed * 34.0 + uTime * uSpeed / 10.0),
            tris(seed * 38.0 + uTime * uSpeed / 30.0)
          ) - 0.5;

          float star = Star(gv - offset - pad, flareSize);
          float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
          star *= mix(1.0, twinkle, uTwinkleIntensity);
          col += star * size * base;
        }
      }

      return col;
    }

    void main() {
      vec2 focalPx = uFocal * uResolution.xy;
      vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;
      vec2 mouseNorm = uMouse - vec2(0.5);

      if (uAutoCenterRepulsion > 0.0) {
        float centerDist = length(uv);
        vec2 repulsion = normalize(uv) * (uAutoCenterRepulsion / (centerDist + 0.1));
        uv += repulsion * 0.05;
      } else if (uMouseRepulsion) {
        vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
        float mouseDist = length(uv - mousePosUV);
        vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
        uv += repulsion * 0.05 * uMouseActiveFactor;
      } else {
        uv += mouseNorm * 0.1 * uMouseActiveFactor;
      }

      float autoRotAngle = uTime * uRotationSpeed;
      mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
      uv = autoRot * uv;
      uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

      vec3 col = vec3(0.0);
      for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
        float depth = fract(i + uStarSpeed * uSpeed);
        float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
        float fade = depth * smoothstep(1.0, 0.9, depth);
        col += StarLayer(uv * scale + i * 453.32) * fade;
      }

      float starLight = max(max(col.r, col.g), col.b);
      vec3 brandBlue = vec3(0.0, 0.184, 0.655);
      vec3 haloBlue = vec3(0.22, 0.52, 1.0);
      vec3 highlightBlue = vec3(0.82, 0.92, 1.0);
      float halo = smoothstep(0.01, 0.16, starLight);
      float core = smoothstep(0.10, 0.38, starLight);
      float highlight = smoothstep(0.54, 1.16, starLight);
      col = mix(haloBlue, brandBlue, core);
      col = mix(col, highlightBlue, highlight);

      if (uTransparent) {
        float alpha = max(halo * 0.46, core * 0.9);
        alpha = max(alpha, highlight);
        gl_FragColor = vec4(col, min(alpha, 1.0));
      } else {
        gl_FragColor = vec4(col, 1.0);
      }
    }
  `;

  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: false,
    antialias: false
  });

  if (gl) {
    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vert = compileShader(gl.VERTEX_SHADER, vertexShader);
    const frag = compileShader(gl.FRAGMENT_SHADER, fragmentShader);
    const program = gl.createProgram();

    if (vert && frag && program) {
      gl.attachShader(program, vert);
      gl.attachShader(program, frag);
      gl.linkProgram(program);

      if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const position = gl.getAttribLocation(program, "position");
        const uv = gl.getAttribLocation(program, "uv");
        const uniforms = {
          uTime: gl.getUniformLocation(program, "uTime"),
          uResolution: gl.getUniformLocation(program, "uResolution"),
          uFocal: gl.getUniformLocation(program, "uFocal"),
          uRotation: gl.getUniformLocation(program, "uRotation"),
          uStarSpeed: gl.getUniformLocation(program, "uStarSpeed"),
          uDensity: gl.getUniformLocation(program, "uDensity"),
          uHueShift: gl.getUniformLocation(program, "uHueShift"),
          uSpeed: gl.getUniformLocation(program, "uSpeed"),
          uMouse: gl.getUniformLocation(program, "uMouse"),
          uGlowIntensity: gl.getUniformLocation(program, "uGlowIntensity"),
          uSaturation: gl.getUniformLocation(program, "uSaturation"),
          uMouseRepulsion: gl.getUniformLocation(program, "uMouseRepulsion"),
          uTwinkleIntensity: gl.getUniformLocation(program, "uTwinkleIntensity"),
          uRotationSpeed: gl.getUniformLocation(program, "uRotationSpeed"),
          uRepulsionStrength: gl.getUniformLocation(program, "uRepulsionStrength"),
          uMouseActiveFactor: gl.getUniformLocation(program, "uMouseActiveFactor"),
          uAutoCenterRepulsion: gl.getUniformLocation(program, "uAutoCenterRepulsion"),
          uTransparent: gl.getUniformLocation(program, "uTransparent")
        };

        const vertexData = new Float32Array([
          -1, -1, 0, 0,
          3, -1, 2, 0,
          -1, 3, 0, 2
        ]);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 16, 0);
        gl.enableVertexAttribArray(uv);
        gl.vertexAttribPointer(uv, 2, gl.FLOAT, false, 16, 8);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.clearColor(0, 0, 0, 0);
        galaxyContainer.appendChild(canvas);

        const targetMouse = { x: 0.5, y: 0.5 };
        const smoothMouse = { x: 0.5, y: 0.5 };
        let targetMouseActive = 0;
        let smoothMouseActive = 0;

        const resizeGalaxy = () => {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const width = Math.max(1, Math.floor(galaxyContainer.offsetWidth * dpr));
          const height = Math.max(1, Math.floor(galaxyContainer.offsetHeight * dpr));
          if (canvas.width === width && canvas.height === height) return;
          canvas.width = width;
          canvas.height = height;
          gl.viewport(0, 0, width, height);
        };

        const handleGalaxyMouseMove = (event) => {
          const rect = galaxyContainer.getBoundingClientRect();
          targetMouse.x = (event.clientX - rect.left) / rect.width;
          targetMouse.y = 1 - (event.clientY - rect.top) / rect.height;
          targetMouseActive = 1;
        };

        galaxyPointerTarget.addEventListener("mousemove", handleGalaxyMouseMove);
        galaxyPointerTarget.addEventListener("mouseleave", () => {
          targetMouseActive = 0;
        });
        window.addEventListener("resize", resizeGalaxy);
        resizeGalaxy();

        const renderGalaxy = (time) => {
          resizeGalaxy();
          smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.05;
          smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.05;
          smoothMouseActive += (targetMouseActive - smoothMouseActive) * 0.05;

          gl.useProgram(program);
          gl.uniform1f(uniforms.uTime, time * 0.001);
          gl.uniform3f(uniforms.uResolution, canvas.width, canvas.height, canvas.width / canvas.height);
          gl.uniform2f(uniforms.uFocal, 0.5, 0.5);
          gl.uniform2f(uniforms.uRotation, 1.0, 0.0);
          gl.uniform1f(uniforms.uStarSpeed, (time * 0.001 * 0.5) / 10.0);
          gl.uniform1f(uniforms.uDensity, 1.0);
          gl.uniform1f(uniforms.uHueShift, 205.0);
          gl.uniform1f(uniforms.uSpeed, 1.0);
          gl.uniform2f(uniforms.uMouse, smoothMouse.x, smoothMouse.y);
          gl.uniform1f(uniforms.uGlowIntensity, 0.38);
          gl.uniform1f(uniforms.uSaturation, 0.7);
          gl.uniform1i(uniforms.uMouseRepulsion, 1);
          gl.uniform1f(uniforms.uTwinkleIntensity, 0.3);
          gl.uniform1f(uniforms.uRotationSpeed, 0.08);
          gl.uniform1f(uniforms.uRepulsionStrength, 2.0);
          gl.uniform1f(uniforms.uMouseActiveFactor, smoothMouseActive);
          gl.uniform1f(uniforms.uAutoCenterRepulsion, 0.0);
          gl.uniform1i(uniforms.uTransparent, 1);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.drawArrays(gl.TRIANGLES, 0, 3);

          requestAnimationFrame(renderGalaxy);
        };

        requestAnimationFrame(renderGalaxy);
      } else {
        console.warn(gl.getProgramInfoLog(program));
      }
    }
  }
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll("[data-reveal]").forEach((element) => {
  revealObserver.observe(element);
});

const sections = [...document.querySelectorAll("section[id]")];
const navLinks = [...document.querySelectorAll(".nav-links a")];
const anchorLinks = [...document.querySelectorAll('a[href^="#"]:not([href="#"])')];

anchorLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();

    const top = target.getBoundingClientRect().top + document.documentElement.scrollTop - 90;
    if (typeof window.scrollTo === "function") {
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      document.documentElement.scrollTop = top;
    }
    history.pushState(null, "", link.getAttribute("href"));
  });
});

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-34% 0px -55% 0px" }
);

sections.forEach((section) => navObserver.observe(section));

document.querySelectorAll(".flip-card").forEach((card) => {
  card.addEventListener("click", () => card.classList.toggle("is-flipped"));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      card.classList.toggle("is-flipped");
    }
  });
});

const cookbook = document.querySelector("#cookbook");
const bookCover = document.querySelector(".book-cover");
const docCards = [...document.querySelectorAll(".doc-card[data-doc-index]")];
const docPages = [...document.querySelectorAll(".doc-page[data-page]")];
const flowPages = [...document.querySelectorAll(".flow-page-content[data-page]")];
const bookReader = document.querySelector(".book-reader");
const bookNavPrev = document.querySelector(".book-nav.prev");
const bookNavNext = document.querySelector(".book-nav.next");
let activeCookbookPage = 0;

const setCookbookPage = (index, shouldOpen = true) => {
  if (!cookbook || !bookReader || docPages.length === 0) return;
  activeCookbookPage = (index + docPages.length) % docPages.length;
  cookbook.classList.toggle("is-open", shouldOpen);
  bookCover?.setAttribute("aria-expanded", String(shouldOpen));
  bookReader.dataset.activePage = String(activeCookbookPage);

  docCards.forEach((card) => {
    card.classList.toggle("is-active", Number(card.dataset.docIndex) === activeCookbookPage);
  });
  docPages.forEach((page) => {
    page.classList.toggle("is-active", Number(page.dataset.page) === activeCookbookPage);
  });
  flowPages.forEach((page) => {
    page.classList.toggle("is-active", Number(page.dataset.page) === activeCookbookPage);
  });
};

const closeCookbook = () => {
  if (!cookbook || !bookReader) return;
  cookbook.classList.remove("is-open");
  bookCover?.setAttribute("aria-expanded", "false");
  bookReader.dataset.activePage = String(activeCookbookPage);
};

bookCover?.addEventListener("click", () => {
  const shouldOpen = !cookbook?.classList.contains("is-open");
  setCookbookPage(activeCookbookPage, shouldOpen);
});

bookNavPrev?.addEventListener("click", () => {
  if (activeCookbookPage === 0) {
    closeCookbook();
    return;
  }
  setCookbookPage(activeCookbookPage - 1, true);
});

bookNavNext?.addEventListener("click", () => {
  if (activeCookbookPage === docPages.length - 1) {
    closeCookbook();
    return;
  }
  setCookbookPage(activeCookbookPage + 1, true);
});