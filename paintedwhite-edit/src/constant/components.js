const ergates = [
  {
    label: 'Div',
    template: 'basic-container-div',
    group: 'Ergate',
    kind: '基础组件',
    types: ['Container']
  },
  {
    label: 'Form',
    template: 'basic-container-form',
    group: 'Ergate',
    kind: '基础组件',
    types: ['Container']
  },
  {
    label: 'ScrollView',
    template: 'basic-container-scrollview',
    group: 'Ergate',
    kind: '基础组件',
    types: ['Container']
  },
  {
    label: 'Table',
    template: 'extend-container-table',
    group: 'Ergate',
    kind: '扩展组件',
    types: ['Container', 'List']
  },
  {
    label: 'Text',
    template: 'basic-layer-text',
    group: 'Ergate',
    kind: '基础组件',
    types: ['Layer']
  }
]

const vants = [
  {
    label: 'Button 按钮',
    template: 'van-button',
    group: 'Vant',
    kind: '基础组件',
    types: ['Layer']
  },
  {
    label: 'Cell 单元格',
    template: 'van-cell',
    group: 'Vant',
    kind: '基础组件',
    types: ['Container']
  },
  {
    label: 'Icon 图标',
    template: 'van-icon',
    group: 'Vant',
    kind: '基础组件',
    types: ['Layer']
  },
  {
    label: 'Image 图片',
    template: 'van-image',
    group: 'Vant',
    kind: '基础组件',
    types: ['Container']
  },
  {
    label: 'Col 布局',
    template: 'van-col',
    group: 'Vant',
    kind: '基础组件',
    types: ['Container']
  },
  {
    label: 'Row 布局',
    template: 'van-row',
    group: 'Vant',
    kind: '基础组件',
    types: ['Container']
  },
  {
    label: 'Popup 弹出层',
    template: 'van-popup',
    group: 'Vant',
    kind: '基础组件',
    types: ['Container']
  },
  {
    label: 'Calendar 日历',
    template: 'van-calendar',
    group: 'Vant',
    kind: '表单组件',
    types: ['Container']
  },
  {
    label: 'Cascader 级联选择',
    template: 'van-cascader',
    group: 'Vant',
    kind: '表单组件',
    types: ['Container']
  },
  {
    label: 'Checkbox 复选框',
    template: 'van-checkbox',
    group: 'Vant',
    kind: '表单组件',
    types: ['Container']
  },
  {
    label: 'DatetimePicker 时间选择',
    template: 'van-datetimepicker',
    group: 'Vant',
    kind: '表单组件',
    types: ['Container']
  },
  {
    label: 'Field 输入框',
    template: 'van-field',
    group: 'Vant',
    kind: '表单组件',
    types: ['Container']
  },
  {
    label: 'Form 表单',
    template: 'van-form',
    group: 'Vant',
    kind: '表单组件',
    types: ['Container']
  },
  {
    label: 'NumberKeyboard 数字键盘',
    template: 'van-numberkeyboard',
    group: 'Vant',
    kind: '表单组件',
    types: ['Container']
  },
  {
    label: 'PasswordInput 密码输入框',
    template: 'van-passwordinput',
    group: 'Vant',
    kind: '表单组件',
    types: ['Container']
  },
  {
    label: 'Picker 选择器',
    template: 'van-picker',
    group: 'Vant',
    kind: '表单组件',
    types: ['Container']
  },
  {
    label: 'Radio 单选框',
    template: 'van-radio',
    group: 'Vant',
    kind: '表单组件',
    types: ['Container']
  },
  {
    label: 'Rate 评分',
    template: 'van-rate',
    group: 'Vant',
    kind: '表单组件',
    types: ['Container']
  },
  {
    label: 'Search 搜索',
    template: 'van-search',
    group: 'Vant',
    kind: '表单组件',
    types: ['Container']
  },
  {
    label: 'Slider 滑块',
    template: 'van-slider',
    group: 'Vant',
    kind: '表单组件',
    types: ['Container']
  },
  {
    label: 'Stepper 步进器',
    template: 'van-stepper',
    group: 'Vant',
    kind: '表单组件',
    types: ['Container']
  },
  {
    label: 'Switch 开关',
    template: 'van-switch',
    group: 'Vant',
    kind: '表单组件',
    types: ['Container']
  },
  {
    label: 'Uploader 文件上传',
    template: 'van-uploader',
    group: 'Vant',
    kind: '表单组件',
    types: ['Container']
  },
  {
    label: 'ActionSheet 动作面板',
    template: 'van-actionsheet',
    group: 'Vant',
    kind: '反馈组件',
    types: ['Container']
  },
  {
    label: 'DropdownMenu 下拉菜单',
    template: 'van-dropdownmenu',
    group: 'Vant',
    kind: '反馈组件',
    types: ['Container']
  },
  {
    label: 'Notify 消息通知',
    template: 'van-notify',
    group: 'Vant',
    kind: '反馈组件',
    types: ['Container']
  },
  {
    label: 'Overlay 遮罩层',
    template: 'van-overlay',
    group: 'Vant',
    kind: '反馈组件',
    types: ['Container']
  },
  {
    label: 'PullRefresh 下拉刷新',
    template: 'van-pullrefresh',
    group: 'Vant',
    kind: '反馈组件',
    types: ['Container']
  },
  {
    label: 'SwipeCell 滑动单元格',
    template: 'van-swipecell',
    group: 'Vant',
    kind: '反馈组件',
    types: ['Container']
  },
  {
    label: 'Badge 徽标',
    template: 'van-badge',
    group: 'Vant',
    kind: '展示组件',
    types: ['Container']
  },
  {
    label: 'Circle 环形进度条',
    template: 'van-circle',
    group: 'Vant',
    kind: '展示组件',
    types: ['Container']
  },
  {
    label: 'Collapse 折叠面板',
    template: 'van-collapse',
    group: 'Vant',
    kind: '展示组件',
    types: ['Container']
  },
  {
    label: 'CountDown 倒计时',
    template: 'van-countdown',
    group: 'Vant',
    kind: '展示组件',
    types: ['Container']
  },
  {
    label: 'Divider 分割线',
    template: 'van-divider',
    group: 'Vant',
    kind: '展示组件',
    types: ['Container']
  },
  {
    label: 'Empty 空状态',
    template: 'van-empty',
    group: 'Vant',
    kind: '展示组件',
    types: ['Container']
  },
  {
    label: 'ImagePreview 图片预览',
    template: 'van-imagepreview',
    group: 'Vant',
    kind: '展示组件',
    types: ['Container']
  },
  {
    label: 'List 列表',
    template: 'van-list',
    group: 'Vant',
    kind: '展示组件',
    types: ['Container']
  },
  {
    label: 'NoticeBar 通知栏',
    template: 'van-noticebar',
    group: 'Vant',
    kind: '展示组件',
    types: ['Container']
  },
  {
    label: 'Popover 气泡弹出框',
    template: 'van-popover',
    group: 'Vant',
    kind: '展示组件',
    types: ['Container']
  },
  {
    label: 'Progress 进度条',
    template: 'van-progress',
    group: 'Vant',
    kind: '展示组件',
    types: ['Container']
  },
  {
    label: 'Skeleton 骨架屏',
    template: 'van-skeleton',
    group: 'Vant',
    kind: '展示组件',
    types: ['Container']
  },
  {
    label: 'Steps 步骤条',
    template: 'van-steps',
    group: 'Vant',
    kind: '展示组件',
    types: ['Container']
  },
  {
    label: 'Sticky 粘性布局',
    template: 'van-sticky',
    group: 'Vant',
    kind: '展示组件',
    types: ['Container']
  },
  {
    label: 'Swipe 轮播',
    template: 'van-swipe',
    group: 'Vant',
    kind: '展示组件',
    types: ['Container']
  },
  {
    label: 'Tag 标签',
    template: 'van-tag',
    group: 'Vant',
    kind: '展示组件',
    types: ['Container']
  },
  {
    label: 'Grid 宫格',
    template: 'van-grid',
    group: 'Vant',
    kind: '导航组件',
    types: ['Container']
  },
  {
    label: 'IndexBar 索引栏',
    template: 'van-indexbar',
    group: 'Vant',
    kind: '导航组件',
    types: ['Container']
  },
  {
    label: 'NavBar 导航栏',
    template: 'van-navbar',
    group: 'Vant',
    kind: '导航组件',
    types: ['Container']
  },
  {
    label: 'Pagination 分页',
    template: 'van-pagination',
    group: 'Vant',
    kind: '导航组件',
    types: ['Container']
  },
  {
    label: 'Sidebar 侧边导航',
    template: 'van-sidebar',
    group: 'Vant',
    kind: '导航组件',
    types: ['Container']
  },
  {
    label: 'Tab 标签页',
    template: 'van-tab',
    group: 'Vant',
    kind: '导航组件',
    types: ['Container']
  },
  {
    label: 'Tabbar 标签栏',
    template: 'van-tabbar',
    group: 'Vant',
    kind: '导航组件',
    types: ['Container']
  },
  {
    label: 'TreeSelect 分类选择',
    template: 'van-treeselect',
    group: 'Vant',
    kind: '导航组件',
    types: ['Container']
  }
]

