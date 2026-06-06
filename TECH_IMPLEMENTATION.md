# 蔡情情 AI 产品经理个人主页技术实施文档

## 1. 技术目标

本项目要用最小技术复杂度实现 `PRD.md` 中定义的单页个人主页，让 AI 产品经理岗位的招聘方、业务负责人和面试官在 30 秒内理解：

- 蔡情情是谁：AI 产品经理、AI native、具备技术背景。
- 为什么可信：有 AI 落地、B 端产品、音视频 PaaS 与高校场景经验。
- 做过什么：可验证的 AI Works、AI Cookbook、AI Toolkit。
- 如何继续沟通：邮箱、GitHub、简历下载入口。

本阶段技术目标不是搭建复杂 Web 应用，而是交付一个可维护、可静态部署、后续易替换内容的单页站点。

## 2. 技术边界

### 2.1 明确不做

- 不引入后端服务。
- 不引入登录系统。
- 不引入数据库。
- 不引入复杂构建链路。
- 不引入 CMS、管理后台或在线编辑器。
- 不为了少量交互引入 React、Next.js、Vue 等框架。

### 2.2 允许的占位

- 外链未确定时统一使用 `TODO: link`。
- 简历下载链接未确定时使用 `TODO: resume-link`。
- 项目链接未确定时使用 `TODO: project-link`。
- Cookbook 链接未确定时使用 `TODO: cookbook-link`。
- 图片或截图缺失时使用统一风格的视觉占位，不显示破图。

## 3. 技术栈

### 3.1 当前方案

- `HTML`：承载页面结构、语义标签、锚点导航和内容模块。
- `CSS`：承载视觉风格、布局、响应式、动效、卡片翻面、自定义光标样式。
- `原生 JavaScript`：承载平滑滚动、导航高亮、滚动显现、Experience 卡片点击翻面、自定义光标跟随。
- `静态部署`：优先 GitHub Pages，也可部署到 Vercel 或 Netlify。

### 3.2 文件组织

当前阶段直接采用多文件组织，避免后续增加项目视觉素材和高级交互时继续堆叠在单个 `index.html` 中：

```text
my_profile/
├── assets/
│   ├── avatars/
│   └── projects/
├── index.html
├── styles.css
├── main.js
├── PRD.md
└── TECH_IMPLEMENTATION.md
```

职责边界：

- `index.html`：页面语义结构、内容模块和资源引用。
- `styles.css`：视觉风格、布局、响应式、动效、翻面卡片和光标样式。
- `main.js`：锚点滚动、导航高亮、滚动显现、卡片翻面、自定义光标等交互。
- `assets/avatars/`：头像或个人视觉素材。
- `assets/projects/`：项目截图、产品界面图和视觉占位素材。

如果后续内容继续增长，再抽出结构化内容配置：

```text
my_profile/
├── index.html
├── assets/
│   ├── avatars/
│   └── projects/
├── data.js
├── styles.css
├── main.js
├── PRD.md
└── TECH_IMPLEMENTATION.md
```

进一步拆分触发条件：

- 项目截图、头像、视觉素材开始增多。
- 经历、项目、文章、工具需要高频更新。
- 高级交互需要独立模块维护。

当前阶段不引入打包器，所有文件仍由浏览器直接加载。

## 4. 页面信息架构

导航固定为：

- `About`
- `AI Works`
- `AI Cookbook`
- `Toolkit`
- `Contact`

页面模块顺序固定为：

1. `Hero` 首屏
2. `Experience` 经历
3. `AI Works` AI 作品集
4. `AI Cookbook` AI 知识库
5. `AI Toolkit` AI 工具箱
6. `Contact` 联系方式

实现时可以让 `About` 锚点落在 Hero 首屏，Experience 紧跟其后。导航不必单独增加 `Experience` 项，以保持 PRD 中的导航简洁性。

## 5. 页面模块实现

### 5.1 Hero

