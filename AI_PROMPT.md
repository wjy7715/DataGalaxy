# 数据大屏 AI 构建提示词 —— DataGalaxy（数据星河）

> 将以下内容完整交给 AI（Claude Code / Cursor / Copilot），按序执行即可得到一个可直接在大屏上展示的数据可视化页面。

---

## 1. 项目背景

DataGalaxy（数据星河） 是一个**从 0 到 1 学习数据可视化大屏**的开源项目。项目脚手架已搭建完毕（Vue 3 + TypeScript + Vite + ECharts 5 + Pinia + Vue Router），当前代码位于 `C:\Users\Administrator\DataGalaxy`，Git 仓库已推送到 `https://github.com/wjy7715/DataGalaxy`。

---

## 2. 技术栈与约束

| 类别     | 限定                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| 框架     | Vue 3 + Composition API（`<script setup lang="ts">`）                                             |
| 语言     | TypeScript                                                                                        |
| 构建工具 | Vite 5+（已配置 `@/` 别名）                                                                       |
| 图表库   | ECharts 5（通过自定义 `useChart` composable 封装，不直接用 vue-echarts 组件）                     |
| 状态管理 | Pinia（`useDashboardStore`）                                                                      |
| 路由     | Vue Router 4（懒加载）                                                                            |
| 数据     | MockDataService（接口抽象，后期可切 API）                                                         |
| 样式     | Scoped CSS，无 UI 框架，手写暗色主题                                                              |
| 测试     | Vitest + jsdom（生成的代码需附带基础单测）                                                        |
| 代码质量 | ESLint + Prettier + Husky pre-commit（已配置，生成代码后需运行 `npx eslint --fix` 并确保 0 错误） |

**严格禁止：**

- 把所有逻辑堆在一个 `.vue` 文件里
- 引入 Element Plus / Ant Design 等 UI 组件库（保持原生）
- 擅自修改 `eslint.config.js`、`vite.config.ts` 等工程配置
- 在组件内直接调用 ECharts API（必须通过 `useChart` composable）

---

## 3. 最终效果要求

### 3.1 整体布局（1920×1080 全屏铺满，无滚动条）

```
┌──────────────────────────────────────────────────────────┐
│  左侧装饰区  │     DataGalaxy 数据星河    │  2026-07-07  │
│              │     实时数据可视化大屏      │  14:30:25    │
├──────────────────────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │用户数│  │订单量│  │ 营收 │  │转化率│  │在线数│     │
│  │12,846│  │ 5,892│  │236.5w│  │12.8% │  │1,023 │     │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘     │
├──────────────────────────────────────────────────────────┤
│  ┌───────────────────────┐  ┌──────────────────────────┐│
│  │   柱状图：周访问量     │  │   折线图：24h 实时趋势    ││
│  └───────────────────────┘  └──────────────────────────┘│
├──────────────────────┬──────────────────────────────────┤
│  ┌──────────────────┐│  ┌────────────────────────────┐  │
│  │ 饼图：流量来源    ││  │  排行列表：热门页面 TOP 8  │  │
│  └──────────────────┘│  └────────────────────────────┘  │
└──────────────────────┴──────────────────────────────────┘
```

### 3.2 视觉效果

- **配色方案**：
  - 背景：`#0a0e27`（深蓝黑）
  - 主色调：`#00d4ff`（电光青）
  - 辅助色：`#00ff88`（数据绿）
  - 强调色：`#ffcc00`（琥珀黄）
  - 卡片：`rgba(255,255,255,0.03)` 半透明 + `1px solid rgba(255,255,255,0.08)` 边框
- **标题区**：居中大标题 + 右侧实时数字时钟（每秒更新）
- **统计卡片**：数字需要**从 0 滚动到目标值的计数动画**（使用 `requestAnimationFrame`），每个卡片带有微弱的边框发光呼吸效果
- **图表区**：所有图表带平滑过渡动画，tooltip 跟随光标，图例颜色统一
- **排行列表**：行与行之间需要斑马纹，前 3 名有高亮标识（金/银/铜），数据用滚动动画逐行动态更新
- **背景装饰**：页面四角或边缘有微弱的网格线/粒子效果（纯 CSS 实现，不需要 Canvas）
- **整体观感**：科技感、深色太空风，类似宇航员看舱外星空的感觉，文字清晰可读

