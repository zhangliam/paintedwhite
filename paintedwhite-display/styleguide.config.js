// const path = require('path')

module.exports = {
	// set your styleguidist configuration here
	title: 'Lego Components API',
	// components: 'src/components/**/[A-Z]*.vue',
	// defaultExample: true,
	// showSidebar: false,
	// jssThemedEditor: false,
	pagePerSection: true,
	tocMode: 'expand',
	theme: './styleguide/theme.js',
	styles: './styleguide/styles.js',
	// require: ['./styleguide/vsc-prism.css'],
	usageMode: 'expand',
	exampleMode: 'expand',
	styleguideDir: 'dist',
	sections: [
		{
			name: 'Renderer',
			pagePerSection: true,
	    components: 'src/renderer/*.vue'
		},
		{
			name: 'Base',
			sections: [
        {
          name: 'Basic',
          sections: [
						{
							name: 'Container',
							pagePerSection: true,
							components: 'src/renderer/base/basic/container/**/*.vue'
						},
						{
							name: 'Form',
							pagePerSection: true,
							components: 'src/renderer/base/basic/form/**/*.vue'
						},
						{
							name: 'Layer',
							pagePerSection: true,
							components: 'src/renderer/base/basic/layer/**/*.vue',
							ignore: ['**/mask/*.vue']
						}
					]
        },
        {
          name: 'Extend',
					sections: [
						{
							name: 'Container',
							pagePerSection: true,
							components: 'src/renderer/base/extend/container/**/*.vue'
						},
						{
							name: 'Form',
							pagePerSection: true,
							components: 'src/renderer/base/extend/form/**/*.vue',
							ignore: ['**/actionsheet/*.vue']
						},
						{
							name: 'Layer',
							pagePerSection: true,
							components: 'src/renderer/base/extend/layer/**/*.vue'
						}
					]
        },
      ]
	  },
		{
			name: 'Platform',
			pagePerSection: true,
	    components: 'src/renderer/platform/**/**/*.vue'
	  }
	],
	// webpackConfig: {
	//   // custom config goes here
	// },
	exampleMode: 'expand'
}