目标：首屏快速建立“蔡情情 / AI 产品经理 / AI native / 有 AI 落地经验”的认知。

必须包含：

- 虚拟头像或头像占位。
- 姓名：`蔡情情`。
- 身份：`AI 产品经理`。
- 定位语：`用产品思维驱动 AI 工作流，打造场景化落地的 AI 应用`。
- 标签：`AI Native PM`、`Vibe Coding Builder`、`Strategy-Driven`。
- CTA：
  - `查看作品集`：滚动到 `#projects`。Hero 首屏不再展示 `下载简历` CTA。

实现要点：

- 首屏高度使用 `min-height`，保证主要视口被 Hero 占据，但露出下一屏一部分内容。
- 主色使用克莱因蓝，背景使用浅灰。
- Hero CTA 使用 `.hero-cta` 做作用域覆盖，保留 `.button.primary` 的语义但改为轻量文字按钮：无实心背景、无重阴影、圆角胶囊感，并包含箭头 icon。
- Hero CTA hover 时使用轻微位移、下划线延展和箭头右移反馈；样式仅作用于 Hero，不能影响 Contact 区域复用的 `.button`。
- 自定义光标只在桌面端启用，移动端回退系统默认交互。

### 5.2 Experience

目标：用倒序时间线展示“AI 探索 + 产品经历 + 技术背景”的连续路径。

必须包含 5 条经历：

- `AI 产品经理｜2026`
- `即构科技｜产品经理｜2022.04 - 2025.06`
- `快手科技｜产品经理｜2021.05 - 2022.02`
- `浙江大学｜硕士｜2018 - 2021`
- `电子科技大学｜本科｜2014 - 2018`

实现要点：

- 卡片按时间倒序展示。
- 使用横向时间轴滑动轨道承载经历卡片，推荐 `display: flex` + `overflow-x: auto` + `scroll-snap-type: x mandatory`。
- 每张卡片采用竖向布局，卡片宽度固定在适合扫读的区间，移动端保持横向滑动而不是退回纵向时间轴。
- 每张卡片正面必须展示视觉图、组织名称、角色、时间、一句话概要和标签。
- 视觉图容器沿用 `.experience-art`，当前显示视窗约为 `264 x 132px`，比例为 `2:1`；素材建议至少 `528 x 264px`，更优为 `792 x 396px` 或 `1024 x 512px`。
- 视觉图以 CSS `background-image` 接入，并使用 `background-size: cover`、`background-position` 按素材单独校准，确保不改变卡片宽高、内边距、时间轴布局和移动端横向滑动行为。
- 5 张视觉图资源依次映射为：`experience_aipm.JPG`、`experience_zego.png`、`experience_kuaishou.png`、`experience_zju.jpg`、`experience_uestc.jpg`，统一放在 `assets/experience/`。
- `.experience-art::before` 继续通过 `data-initial` 输出右下角年份/缩写标识；`.experience-art::after` 椭圆描边已移除，不应恢复。
- 点击或键盘 Enter/Space 翻面，背面展示 100 字以内结构化详情；桌面端 hover 翻面仅作为增强，不作为唯一交互入口。
- 移动端优先保证可读性和点击区域清晰，翻面交互保留点击触发。
- 每张卡片正反面都要展示 3 个标签，避免翻面后上下文丢失。

### 5.3 AI Works

目标：展示可验证的 AI 产品作品，让浏览者理解问题场景、产品角色、AI 能力和结果价值。

初始项目：

- `多模态 AI 问答助手｜高校招生就业场景`
- `面试模拟 skill`
- `“面试模拟+复盘”闭环应用`
- `B端竞品分析 skill`
- `Time Reflection｜时间复盘可视化工具`

实现要点：