const els = [
  {
    label: 'Button 按钮',
    template: 'el-button',
    group: 'ElementPlus',
    kind: 'Basic 基础组件',
    types: ['Layer']
  }, 
  {
    label: 'Container 外层容器',
    template: 'el-container',
    group: 'ElementPlus',
    kind: 'Basic 基础组件',
    types: ['Container']
  }, 
  {
    label: 'Header 顶栏容器',
    template: 'el-header',
    group: 'ElementPlus',
    kind: 'Basic 基础组件',
    types: ['Container']
  }, 
  {
    label: 'Aside 侧边栏容器',
    template: 'el-aside',
    group: 'ElementPlus',
    kind: 'Basic 基础组件',
    types: ['Container']
  }, 
  {
    label: 'Main 主要区域容器',
    template: 'el-main',
    group: 'ElementPlus',
    kind: 'Basic 基础组件',
    types: ['Container']
  }, 
  {
    label: 'Footer 底栏容器',
    template: 'el-footer',
    group: 'ElementPlus',
    kind: 'Basic 基础组件',
    types: ['Container']
  }, 
  {
    label: 'Row',
    template: 'el-row',
    group: 'ElementPlus',
    kind: 'Basic 基础组件',
    types: ['Container']
  }, 
  {
    label: 'Col',
    template: 'el-col',
    group: 'ElementPlus',
    kind: 'Basic 基础组件',
    types: ['Container']
  }, 
  {
    label: 'Link 链接',
    template: 'el-link',
    group: 'ElementPlus',
    kind: 'Basic 基础组件',
    types: ['Container']
  }, 
  {
    label: 'Scrollbar 滚动条',
    template: 'el-scrollbar',
    group: 'ElementPlus',
    kind: 'Basic 基础组件',
    types: ['Container']
  }, 
  {
    label: 'Space 间距',
    template: 'el-space',
    group: 'ElementPlus',
    kind: 'Basic 基础组件',
    types: ['Container']
  },
  {
    label: 'Cascader 级联选择器',
    template: 'el-cascader',
    group: 'ElementPlus',
    kind: 'Form 表单组件',
    types: ['Layer']
  }, 
  {
    label: 'Checkbox 多选框',
    template: 'el-checkbox',
    group: 'ElementPlus',
    kind: 'Form 表单组件',
    types: ['Layer']
  }, 
  {
    label: 'ColorPicker 颜色选择器',
    template: 'el-color-picker',
    group: 'ElementPlus',
    kind: 'Form 表单组件',
    types: ['Layer']
  }, {
    label: 'DatePicker 日期选择器',
    template: 'el-date-picker',
    group: 'ElementPlus',
    kind: 'Form 表单组件',
    types: ['Layer']
  }, 
  {
    label: 'Form 表单',
    template: 'el-form',
    group: 'ElementPlus',
    kind: 'Form 表单组件',
    types: ['Container']
  }, 
  {
    label: 'Input 输入框',
    template: 'el-input',
    group: 'ElementPlus',
    kind: 'Form 表单组件',
    types: ['Layer']
  }, 
  {
    label: 'Input Number 数字输入框',
    template: 'el-input-number',
    group: 'ElementPlus',
    kind: 'Form 表单组件',
    types: ['Layer']
  }, 
  {
    label: 'Radio Group 单选框组',
    template: 'el-radio-group',
    group: 'ElementPlus',
    kind: 'Form 表单组件',
    types: ['Container']
  }, 
  {
    label: 'Radio 单选框',
    template: 'el-radio',
    group: 'ElementPlus',
    kind: 'Form 表单组件',
    types: ['Container']
  }, 
  {
    label: 'Radio Button 单选框',
    template: 'el-radio-button',
    group: 'ElementPlus',
    kind: 'Form 表单组件',
    types: ['Layer']
  }, 
  {
    label: 'Rate 评分',
    template: 'el-rate',
    group: 'ElementPlus',
    kind: 'Form 表单组件',
    types: ['Layer']
  }, 
  {
    label: 'Select 选择器',
    template: 'el-select',
    group: 'ElementPlus',
    kind: 'Form 表单组件',
    types: ['List']
  }, 
  {
    label: 'Select 虚拟列表选择器',
    template: 'el-select-v2',
    group: 'ElementPlus',
    kind: 'Form 表单组件',
    types: ['List']
  }, 
  {
    label: 'Slider 滑块',
    template: 'el-slider',
    group: 'ElementPlus',
    kind: 'Form 表单组件',
    types: ['Layer']
  }, 
  {
    label: 'Switch 开关',
    template: 'el-switch',
    group: 'ElementPlus',
    kind: 'Form 表单组件',
    types: ['Layer']
  }, 
  {
    label: 'TimePicker 时间选择器',
    template: 'el-time-picker',
    group: 'ElementPlus',
    kind: 'Form 表单组件',
    types: ['Layer']
  }, 
  {
    label: 'TimeSelect 时间选择',
    template: 'el-time-select',
    group: 'ElementPlus',
    kind: 'Form 表单组件',
    types: ['Layer']
  }, 
  {
    label: 'Transfer 穿梭框',
    template: 'el-transfer',
    group: 'ElementPlus',
    kind: 'Form 表单组件',
    types: ['Container']
  }, 
  {
    label: 'Upload 上传',
    template: 'el-upload',
    group: 'ElementPlus',
    kind: 'Form 表单组件',
    types: ['Container']
  },
  {
    label: 'Avatar 头像',
    template: 'el-avatar',
    group: 'ElementPlus',
    kind: 'Data 数据展示',
    types: ['Container']
  }, 
  {
    label: 'Badge 徽章',
    template: 'el-badge',
    group: 'ElementPlus',
    kind: 'Data 数据展示',
    types: ['Container']
  }, 
  {
    label: 'Calendar 日历',
    template: 'el-calendar',
    group: 'ElementPlus',
    kind: 'Data 数据展示',
    types: ['Container']
  }, 
  {
    label: 'Card 卡片',
    template: 'el-card',
    group: 'ElementPlus',
    kind: 'Data 数据展示',
    types: ['Container']
  }, 
  {
    label: 'Carousel 走马灯',
    template: 'el-carousel',
    group: 'ElementPlus',
    kind: 'Data 数据展示',
    types: ['Container']
  }, 
  {
    label: 'Carousel 走马灯项',
    template: 'el-carousel-item',
    group: 'ElementPlus',
    kind: 'Data 数据展示',
    types: ['Container']
  }, 
  {
    label: 'Collapse 折叠面板',
    template: 'el-collapse',
    group: 'ElementPlus',
    kind: 'Data 数据展示',
    types: ['Container']
  }, 
  {
    label: 'Collapse 折叠面板项',
    template: 'el-collapse-item',
    group: 'ElementPlus',
    kind: 'Data 数据展示',
    types: ['Container']
  }
]

