# 蔡情情 AI 产品经理个人主页 PRD

## 1. 产品概述

本产品是一个面向求职转化的单页个人主页，用于快速展示蔡情情作为 AI 产品经理的定位、可信经历、AI 作品集、方法论沉淀与联系方式。

核心目标：让面试官在 30 秒内理解“她是谁、为什么 AI native、做过什么可验证的 AI 产品、是否值得进入下一轮沟通”。

优先受众：AI 产品经理岗位的招聘方、业务负责人、面试官。

## 2. 成功标准

- 首屏 30 秒内清晰传达：蔡情情 / AI 产品经理 / AI native / 有 AI 落地经验。
- 页面能支撑三类浏览路径：快速扫读、深入查看作品、联系或下载简历。
- 每个 AI 项目都能说明：问题场景、产品角色、AI 能力、结果或价值。
- AI Works 每张项目卡片需包含图片、截图或视觉占位，避免纯文字陈列。
- 页面信息结构简洁，单页完成，不引入登录、数据库、复杂后台。
- 所有外链支持后续补齐，占位格式统一为 `TODO: link`。

## 3. 页面结构

导航固定为：

- About
- AI Works
- AI Cookbook
- Toolkit
- Contact

页面顺序：

1. Hero 首屏
2. Experience 经历
3. AI Works AI 作品集
4. AI Cookbook AI 知识库
5. AI Toolkit AI 工具箱
6. Contact

## 4. 核心模块

### 4.1 Hero 首屏

内容：

- 虚拟头像
- 姓名：蔡情情
- 身份：AI 产品经理
- 一句话定位：用产品思维驱动 AI 工作流，打造场景化落地的 AI 应用
  - AI Native PM
  - Vibe Coding Builder
  - Strategy-Driven
- CTA：
  - 查看作品集：滚动至 AI Works；首屏 Hero 仅保留该 CTA。

设计要求：

- 首屏占据主要视口，但需露出下一屏一部分内容。
- 主色调克莱因蓝，背景浅灰。
- 风格清新、专业、轻科技感。
- Hero CTA 使用轻量按钮样式，避免重型实心按钮；按钮需包含箭头 icon，并支持 hover 状态。
- 支持自定义鼠标光标跟随与 CTA hover 状态。

### 4.2 Experience 经历

内容：
0. AI 产品经理｜2026  
   概要：从 Prompt 到 Harness 工程, 从 Vibe Coding 到 AI 社群。致力探索 AI 和真实场景的深度融合。 
   标签：`AI探索` `终身学习` `Vibe Coding`

1. “头部独角兽”即构科技｜产品经理｜2022.04 - 2025.06  
   概要：负责多模态 AI 问答助手和音视频云产品商业化，从 0 到 1 推动高校 AI 场景落地。  
   标签：`AI落地` `多模态交互` `商业化`

2. “大厂”快手科技｜产品经理｜2021.05 - 2022.02  
   概要：参与 2B 实时音视频 PaaS 产品矩阵与视频会议 SaaS 全端能力建设。  
   标签：`技术产品化` `PaaS平台` `B端产品`

3. 浙江大学｜硕士｜计算机科学与技术｜2018 - 2021  
   概要：计算机专业背景，具备理解 AI、音视频与平台型产品的技术基础。  
   标签：`计算机` `985硕士` `技术背景`

4. 电子科技大学｜本科｜计算机科学与技术｜2014 - 2018  
   概要：系统学习计算机基础，形成技术理解、逻辑拆解和结构化表达能力。  
   标签：`计算机` `985本科` `逻辑表达`

展示形式：

- 时间轴左右滑动查看不同卡片，卡片按时间倒序展示。
- 每张经历卡片采用竖向布局，降低页面纵向占用并强化作品集式浏览体验。
- 卡片正面必须展示：照片/视觉图 + 组织名称 + 角色 + 时间 + 一句话概要。
- Experience 视觉图使用固定 2:1 横向视窗承载，推荐素材不低于 `528 x 264px`，更优为 `792 x 396px` 或 `1024 x 512px`；非 2:1 照片允许用等比裁切适配，不拉伸、不改变卡片布局。
- 视觉图资源依次为：`assets/experience/experience_aipm.JPG`、`assets/experience/experience_zego.png`、`assets/experience/experience_kuaishou.png`、`assets/experience/experience_zju.jpg`、`assets/experience/experience_uestc.jpg`。
- 视觉图右下角的年份/缩写标识（如 `2026`、`AI`、`RTC`、`ZJU`、`UESTC`）需保留，作为覆盖在图片上的轻量识别层；原占位图椭圆描边不再保留。
- 点击翻面：顶部保留展示公司名称、岗位名称，并额外展示 100 字以内结构化经历详情；桌面端可保留 hover 翻面作为辅助反馈。
- 每张卡片包含 3 个标签（正反面都展示）。

### 4.3 AI Works 作品集

项目内容：