- 使用响应式单列卡片列表，桌面端每张卡片保持横向展示：左侧项目图，右侧项目说明。
- 桌面端图片区域使用固定高度区间，当前为 `height: clamp(210px, 18vw, 248px)`，通过 `object-fit: cover` 填充卡片。
- 右侧文字区保持紧凑排布，使用居中对齐和较小 padding；整张项目卡片为跳转链接，“查看项目”仅作为视觉入口。
- 移动端卡片折叠为单列，图片区恢复 `aspect-ratio: 3 / 2`，避免固定高度导致图片过扁。
- 每张项目卡片必须包含：
  - 图片、截图或视觉占位。
  - 项目名称。
  - 场景。
  - 角色。
  - 核心价值。
  - 2-3 个标签。
  - 跳转按钮。
- 当前 5 张项目图统一存放在 `assets/projects/`：
  - `ChatGPT Image 2026年5月20日 00_38_02.png`
  - `ChatGPT Image 2026年5月19日 23_52_19.png`
  - `Interview_digest.png`，交付优先加载压缩后的 `Interview_digest.webp`
  - `ChatGPT Image 2026年5月20日 00_15_46.png`
  - `ChatGPT Image 2026年5月20日 00_43_19.png`
- 真实截图或风格化项目图优先；没有截图时使用统一视觉占位。
- 无链接项目使用 `TODO: project-link`，不要留空。
- hover 态使用更明确的反馈：卡片边框加粗为 2px，背景使用 `padding-box + border-box` 叠层实现蓝色系渐变描边，并叠加轻量 glow。

已知项目链接：

- 多模态 AI 问答助手：`https://zxt.xiaoyibang.com/app?id=oWRkYODiPv`
- 面试模拟 skill：`https://github.com/connieqq/jd-to-interview-mock`
- “面试模拟+复盘”闭环应用：`https://github.com/connieqq/my_profile`
- Time Reflection：`https://github.com/connieqq/timelinefly`

### 5.4 AI Cookbook

目标：轻量展示 AI 方法论、产品思考和学习沉淀，说明“不是只会用工具，而是有自己的方法论体系”。

初始条目：

- `如何把日常工作流蒸馏成 Skills？`
- `AI 新名词“日记”`
- `深度参与杭州 2050 大会的一些思考`
- `AI Builders Daily Digest`

实现要点：

- 当前展示 4-5 个文档条目。
- 默认态使用左侧“图书封面”UI 作为知识库入口和第 0 页，右侧展示文档条目索引。
- 图书封面使用区别于普通卡片的封面视觉，`.book-cta` 输出 `> 点击展开` 入口，文案保持不变；该入口使用立体书签按钮效果，桌面端与移动端均位于封面中部，桌面端适当伸出封面右边缘，主体为紧凑矩形小圆角，`.book-cta::after` 使用 CSS border 生成右下三角折角，折角左侧边界与书本右边缘相连以形成厚度感；底色为浅蓝白半透明渐变，投影保持低强度。
- 文档条目索引每条包含标题、摘要、标签、阅读链接和跳转 icon。
- 点击图书封面时，在封面原位置展开双页书本视图；不要将展开内容插入到模块下方造成页面跳动。
- 点击文档条目时保持默认跳转到文档链接；展开态由图书封面和书本翻页控制。
- 展开态双页结构：左页展示当前文档标题、概述、标签、阅读按钮；右页展示当前文档对应的图标标题和流程图片。
- 右页内容由 `data-page` 驱动切换，4 个标题依次为：`skill 搭建流程`、`open claw 框架图`、`个人转型AI/OPC的入场`、`每日AI 一手消息推送流程`。
- 右页图片资源依次为 `assets/cookbook/cookbook_1.png`、`assets/cookbook/cookbook_2.png`、`assets/cookbook/cookbook_3.png`、`assets/cookbook/cookbook_4.png`；HTML 使用 `<picture>` 优先加载同名 `.webp`，PNG 作为 fallback。
- 替换任意 cookbook PNG 原图后，必须重新生成对应同名 WebP，并同步更新 `<img>` 的 `width` / `height`。当前 `cookbook_1.png` 与 `cookbook_1.webp` 尺寸为 `1441 x 1245`。
- `.book-spread` 桌面端使用固定高度，避免翻页时因流程图宽高比不同导致图书整体高度跳动；右页图片容器占用固定剩余空间，图片使用 `object-fit: contain` 适配书页，保持完整可读，不裁切关键内容。
- 窄屏下 `.book-spread` 使用响应式固定高度和单列上下页布局，翻页按钮不得遮挡阅读按钮，流程图仍在限定区域内等比适配。
- 上一页/下一页按钮按文档页顺序切换；在第 1 页点击上一页、最后一页点击下一页时关闭展开态并回到默认封面。
- 链接为空时统一使用 `TODO: cookbook-link`。
- 页面占比保持轻量，不做完整博客系统。

