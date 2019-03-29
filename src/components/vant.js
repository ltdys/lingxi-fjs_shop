import {
  Button,
  Tabbar,
  TabbarItem,
  Cell,
  CellGroup,
  Icon,
  Row,
  Col,
  Popup,
  Field,
  List,
  Tag,
  Tab,
  Tabs,
  NavBar,
  Swipe,
  SwipeItem,
  RadioGroup,
  Radio,
  Actionsheet,
  GoodsAction, GoodsActionMiniBtn,
  DatetimePicker
} from 'vant'

const components = [
  Button,
  Tabbar, 
  TabbarItem,
  Cell,
  CellGroup,
  Icon,
  Row,
  Col,
  Popup,
  Field,
  List,
  Tag,
  Tab,
  Tabs,
  NavBar,
  Swipe, SwipeItem,
  RadioGroup, Radio,
  Actionsheet,
  GoodsAction, GoodsActionMiniBtn,
  DatetimePicker
]

const install = function (Vue) {
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
