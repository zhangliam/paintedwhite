## 项目

### 项目安装
```
npm install
```

### 项目目录

````
public // 静态文件夹
|-	configs // 页面配置文件夹
	|-	*.json // 页面配置文件（详情请查看https://dev.comeyes.com/api）
|-	css // css文件夹
	|-	index.css // 自定义css
|-  	images // 图片文件夹
|-	js
	|-	page // 页面逻辑文件夹
		|-	*.js // 页面逻辑文件（详情请查看js文件内注释）
	|-	config.js 项目配置文件（详情请查看js文件内注释）
	|-	socket.io.js
	|-	vconsole.min.js
|-	localizations // 本地化语言包
	|-	index.js
	|-	en-US.js // 英文语言包
	|-	zh-CN.js // 中文语言包
	favicon.ico
	index.html
src // 核心代码包
|-	assets
  |-  analysis.js // 数据统计
	|-  api.js // 
	|-  logger.js // 日志
	|-  performance.js // 性能
	|-  utils.js // 工具
|-	localize // 语言包，引用 public/localizations/中的文件
|-	parser
|-	renderer // 组件文件夹
	|-	base // 基础包
	|-	brand // 品牌部
	|-	mixin // 功能包
	|-	platform // 平台包
|-	router
|-	store
|-  worker
|-	main.js // 入口文件
|-	routerApp.vue
|-	swiperApp.vue
styleguide
.env.development // 开发环境下环境变量
.env.production // 生成环境下环境变量
package.json
styleguide.config.js
vue.config.js
````

### 设置项目展示类型
在.env.development或.env.production中修改VUE_APP_TYPE的值。目前只有ROUTER和SWIPER两种类型

```
VUE_APP_TYPE=ROUTER
BASE_API=/
```

或者

```
VUE_APP_TYPE=SWIPER
BASE_API=/
```

### 项目测试
```
npm run serve
```

### 项目发布
```
npm run build
```

### 项目测试
```
npm run test
```

### 代码规范
```
npm run lint
```

### 发布组件文档
```
npm run styleguide
```

## 辅助工具

### 下载安装eBuilder

```
下载地址
https://retail-static-res.intellimirror.cn/eBuilder-darwin-x64-v0.3.24.dmg
```

### VS Code 插件

```
下载地址
https://retail-static-res.intellimirror.cn/ergate-0.1.3.vsix
```