已知文档链接：

- 如何把日常工作流蒸馏成 Skills？：`https://my.feishu.cn/docx/KoWudeP7DoEbEJxjCBmc8ryynVc`
- AI 新名词“日记”：`https://share.note.youdao.com/s/3HDeJg4A`
- 深度参与杭州 2050 大会的一些思考：`https://my.feishu.cn/docx/YM9hd0w5Coj2D4xREE9cD78DnOb`

### 5.5 AI Toolkit

目标：展示日常 AI 工作流和工具偏好，强化 AI native 人设。

初始工具：

- `NotebookLM`
- `Stitch`
- `Excalidraw Diagram Skill`
- `飞书 CLI`

实现要点：

- 紧跟 AI Cookbook。
- 每项使用单行紧凑条目，减少宽卡片造成的视觉占用。
- 单行结构固定为：产品/Skill 名称 / 标签 / 说明 / 跳转 icon。
- 标签紧跟产品名称之后或放在条目右侧，说明文案在桌面端优先保持单行，移动端允许换行。
- 每项包含名称、核心亮点、标签和跳转链接。
- 链接为空时统一使用 `TODO: toolkit-link`。

已知工具链接：

- NotebookLM：`https://notebooklm.google.com/`
- Stitch：`https://stitch.withgoogle.com/`
- Excalidraw Diagram Skill：`https://github.com/coleam00/excalidraw-diagram-skill`
- 飞书 CLI：`https://github.com/larksuite/cli/blob/main/README.zh.md`

### 5.6 Contact

目标：提供明确的下一步沟通入口。

必须包含：

- 邮箱：`conniecaiqq55@163.com`
- GitHub：`https://github.com/connieqq`
- 简历下载：`TODO: resume-link`

实现要点：

- 页面尾部展示。
- 邮箱建议使用 `mailto:conniecaiqq55@163.com`。
- GitHub 使用真实链接。
- 简历下载链接未补齐前保留占位说明。
- 可以加入轻量线条流动、光标粒子或按钮磁吸效果，但不能影响阅读和移动端性能。

## 6. 内容字段设计

虽然当前内容仍可保留在 `index.html` 中，但应按结构化数据思路组织，避免后续维护变成散落文本。下一步如果内容频繁变化，可将以下数据抽到 `data.js`。

### 6.1 profile

```js
{
  name: "蔡情情",
  role: "AI 产品经理",
  positioning: "用产品思维驱动 AI 工作流，打造场景化落地的 AI 应用",
  tags: ["AI Native PM", "Vibe Coding Builder", "Strategy-Driven"],
  avatar: "TODO: avatar-image",
  cta: {
    projects: "#projects",
    resume: "TODO: resume-link"
  }
}
```

### 6.2 experiences

```js
[
  {
    type: "work",
    organization: "即构科技",
    role: "产品经理",
    period: "2022.04 - 2025.06",
    summary: "负责多模态 AI 问答助手和音视频云产品商业化，从 0 到 1 推动高校 AI 场景落地。",
    detail: "100 字以内结构化经历详情",
    tags: ["AI落地", "多模态交互", "商业化"],
    image: "TODO: experience-image"
  }
]
```

### 6.3 projects

