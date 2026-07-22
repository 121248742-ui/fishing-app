# 钓鱼指导小程序 MVP 实施计划

**Goal:** 构建一个移动端 Web 版钓鱼助手，包含 AI 顾问、钓点地图、天气工具、渔获记录四大模块。

**Architecture:** 单页 HTML 应用，Tab 导航切换四个模块。AI 对话调用 Claude API，钓点和天气使用模拟数据，渔获记录用 LocalStorage 持久化。

**Tech Stack:** HTML5 + CSS3 + Vanilla JS，Claude API（AI 对话），和风天气 API（可选接入）

## 任务拆解

### Task 1: 页面骨架与 Tab 导航
- 创建 index.html，移动端适配（max-width: 414px）
- 底部 4 Tab 导航栏（AI顾问/钓点/天气/渔获）
- 全局 CSS 变量和基础样式

### Task 2: AI 钓鱼顾问模块
- 聊天界面 UI（气泡式消息）
- 预置快捷问题按钮
- 调用 Claude API 实现智能问答
- 流式输出或一次性回复

### Task 3: 钓点地图模块
- 列表式钓点展示（含搜索/筛选）
- 预置全国热门钓点数据
- 钓点详情卡片（鱼种/收费/评分/实拍）
- 微信风格的地图占位（后续可换真实地图）

### Task 4: 天气工具模块
- 天气卡片（气压/降水/风力/温度）
- AI 解读今日钓鱼指数
- 和风天气 API 预留接口

### Task 5: 渔获记录模块
- 渔获列表 + 添加表单
- 拍照上传（文件选择器）
- LocalStorage 持久化
- 个人统计面板

### Task 6: 部署上线
- 通过 lark-apps 部署为公网链接
