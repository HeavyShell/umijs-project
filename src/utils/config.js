import {OrderedMap,OrderedSet,Map,fromJS} from 'immutable';



/**
 * id菜单id
 * pid菜单父id,顶级菜单为0
 * name菜单的名称，翻译标识id
 * icon菜单的图标
 * show是否显示在菜单中，布尔值
 */
const routeData=[
  {
    id: 'login',
    pid: '0',
    name: 'Menu.login',
    icon: '',
    show: false,
    path: '/login',
  }, 
  {
    id: 'home',
    pid: '0',
    name: 'Menu.home',
    icon: 'home',
    show: true,
    path: '/',
  }, 
  {
    id: 'music',
    pid: '0',
    name: 'Menu.music',
    icon: 'sound',
    show: true,
    path: '/music',
  },
  {
    id: 'music-edit',
    pid: 'music',
    name: 'Menu.music',
    icon: '',
    show: false,
    path: '/music/edit/id?',
  },
  {
    id: 'film',
    pid: '0',
    name: 'Menu.film',
    icon: 'play-circle',
    show: true,
    path: '/film',
  },
  {
    id: 'film-domestic',
    pid: 'film',
    name: 'Menu.domestic',
    icon: 'api',
    show: true,
    path: '/film/domestic',
  },
  {
    id: 'film-domestic-edit',
    pid: 'film-domestic',
    name: 'Menu.domestic',
    icon: '',
    show: false,
    path: '/film/domestic/edit/id?',
  },
  {
    id: 'film-foreign',
    pid: 'film',
    name: 'Menu.foreign',
    icon: 'dribbble',
    show: true,
    path: '/film/foreign',
  },
  {
    id: 'film-foreign-edit',
    pid: 'film-foreign',
    name: 'Menu.foreign',
    icon: '',
    show: false,
    path: '/film/foreign/edit/id?',
  },
  {
    id: 'about',
    pid: '0',
    name: 'Menu.about',
    icon: 'idcard',
    show: true,
    path: '/about',
  },
  {
    id: 'user',
    pid: '0',
    name: 'Menu.user',
    icon: 'user',
    show: true,
    path: '/user',
  },
  {
    id: 'user-edit',
    pid: 'user',
    name: 'Menu.user',
    icon: 'user',
    show: false,
    path: '/user/edit/:id?',
  }
];

/**
 * 封装路由数据，利用id和pid的关联性处理
 */
const menuMap = (() => {
  let byId = OrderedMap();
  let byPid = OrderedMap();
  routeData.map(item => {
    byId = byId.set(item.id, fromJS(item));
    byPid = byPid.update(item.pid, obj => obj ? obj.add(item.id) : OrderedSet([item.id]))
    
  });
  return OrderedMap({
      byId,
      byPid
  });
})();

export default{
    routeData,
    menuMap
}