```js
[
  {
    name: "多模态 AI 问答助手",
    scene: "高校招生就业场景",
    role: "产品负责人",
    value: "从 0 到 1 落地文本、实时 AI 语音、数字人问答助手，验证高校招生咨询场景 PMF。",
    tags: ["LLM+RAG", "多模态交互", "0到1落地"],
    image: "TODO: project-image",
    link: "https://zxt.xiaoyibang.com/app?id=oWRkYODiPv"
  }
]
```

### 6.4 cookbook

```js
[
  {
    title: "如何把日常工作流蒸馏成 Skills？",
    summary: "把重复工作拆成输入、判断、执行和验收标准，让 AI 能稳定复用人的经验。",
    tags: ["Skills", "工作流"],
    link: "https://my.feishu.cn/docx/KoWudeP7DoEbEJxjCBmc8ryynVc"
  }
]
```

### 6.5 toolkit

```js
[
  {
    name: "NotebookLM",
    highlight: "基于私有知识库快速生成总结、PPT 和脑图，大幅降低研究与内容整理成本。",
    tags: ["AI笔记工具", "多模态", "降低幻觉"],
    link: "https://notebooklm.google.com/"
  }
]
```

### 6.6 contact

```js
{
  email: "conniecaiqq55@163.com",
  github: "https://github.com/connieqq",
  resume: "TODO: resume-link"
}
```

## 7. 样式与响应式策略

### 7.1 视觉原则

- 主色：克莱因蓝。
- 背景：浅灰。
- 辅助色：白色、深灰、少量亮蓝高光。
- 风格：清新、专业、轻科技感。
- 不做强营销感 landing page。
- 不使用过度装饰，视觉元素必须服务信息理解。

### 7.2 布局策略

- 使用 CSS Grid 和 Flexbox 完成主要布局。
- 页面主体设置统一最大宽度，避免大屏过宽导致阅读困难。
- Hero 使用双栏布局，移动端折叠为单栏。
- Experience 使用横向滑动时间轴，卡片竖向排布，底部年份轴与卡片联动。
- AI Works 使用单列横向项目卡片，桌面端左图右文，移动端折叠为上图下文。
- AI Cookbook 默认使用“图书封面 + 文档索引”双栏布局；展开后图书区域横跨模块宽度，原位置显示双页书本视图。
- AI Cookbook 图书封面内的展开入口应保持立体书签式视觉，桌面端与移动端均位于封面中部，桌面端适当伸出书本右边缘；主体按钮保持紧凑，不做宽胶囊，右下方通过与书本边缘相连的 border 三角折角表达厚度；窄屏保持在封面内部中部，避免遮挡封面文字或造成横向溢出。
- AI Toolkit 使用单行紧凑列表布局，桌面端按“名称 / 标签 / 说明 / 跳转 icon”分列。
- AI Works 桌面端图片区域使用固定高度区间压缩卡片高度，移动端使用 `aspect-ratio: 3 / 2` 避免高度跳动。
- 全局设置 `overflow-x: hidden`，但不能用它掩盖真实文本溢出问题。

### 7.3 移动端策略

- 导航可横向滚动或压缩间距，但不能遮挡主体信息。
- Hero 字号使用 `clamp()` 控制，但不依赖纯视口宽度无限缩放。
- 卡片内长文本需要换行，不能溢出容器。
- Experience 翻面卡片在移动端要保证点击区域清晰。
- AI Cookbook 展开态在窄屏可退化为单列书页，翻页按钮不得遮挡阅读按钮。
- AI Works 在窄屏下项目卡片必须单列堆叠，图片、标题、摘要、标签和跳转按钮均不可溢出。
- AI Toolkit 单行条目在窄屏允许标签和说明换行，但仍保持跳转 icon 可见。
- CTA 按钮在窄屏可以铺满宽度。
- Hero 首屏 CTA 是例外：因只保留一个轻量文字按钮，窄屏不强制铺满，保持自然宽度。