const trois = [
  {
    label: 'Renderer',
    template: 'Renderer',
    group: 'ThreeJs',
    kind: 'Core',
    types: ['Container']
  }, {
    label: 'Camera',
    template: 'Camera',
    group: 'ThreeJs',
    kind: 'Core',
    types: ['Container']
  }, {
    label: 'Scene',
    template: 'Scene',
    group: 'ThreeJs',
    kind: 'Core',
    types: ['Container']
  }, {
    label: 'Ambient Light',
    template: 'AmbientLight',
    group: 'ThreeJs',
    kind: 'Light',
    types: ['Layer']
  }, {
    label: 'Directional Light',
    template: 'DirectionalLight',
    group: 'ThreeJs',
    kind: 'Light',
    types: ['Layer']
  }, {
    label: 'Hemisphere Light',
    template: 'HemisphereLight',
    group: 'ThreeJs',
    kind: 'Light',
    types: ['Layer']
  }, {
    label: 'Point Light',
    template: 'PointLight',
    group: 'ThreeJs',
    kind: 'Light',
    types: ['Layer']
  }, {
    label: 'RectArea Light',
    template: 'RectAreaLight',
    group: 'ThreeJs',
    kind: 'Light',
    types: ['Layer']
  }, {
    label: 'Spot Light',
    template: 'SpotLight',
    group: 'ThreeJs',
    kind: 'Light',
    types: ['Layer']
  }, {
    label: 'Basic Material',
    template: 'BasicMaterial',
    group: 'ThreeJs',
    kind: 'Material',
    types: ['Layer']
  }, {
    label: 'Lambert Material',
    template: 'LambertMaterial',
    group: 'ThreeJs',
    kind: 'Material',
    types: ['Layer']
  }, {
    label: 'Matcap Material',
    template: 'MatcapMaterial',
    group: 'ThreeJs',
    kind: 'Material',
    types: ['Layer']
  }, {
    label: 'Phong Material',
    template: 'PhongMaterial',
    group: 'ThreeJs',
    kind: 'Material',
    types: ['Layer']
  }, {
    label: 'Physical Material',
    template: 'PhysicalMaterial',
    group: 'ThreeJs',
    kind: 'Material',
    types: ['Layer']
  }, {
    label: 'Shader Material',
    template: 'ShaderMaterial',
    group: 'ThreeJs',
    kind: 'Material',
    types: ['Layer']
  }, {
    label: 'Standard Material',
    template: 'StandardMaterial',
    group: 'ThreeJs',
    kind: 'Material',
    types: ['Layer']
  }, {
    label: 'SubSurface Material',
    template: 'SubSurfaceMaterial',
    group: 'ThreeJs',
    kind: 'Material',
    types: ['Layer']
  }, {
    label: 'Toon Material',
    template: 'ToonMaterial',
    group: 'ThreeJs',
    kind: 'Material',
    types: ['Layer']
  }, {
    label: 'Mesh',
    template: 'Mesh',
    group: 'ThreeJs',
    kind: 'Meshes',
    types: ['Layer']
  }, {
    label: 'Box',
    template: 'Box',
    group: 'ThreeJs',
    kind: 'Meshes',
    types: ['Layer']
  }, {
    label: 'Circle',
    template: 'Circle',
    group: 'ThreeJs',
    kind: 'Meshes',
    types: ['Layer']
  }, {
    label: 'Cone',
    template: 'Cone',
    group: 'ThreeJs',
    kind: 'Meshes',
    types: ['Layer']
  }, {
    label: 'Cylinder',
    template: 'Cylinder',
    group: 'ThreeJs',
    kind: 'Meshes',
    types: ['Layer']
  }, {
    label: 'Dodecahedron',
    template: 'Dodecahedron',
    group: 'ThreeJs',
    kind: 'Meshes',
    types: ['Layer']
  }, {
    label: 'Icosahedron',
    template: 'Icosahedron',
    group: 'ThreeJs',
    kind: 'Meshes',
    types: ['Layer']
  }, {
    label: 'Lathe',
    template: 'Lathe',
    group: 'ThreeJs',
    kind: 'Meshes',
    types: ['Layer']
  }, {
    label: 'Octahedron',
    template: 'Octahedron',
    group: 'ThreeJs',
    kind: 'Meshes',
    types: ['Layer']
  }, {
    label: 'Plane',
    template: 'Plane',
    group: 'ThreeJs',
    kind: 'Meshes',
    types: ['Layer']
  }, {
    label: 'Polyhedron',
    template: 'Polyhedron',
    group: 'ThreeJs',
    kind: 'Meshes',
    types: ['Layer']
  }, {
    label: 'Ring',
    template: 'Ring',
    group: 'ThreeJs',
    kind: 'Meshes',
    types: ['Layer']
  }, {
    label: 'Sphere',
    template: 'Sphere',
    group: 'ThreeJs',
    kind: 'Meshes',
    types: ['Layer']
  }, {
    label: 'Tetrahedron',
    template: 'Tetrahedron',
    group: 'ThreeJs',
    kind: 'Meshes',
    types: ['Layer']
  }, {
    label: 'Torus',
    template: 'Torus',
    group: 'ThreeJs',
    kind: 'Meshes',
    types: ['Layer']
  }, {
    label: 'TorusKnot',
    template: 'TorusKnot',
    group: 'ThreeJs',
    kind: 'Meshes',
    types: ['Layer']
  }, {
    label: 'Tube',
    template: 'Tube',
    group: 'ThreeJs',
    kind: 'Meshes',
    types: ['Layer']
  }, {
    label: 'Box Geometry',
    template: 'BoxGeometry',
    group: 'ThreeJs',
    kind: 'Geometries',
    types: ['Layer']
  }, {
    label: 'Circle Geometry',
    template: 'CircleGeometry',
    group: 'ThreeJs',
    kind: 'Geometries',
    types: ['Layer']
  }, {
    label: 'Cone Geometry',
    template: 'ConeGeometry',
    group: 'ThreeJs',
    kind: 'Geometries',
    types: ['Layer']
  }, {
    label: 'Cylinder Geometry',
    template: 'CylinderGeometry',
    group: 'ThreeJs',
    kind: 'Geometries',
    types: ['Layer']
  }, {
    label: 'Dodecahedron Geometry',
    template: 'DodecahedronGeometry',
    group: 'ThreeJs',
    kind: 'Geometries',
    types: ['Layer']
  }, {
    label: 'Icosahedron Geometry',
    template: 'IcosahedronGeometry',
    group: 'ThreeJs',
    kind: 'Geometries',
    types: ['Layer']
  }, {
    label: 'Lathe  Geometry',
    template: 'LatheGeometry',
    group: 'ThreeJs',
    kind: 'Geometries',
    types: ['Layer']
  }, {
    label: 'Octahedron Geometry',
    template: 'OctahedronGeometry',
    group: 'ThreeJs',
    kind: 'Geometries',
    types: ['Layer']
  }, {
    label: 'Plane Geometry',
    template: 'PlaneGeometry',
    group: 'ThreeJs',
    kind: 'Geometries',
    types: ['Layer']
  }, {
    label: 'Polyhedron Geometry',
    template: 'PolyhedronGeometry',
    group: 'ThreeJs',
    kind: 'Geometries',
    types: ['Layer']
  }, {
    label: 'Ring Geometry',
    template: 'RingGeometry',
    group: 'ThreeJs',
    kind: 'Geometries',
    types: ['Layer']
  }, {
    label: 'Sphere Geometry',
    template: 'SphereGeometry',
    group: 'ThreeJs',
    kind: 'Geometries',
    types: ['Layer']
  }, {
    label: 'Tetrahedron  Geometry',
    template: 'TetrahedronGeometry',
    group: 'ThreeJs',
    kind: 'Geometries',
    types: ['Layer']
  }, {
    label: 'Torus Geometry',
    template: 'TorusGeometry',
    group: 'ThreeJs',
    kind: 'Geometries',
    types: ['Layer']
  }, {
    label: 'TorusKnot Geometry',
    template: 'TorusKnotGeometry',
    group: 'ThreeJs',
    kind: 'Geometries',
    types: ['Layer']
  }, {
    label: 'Tube Geometry',
    template: 'TubeGeometry',
    group: 'ThreeJs',
    kind: 'Geometries',
    types: ['Layer']
  }, {
    label: 'Gltf Model',
    template: 'GltfModel',
    group: 'ThreeJs',
    kind: 'Models',
    types: ['Layer']
  }, {
    label: 'Fbx Model',
    template: 'FbxModel',
    group: 'ThreeJs',
    kind: 'Models',
    types: ['Layer']
  }, {
    label: 'Effect Composer',
    template: 'EffectComposer',
    group: 'ThreeJs',
    kind: 'Postprocessing',
    types: ['Layer']
  }, {
    label: 'Bokeh Pass',
    template: 'BokehPass',
    group: 'ThreeJs',
    kind: 'Postprocessing',
    types: ['Layer']
  }, {
    label: 'Film Pass',
    template: 'FilmPass',
    group: 'ThreeJs',
    kind: 'Postprocessing',
    types: ['Layer']
  }, {
    label: 'FXAA Pass',
    template: 'FXAAPass',
    group: 'ThreeJs',
    kind: 'Postprocessing',
    types: ['Layer']
  }, {
    label: 'Halftone Pass',
    template: 'HalftonePass',
    group: 'ThreeJs',
    kind: 'Postprocessing',
    types: ['Layer']
  }, {
    label: 'Render Pass',
    template: 'RenderPass',
    group: 'ThreeJs',
    kind: 'Postprocessing',
    types: ['Layer']
  }, {
    label: 'SMAA Pass',
    template: 'SMAAPass',
    group: 'ThreeJs',
    kind: 'Postprocessing',
    types: ['Layer']
  }, {
    label: 'UnrealBloom Pass',
    template: 'UnrealBloomPass',
    group: 'ThreeJs',
    kind: 'Postprocessing',
    types: ['Layer']
  }, {
    label: 'Texture',
    template: 'Texture',
    group: 'ThreeJs',
    kind: 'Textures',
    types: ['Layer']
  }, {
    label: 'CubeTexture',
    template: 'CubeTexture',
    group: 'ThreeJs',
    kind: 'Textures',
    types: ['Layer']
  }, {
    label: 'Raycaster',
    template: 'Raycaster',
    group: 'ThreeJs',
    kind: 'Other',
    types: ['Layer']
  }, {
    label: 'Group',
    template: 'Group',
    group: 'ThreeJs',
    kind: 'Other',
    types: ['Layer']
  }
]