1. 多模态 AI 问答助手｜高校招生就业场景  
   图片资源：`assets/projects/ChatGPT Image 2026年5月20日 00_38_02.png`。  
   核心价值：从 0 到 1 落地文本、实时AI语音、数字人问答助手，验证高校招生咨询场景 PMF。  
   标签：`LLM+RAG` `多模态交互` `0到1落地`
   跳转链接：https://zxt.xiaoyibang.com/app?id=oWRkYODiPv

2. AI Interview Coach ｜面试模拟 skill
   图片资源：`assets/projects/ChatGPT Image 2026年5月19日 23_52_19.png`。  
   核心价值：基于 JD + 简历生成结构化面试准备页，提升求职准备效率。  
   标签：`Skill工作流` `面试模拟` `效率工具`
   跳转链接：https://github.com/connieqq/jd-to-interview-mock

3. 竞品分析 AI Copilot｜B端竞品分析 skill
   图片资源：`assets/projects/ChatGPT Image 2026年5月20日 00_15_46.png`。  
   核心价值：沉淀 B 端 AI 产品工作流，辅助需求拆解、竞品对比、B端成本和商业化。  
   标签：`vibe coding` `Skill工作流` `竞品分析`

4. Time Reflection｜时间复盘可视化工具 
   图片资源：`assets/projects/ChatGPT Image 2026年5月20日 00_43_19.png`。  
   核心价值：将个人时间规划中的预期与实际进行可视化对比，辅助复盘规划和情绪觉察。  
   标签：`时间复盘` `可视化` `生活AI`
   跳转链接：https://github.com/connieqq/timelinefly

展示形式：
- 目前主要是4个项目卡片，但需要考虑到后续新增项目的排版优化和适配。
- 每张卡片包含：图片/视觉占位、项目名、场景、角色、核心价值、2-3 个标签、跳转按钮。
- 图片区域优先使用真实项目截图；暂无截图时使用符合项目主题的视觉占位。
- 桌面端项目卡片采用横向布局：左侧图片、右侧项目信息，避免信息密度过低。
- 桌面端图片区域可使用固定高度并 `object-fit: cover` 填充卡片；移动端恢复固定比例展示，避免图片过矮或卡片高度跳动。
- 右侧文字区保持紧凑，不使用大量空白把跳转按钮推到底部。
- 点击跳转至项目链接，若某项目无链接则先占位 `TODO: project-link`。

### 4.4 AI Cookbook 知识库

定位：我不只是 AI 工具使用者，有自己的方法论体系。举例展示 AI 方法论、产品思考和学习沉淀，页面占比轻量。

初始条目：

1. 如何把日常工作流蒸馏成 Skills？
   文档摘要：把重复工作拆成输入、判断、执行和验收标准，让 AI 能稳定复用人的经验。
   跳转链接：https://my.feishu.cn/docx/SZqcd1HeVoIJVPxO91rcBiisnaf

2. AI 新名词“日记”
   文档摘要：26年流行的“新概念”记录，每天学习并简述 1-2个 AI 新知识点，对生成式 AI 有深入的技术理解。
   跳转链接：https://share.note.youdao.com/s/3HDeJg4A

3. 深度参与杭州 AI 2050 大会的一些思考
   文档摘要：从技术、青年创新和 AI 实践角度总结会议纪要，复盘一次高密度线下大会体验。
   跳转链接：https://my.feishu.cn/docx/YM9hd0w5Coj2D4xREE9cD78DnOb

4. AI Builders Daily Digest
   文档摘要：总结X 等AI Builders  一手消息平台的重点信息，龙虾定时每日更新。
   跳转链接：


展示形式：

- 默认态左侧展示“图书封面”UI，作为 AI 知识库入口和第 0 页；右侧展示 4 个文档条目索引。
- 图书封面样式需区别于普通卡片，保持封面感；封面上的“> 点击展开”入口放置在图书内部靠右侧、垂直居中位置，使用圆角胶囊按钮样式。
- 点击图书封面后，在封面原位置展开双页书本视图，不跳转到页面下方。
- 点击右侧任一文档条目时，点击后直接跳转到文档链接，而不是联动展开书本并切换到对应文档页。
- 展开态左页展示当前文档标题、概述、标签、阅读按钮；右页展示该文档对应的图标标题和流程图片。
- 4 个文档右页标题依次为：`Skills 搭建流程`、`OpenClaw 框架图`、`如何入场转型AI/OPC`、`AI 一手消息每日推送`。
- 4 个文档右页图片依次使用 `assets/cookbook/cookbook_1.png`、`assets/cookbook/cookbook_2.png`、`assets/cookbook/cookbook_3.png`、`assets/cookbook/cookbook_4.png`，图片需自适应书本右页宽高，不破图、不横向溢出。
- 双页书本支持上一页/下一页翻页；在第 1 页点击上一页、最后一页点击下一页时回到默认图书封面态。
- 某条目无跳转链接统一占位：`TODO: cookbook-link`


### 4.5 AI Toolkit

定位：展示日常 AI 工作流和工具偏好，强化 AI native 人设。