## 8. 交互实现策略

### 8.1 锚点滚动

- 导航点击时阻止默认跳转，使用 `window.scrollTo({ behavior: "smooth" })`。
- 滚动目标需要扣除固定导航高度。
- 地址栏 hash 可以同步更新，方便分享定位。

### 8.2 导航高亮

- 使用 `IntersectionObserver` 监听各个 `section[id]`。
- 当前模块进入视口中部时，为对应导航链接添加 `active` 类。
- 观察阈值和 `rootMargin` 需要兼顾 Hero 与底部 Contact。

### 8.3 Experience 翻面

- 每张 Experience 卡片使用 `.flip-card` 容器和内部 `.flip-card-inner`。
- `.experience-art` 使用背景图承载正面视觉素材；图片层不参与翻面逻辑，避免因替换 `<img>` 影响卡片尺寸或 3D 层级。
- `.experience-art` 默认保留原 JPG/PNG 背景图；支持 `image-set()` 的浏览器通过 `@supports` 优先加载同名 WebP，原图作为 CSS fallback。
- `.experience-art::before` 保留右下角 `data-initial` 文案层；不使用 `.experience-art::after` 椭圆描边。
- 点击卡片时切换 `is-flipped`。
- 键盘 Enter 或 Space 触发同样行为。
- 卡片应设置 `tabindex="0"`，保证键盘可访问。
- Experience 时间轴使用横向 scroll-snap，用户可左右滑动查看不同竖向卡片。

### 8.4 AI Cookbook 图书交互

- 图书封面使用 `button.book-cover`，通过 `aria-expanded` 标识展开状态，并关联 `#cookbook-reader`。
- `button.book-cover` 内的 `.book-cta` 承担封面内 `> 点击展开` 的视觉提示，桌面端定位在 `top: 50%`、`right: -16px`，让按钮主体伸出封面；`.book-cta::after` 使用 `border-top` / `border-right` 生成右下方三角折角，三角左边界对齐书本右边缘，形成类似参考图的立体书签厚度；移动端定位为 `top: 50%`、`right: 24px` 并保持在封面内部。
- 文档索引项使用 `data-doc-index` 标记页码，用于默认态高亮；点击索引项保持链接默认跳转。
- 展开态通过 `#cookbook.is-open` 控制：隐藏封面和右侧索引，在封面原位置显示 `.book-reader` 双页书本。
- `.book-reader` 内保留上一页/下一页按钮；第 1 页点击上一页、最后一页点击下一页时关闭展开态并回到封面。
- 每个文档页需要提供阅读链接；右侧使用 `.flow-page-content[data-page]` 与左页同步切换，内部包含 `.flow-title` 和 `.flow-image`。
- `.book-spread` 高度必须稳定，翻页只切换内容，不改变整本书的外部高度；流程图由 `.flow-page-content picture` 承接剩余空间，`.flow-image` 使用 `height: 100%` 和 `object-fit: contain` 适配。

### 8.5 滚动显现

- 对带 `data-reveal` 的元素使用 `IntersectionObserver`。
- 首次进入视口后添加 `is-visible`，随后取消监听。
- 动效持续时间保持短，避免影响信息读取。

### 8.6 自定义光标

- 仅桌面端启用。
- 鼠标移动时更新 dot 和 ring 的 transform。
- hover 到链接、按钮、翻面卡片时放大 ring。
- 移动端和触控设备应回退默认光标。

## 9. 资源与链接规范

### 9.1 链接规范

- 真实外链直接填写 URL。
- 未确认链接必须写成明确 TODO，不留空字符串。
- 外部链接建议加 `target="_blank"` 和 `rel="noopener noreferrer"`。
- 下载简历链接统一使用 `TODO: resume-link`，不要写无意义 `#`。

### 9.2 图片规范

