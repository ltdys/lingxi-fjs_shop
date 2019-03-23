import icon from './common/icon'
import header from './common/header';
import page from './common/page';
import loadmore from './common/loadmore';

const components = [
  icon,header,page,loadmore
]

const install = function(Vue) {
  if (!Vue || install.installed) {
    return
  }

  components.forEach(component => {
    component.name && Vue.component(component.name, component)
  })
}

export default {
  install
}
