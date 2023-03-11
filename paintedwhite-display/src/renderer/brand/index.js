import Policy from './chanel/dialog/policy'

import './chanel/chanel.css'

const Brand = {
  name: 'Brand'
}

Brand.install = function (Vue) {
	const files	 = require.context('./', true, /\.vue$/);
	files.keys().forEach(key => {
		const component = files(key).default;
		Vue.component(component.name, component);
	});

	Vue.$dialog.policy = Vue.prototype.$dialog.policy = Policy
}

export default Brand