- 项目截图优先放在 `assets/projects/`。
- 头像优先放在 `assets/avatars/`。
- 图片加载优先使用同名 `.webp`，原 JPG/PNG 保留作为 fallback 和后续素材维护来源。
- 普通内容图使用 `<picture>`：`source type="image/webp"` 优先，`img src` 指向原图 fallback；所有可见图片补充 `width` / `height`，减少布局抖动。
- 首屏头像使用 `fetchpriority="high"` 和 `decoding="async"`；非首屏项目图、cookbook 图使用 `loading="lazy"` 和 `decoding="async"`。
- 保留 PNG/JPG 不会直接影响现代浏览器页面加载，因为浏览器只请求命中的 WebP 或 fallback 之一；它们只影响仓库和部署包体积。
- 只有在确认不需要兼容 fallback 且代码引用全部切到 WebP 后，才考虑删除原 PNG/JPG。
- 缺图时使用 CSS 生成视觉占位，而不是引用不存在的图片。
- 图片必须有 `alt`，CSS 视觉占位必须有 `aria-label`。

### 9.3 TODO 统一格式

```text
TODO: resume-link
TODO: project-link
TODO: cookbook-link
TODO: toolkit-link
TODO: avatar-image
TODO: project-image
```

## 10. 开发步骤

1. 对齐 `PRD.md` 与当前 `index.html` 的内容差异。
2. 补齐 Hero 的定位语、标签和 CTA 占位。
3. 补齐 Experience 5 条经历，并实现竖向卡片 + 横向滑动时间轴 + 点击翻面。
4. 补齐 AI Works 5 个项目的真实链接、项目图、标签和按钮。
5. 补齐 AI Cookbook 4 个文档条目，并实现图书封面、文档索引、双页展开和翻页交互。
6. 补齐 AI Toolkit 4 个工具条目和真实链接，并改为单行紧凑列表。
7. 补齐 Contact 的邮箱、GitHub 和简历入口。
8. 检查桌面端首屏、导航滚动、Experience 翻面、Cookbook 图书展开/翻页和项目 hover 状态。
9. 检查移动端无横向滚动、文本不溢出、按钮可点击。
10. 选择静态部署方式，优先 GitHub Pages。

## 11. 验收清单

### 11.1 桌面端

- 首屏能完整看到头像、姓名、身份、定位、标签和单个 `查看作品集` CTA。
- Hero 不展示 `下载简历` CTA；`查看作品集` CTA 带箭头 icon，视觉为轻量文字按钮。
- 首屏露出下一屏一部分内容。
- 导航点击后能准确滚动到对应模块。
- 当前模块对应导航高亮。
- Experience 至少展示 5 条经历，且按 PRD 倒序排列。
- Experience 以横向时间轴左右滑动查看，卡片为竖向布局。
- Experience 卡片正面包含视觉占位、组织名称、角色、时间、一句话概要和标签，并支持点击和键盘翻面。
- AI Works 至少展示 5 个项目。
- 每个 AI Work 都有图片或视觉占位、标签和跳转按钮。
- AI Works 桌面端保持横向项目卡片，右侧文字区域不出现大块空白。
- AI Works hover 态有明显渐变描边和悬浮反馈。
- AI Cookbook 至少展示 4 个文档条目。
- AI Cookbook 默认展示图书封面和文档索引，点击封面可在原位置展开双页书本，点击文档索引直接打开文档链接。
- AI Cookbook 图书封面内展示 `> 点击展开` 立体书签式按钮，位于封面右侧中部并在桌面端伸出书本边缘，移动端也保持中部位置；使用浅蓝白半透明底、与书本边缘相连的右下 border 三角折角和低强度投影，且不遮挡封面标题、描述和底部信息。
- AI Cookbook 双页书本左页包含文档标题、概述、标签、阅读按钮；右页包含当前文档对应的图标标题和流程图片。
- AI Cookbook 上一页/下一页按钮可切换文档页，并在首尾边界回到默认封面态。
- Toolkit 至少展示 4 个工具或 Skill，且每项为“名称 / 标签 / 说明 / 跳转 icon”的单行紧凑条目。
- Contact 区域包含邮箱、GitHub、简历三个入口。