初始内容：

1. CClaude Code、Codex   
   亮点：公认 TOP 级的模型和 Agent 架构，从“AI编程工具”变成你的“AI全能助手”。
   标签：AI编程、Agent助手、顶级模型
   跳转链接：https://chatgpt.com/codex

2. TRAE CN  
   亮点：Agent 工具入门优选，上手简单、国内无需魔法可用 AI IDE，且集成多种国产模型。
   标签：国内可用、AI编程、Agent助手
   跳转链接：https://www.trae.cn/

3. NotebookLM   
   亮点：基于私有知识库快速生成总结、PPT 和脑图，大幅降低研究与内容整理成本。
   标签：AI笔记工具、多模态、降低幻觉
   跳转链接：https://notebooklm.google.com/

4. Stitch 
   亮点：自然语言生成高保证 UI，快速验证产品原型，支持 vibe coding。
   标签：AI Design、Vibe Coding、UI/UX
   跳转链接：https://stitch.withgoogle.com/

5. Excalidraw Diagram Skill  
   亮点：将复杂产品逻辑和 AI 工作流快速转化为结构化可视化图，生成后支持手动微调。
   标签：Skills、可视化、流程图
   跳转链接：https://github.com/coleam00/excalidraw-diagram-skill

6. 飞书 CLI
   亮点：打通日常 Agent +飞书生态（消息、文档、多维表格），轻松接入自动化工作流。
   标签：Skills、飞书知识库、效率工具
   跳转链接：https://github.com/larksuite/cli/blob/main/README.zh.md

展示形式：

- 紧跟 AI Cookbook。
- 每个工具使用单行紧凑条目，避免宽卡片占用过多页面高度。
- 单行结构固定为：产品/Skill 名称 / 标签 / 说明 / 跳转 icon。
- 标签紧跟产品名称之后或位于条目右侧，说明文案保持一行优先，窄屏允许自然换行。
- 某条目无跳转链接统一占位：`TODO: toolkit-link`


### 4.6 Contact

内容：

- 邮箱：conniecaiqq55@163.com
- GitHub：https://github.com/connieqq
- 简历下载：`TODO: resume-link`

设计要求：

- 页面尾部展示。
- 可加入轻量动效，例如蓝色光标粒子、线条流动或按钮磁吸效果。
- 不影响信息读取和移动端性能。

## 5. 交互与视觉要求

- 单页锚点导航，点击导航平滑滚动到对应模块。
- Experience 卡片支持翻面查看详情。
- AI Cookbook 图书封面支持展开双页书本视图，文档索引与书页联动。
- AI Cookbook 图书封面内的“> 点击展开”按钮需位于封面右侧居中，样式轻量、圆角，不能遮挡封面标题和底部信息。
- AI Cookbook 双页书本支持翻页，并可从首尾边界回到默认封面态。
- AI Works 卡片支持 hover 悬浮和点击跳转。
- AI Works 卡片 hover 时需有明显高亮反馈：边框加粗，并使用蓝色系渐变描边和轻量 glow。
- AI Works 图片区域需稳定加载，缺图时展示统一风格占位，不显示破图。
- 主色：克莱因蓝。
- 背景：浅灰。
- 辅助色：白色、深灰、少量亮蓝高光。
- 不使用过度装饰，不做营销感 landing page。
- 移动端需保证卡片可读，翻面交互可替换为点击展开。

## 6. 内容字段接口

建议使用结构化内容配置，方便后续维护：

- `profile`: 姓名、身份、定位语、技能标签、头像、CTA 链接
- `experiences`: 类型、组织、角色、时间、概要、详情、标签、图片
- `projects`: 名称、场景、角色、价值描述、标签、图片、链接
- `cookbook`: 标题、摘要、标签、链接
- `toolkit`: 名称、痛点、亮点、链接
- `contact`: 邮箱、GitHub、简历链接

## 7. 验收标准

- 桌面端首屏能完整看到头像、姓名、定位、标签和单个 `查看作品集` CTA；Hero 不展示“下载简历”按钮。
- 导航点击后能准确滚动到对应模块。
- Experience 至少展示 4 张卡片，且倒序排列。
- AI Works 至少展示 4 个项目，每个项目都有图片/视觉占位、标签和跳转按钮。
- AI Works 项目链接字段均存在，可先为 TODO。
- AI Cookbook 至少展示 4 个文档位。
- Toolkit 至少展示 4 个工具或 Skill。
- Contact 区域包含邮箱、GitHub、简历三个入口。
- 页面无横向滚动，移动端文本不溢出。
- 视觉符合“克莱因蓝 + 浅灰 + 清新专业 + 轻科技感”。

## 8. 当前假设

- AI Works 当前 4 张图片素材已替换为同尺寸风格化项目图，统一存放在 `assets/projects/`。
- 主页优先服务 AI 产品经理求职，不优先做商业合作落地页。
- Experience 内容优先从已提供简历中提炼，不额外扩写未验证经历。