export const componentArray = [ergates, vants, els, trois].flat(Infinity)
export const components = {}
componentArray.forEach(component => {
  if (components[component.group]) {
    let kind = components[component.group].filter(g => g.label == component.kind)
    if (kind.length) {
      kind[0].children.push(component)
    } else {
      components[component.group].push({
        label: component.kind,
        children: [component]
      })
    }
  } else {
    components[component.group] = [{
      label: component.kind,
      children: [component]
    }]
  }
})

export const checkLayer = (type) => {
  let current = componentArray.filter(component => component.template == type)
  return current[0] ? current[0].types.indexOf('Layer') != -1 : false
}

export const checkContainer = (type) => {
  let current = componentArray.filter(component => component.template == type)
  return current[0] ? current[0].types.indexOf('Container') != -1 : false
}

export const checkList = (type) => {
  let current = componentArray.filter(component => component.template == type)
  return current[0] ? current[0].types.indexOf('List') != -1 : false
}

export const checkSelect = (type) => {
  let current = componentArray.filter(component => component.template == type)
  return current[0] ? current[0].types.indexOf('Select') != -1 : false
}

export default {
  ElementPlus: [{
      label: 'Navigation 导航',
      children: []
    }, {
      label: 'Feedback 反馈组件',
      children: []
    }, {
      label: 'Others 其他',
      children: []
    }
  ]
}