### 11.2 移动端

- 页面无横向滚动。
- 导航不遮挡首屏核心信息。
- 卡片、按钮和标签文字不溢出。
- Experience 横向滑动和翻面交互可用。
- AI Works 图片比例稳定，卡片高度不异常跳动。
- AI Cookbook 展开态在移动端可读，翻页按钮和阅读按钮不互相遮挡。
- AI Toolkit 条目在移动端可换行但跳转 icon 保持可见。
- Contact 三个入口可正常点击。

### 11.3 链接与资源

- 已知链接均填写真实 URL。
- 未知链接统一使用 `TODO:` 占位说明。
- 不出现破图。
- 图片或视觉占位具备替代说明。
- 外部链接打开不影响当前页面安全性。

### 11.4 视觉一致性

- 整体符合“克莱因蓝 + 浅灰 + 清新专业 + 轻科技感”。
- 页面不过度装饰。
- 卡片和区块层级清晰。
- 信息密度适合招聘方快速扫读。

## 12. 当前实现状态记录

当前 `index.html` 已具备静态单页基础、固定导航、Hero、Experience、AI Works、Cookbook、Toolkit、Contact、滚动显现、导航高亮、自定义光标和卡片翻面能力。

当前已完成的关键对齐项：

- Hero 已使用 PRD 中的完整定位语和 `AI Native PM`、`Vibe Coding Builder`、`Strategy-Driven` 标签。
- Hero 已删除首屏 `下载简历` 按钮，仅保留 `查看作品集`；该 CTA 已调整为带箭头 icon 的轻量文字按钮，避免实心按钮样式过重。
- Experience 已补充 `AI 产品经理｜2026`，并采用竖向卡片 + 横向滑动时间轴 + 点击/键盘翻面。
- AI Works 已更名并统一页面文案；5 个项目图已替换为 `assets/projects/` 下的风格化项目图片，未知链接使用 `TODO: project-link`。
- AI Works 已改为桌面端横向卡片布局，并压缩卡片高度；hover 态使用更明显的蓝色系渐变描边和 glow。
- AI Cookbook 已补齐 4 个文档条目，并实现图书封面、文档索引、双页展开、翻页和右页流程图片展示。
- AI Cookbook 展开态右页已更新为图标标题和真实流程图片，4 个文档分别映射到 `assets/cookbook/cookbook_1.png` 至 `assets/cookbook/cookbook_4.png`。
- AI Cookbook 图书封面的 `> 点击展开` 入口已沉淀为封面右侧偏下的立体书签按钮样式，文案保持不变，并通过右下 border 三角折角形成厚度感。
- 图片资源已生成 WebP 版本并优先加载，原 PNG/JPG 保留作为兼容 fallback；当前不删除原图，避免 fallback 资源 404。
- AI Cookbook 展开态已固定图书高度，流程图在右页固定区域内等比适配；切换不同文档时图书整体高度保持稳定。
- AI Toolkit 已替换为 PRD 指定的 NotebookLM、Stitch、Excalidraw Diagram Skill、飞书 CLI，并采用单行紧凑条目。
- Contact 已替换为真实邮箱和 GitHub，简历保留 `TODO: resume-link`。

后续主要待补齐项：

- 将 `TODO: resume-link`、`TODO: project-link`、`TODO: cookbook-link` 替换为真实地址。
- 用真实头像、公司/学校 logo 替换当前 CSS 视觉占位。

## 13. 部署建议

优先使用 GitHub Pages：

1. 将项目推送到 GitHub 仓库。
2. 在仓库 Settings 中开启 Pages。
3. 选择主分支和根目录作为发布来源。
4. 访问生成的 Pages URL 验证页面。

如果后续需要预览分支、自动部署或自定义域名，也可以使用 Vercel 或 Netlify。当前阶段不需要服务端运行环境。
