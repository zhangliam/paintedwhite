const Platform = {
  name: 'Platform'
}

Platform.install = function (Vue) {
	const files	 = require.context('./', true, /\.vue$/);
	files.keys().forEach(key => {
		const component = files(key).default;
		Vue.component(component.name, component);
	});
}

export default Platform