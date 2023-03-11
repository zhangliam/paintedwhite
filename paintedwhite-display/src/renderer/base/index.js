import Alert from './basic/dialog/alert'
import Confirm from './basic/dialog/confirm'
import Loading from './basic/dialog/loading'
import Notify from './basic/dialog/notify'
import Toast from './basic/dialog/toast'

const Base = {
  name: 'Base'
}

Base.install = function (Vue) {
	const files	 = require.context('./', true, /\.vue$/);
	files.keys().forEach(key => {
		const component = files(key).default;
		Vue.component(component.name, component);
	});

  Vue.$dialog = Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading,
  }
}

export default Base