---

## 4. 逐步骤实施计划

### 步骤 1：完善类型定义

**文件：`src/types/index.ts`**（覆盖现有文件）

需要新增：`TrendType`（up/down）、`StatItem`（含 icon/trend/trendValue）、`RankItem`（含 rank/pageName/pv/uv/bounceRate）

---

### 步骤 2：扩展 Mock 数据

**文件：`src/services/MockDataService.ts`**（覆盖现有文件）

需要包含：

- `statCards`：5 个统计指标（用户总数、订单量、营收、转化率、当前在线）
- `barChart`：7 天柱状图数据（周一~周日）
- `lineChart`：24 小时折线图数据（每整点一个值 + 每半小时一个值，2 条线：访问量 / 订单量）
- `pieChart`：流量来源分布（5 项）
- `rankList`：热门页面 TOP 8 排行
- `gaugeChart`：年度目标完成率仪表盘（可选，加分项）

`fetchDashboard()` 返回延迟仍保留 600ms 模拟。

---

### 步骤 3：扩展 Pinia Store

**文件：`src/stores/dashboard.ts`**（覆盖现有文件）

新增逻辑：

- `startAutoRefresh(interval: number)` 方法：每 N 秒自动调用 `fetchDashboard()`，期间数据产生 ±5% 的随机波动，模拟实时数据
- `stopAutoRefresh()` 方法：清除定时器
- `lastUpdated` 字段：记录最后更新时间戳
- 在组件 `onUnmounted` 时自动停止刷新

---

### 步骤 4：创建动画计数 composable

**新建文件：`src/composables/useCountUp.ts`**

实现一个 `useCountUp(target: Ref<number>, duration: number)` composable：

- 监听 `target` 变化，使用 `requestAnimationFrame` 从当前值缓动到目标值
- 返回 `displayValue: Ref<string>`（格式化后的字符串，千分位分隔）
- 动画时长默认 1.5 秒，缓动函数用 `easeOutExpo`

---

### 步骤 5：创建统计卡片组件

**新建文件：`src/components/common/StatCard.vue`**

Props：`label`、`value`、`icon`、`trend`（'up'|'down'）、`trendValue`

功能：

- 使用 `useCountUp` 做数字滚动动画
- 趋势箭头：up = 绿色 ↑，down = 红色 ↓
- 卡片有微弱的边框发光动画（CSS `@keyframes pulse`）
- 字体：数值 32px 粗体，标签 13px 灰色

---

### 步骤 6：创建排行列表组件

**新建文件：`src/components/common/RankList.vue`**

Props：`data: RankItem[]`

功能：

- 斑马纹行背景
- 前 3 行 rank 数字用金色 (#ffcc00)、银色 (#c0c0c0)、铜色 (#cd7f32) 圆点标识
- 每行显示：排名、页面名称、PV、UV、跳出率
- 使用 `TransitionGroup` 实现列表进入动画

---

### 步骤 7：优化三个图表组件

**复用现有文件：`BarChart.vue`、`LineChart.vue`、`PieChart.vue`**（覆盖现有内容）

优化要求：

- 柱状图：添加数据标签在柱顶，`animationDuration: 1000`，圆角 6px
- 折线图：两条线（访问量 = #00d4ff，订单量 = #00ff88），面积渐变填充，`smooth: 0.4`
- 饼图：玫瑰图样式（`roseType: 'area'`），中心显示文字"总流量"
- 所有图表：`backgroundColor: 'transparent'`，grid 间距合理，无数据时不报错

---

### 步骤 8：重写仪表盘页面

**文件：`src/pages/dashboard/DashboardPage.vue`**（覆盖现有文件）

CSS Grid 布局：

```
grid-template-rows: auto 1fr 1fr
grid-template-columns: repeat(5, 1fr) (统计卡片行)
grid-template-columns: 3fr 2fr (图表行 1：柱状图 + 折线图)
grid-template-columns: 1fr 1fr (图表行 2：饼图 + 排行列表)
```

功能：

- `onMounted` 时调用 `store.fetchDashboard()` 然后 `store.startAutoRefresh(10000)`（10 秒刷新）
- `onUnmounted` 时 `store.stopAutoRefresh()`
- Loading 状态显示旋转星环动画（纯 CSS，不要用 GIF）
- Error 状态显示文字提示 + 重试按钮

---

### 步骤 9：重写主布局

**文件：`src/layouts/MainLayout.vue`**（覆盖现有文件）

增强：

- 标题左侧有装饰线条（`::before` 伪元素画渐变横线）
- 标题右侧显示实时数字时钟（`HH:mm:ss` 格式），字体等宽，颜色 #00ff88
- 标题与时钟之间显示"数据已刷新"状态徽章

---

### 步骤 10：优化全局样式

**文件：`src/assets/styles/global.css`**（覆盖现有文件）

新增：

- 背景添加 CSS 网格线装饰（`background-image` 用 `linear-gradient` 画 40px 间距的细网格）
- 字体增加「等宽」备用字体用于数字显示
- 全局滚动条样式（已存在则优化颜色）

---

### 步骤 11：更新 App.vue

**文件：`src/App.vue`**（已正确引用了 MainLayout，按需微调）

---

### 步骤 12：更新测试文件

**文件：`src/__tests__/dashboard.test.ts`**（覆盖现有文件）

需要覆盖：

- Store 初始化状态测试
- `fetchDashboard` 后数据不为空测试
- Logger 方法存在性测试
- `useCountUp` 返回值类型测试（单独测试文件：`src/__tests__/useCountUp.test.ts`）

---

## 5. 每一步的验证标准

每完成一个步骤，必须：

1. `npx vue-tsc -b` —— TypeScript 类型检查 0 错误
2. `npx eslint src --ext .ts,.vue` —— ESLint 0 错误（允许 warnings）
3. `npx vitest run` —— 所有测试通过
4. `npx vite build` —— 构建成功

所有步骤完成后最终验证：

5. `npm run dev` 启动开发服务器，浏览器打开 `http://localhost:5173`
6. 确认页面全屏铺满、无滚动条、所有图表正常渲染
7. 确认数字滚动动画生效、实时刷新生效
8. 缩放浏览器窗口到 1366×768 确认不崩溃（可以缩小字体，不需要完全适配）

---

## 6. 最终交付物清单

```
DataGalaxy/
├── src/
│   ├── __tests__/
│   │   ├── dashboard.test.ts     # 更新
│   │   └── useCountUp.test.ts    # 新增
│   ├── components/
│   │   ├── charts/
│   │   │   ├── BarChart.vue       # 更新（重写）
│   │   │   ├── LineChart.vue      # 更新（重写，双线）
│   │   │   └── PieChart.vue       # 更新（重写，玫瑰图）
│   │   └── common/
│   │       ├── ChartCard.vue      # 保留
│   │       ├── StatCard.vue       # 新增
│   │       └── RankList.vue       # 新增
│   ├── composables/
│   │   ├── useChart.ts            # 保留
│   │   └── useCountUp.ts          # 新增
│   ├── layouts/
│   │   └── MainLayout.vue         # 更新（重写）
│   ├── pages/dashboard/
│   │   └── DashboardPage.vue      # 更新（重写）
│   ├── services/
│   │   └── MockDataService.ts     # 更新（扩展数据）
│   ├── stores/
│   │   └── dashboard.ts           # 更新（扩展）
│   ├── types/
│   │   └── index.ts               # 更新（扩展类型）
│   ├── assets/styles/
│   │   └── global.css             # 更新
│   ├── App.vue                    # 小调
│   └── main.ts                    # 不变
│
└── 执行完以上所有步骤，运行 npm run dev 在浏览器打开验证
```

---

## 7. 特别注意

- 本项目是教学用途，代码注释可以适量保留（解释核心逻辑），但不要过度注释
- 所有 CSS 使用 scoped 样式，全局样式只放在 `global.css`
- Mock 数据要有真实感（数据不能全是整数、要有合理波动范围）
- 配色和动画风格必须统一，不能每个组件各玩各的
- 如果某一步骤出现 TS 类型报错，必须先修复再进入下一步，不可跳过
