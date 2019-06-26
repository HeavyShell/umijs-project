import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import { routerRedux } from 'dva/router';



let Router = DefaultRouter;
const { ConnectedRouter } = routerRedux;
Router = ConnectedRouter;


let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/404",
        "exact": true,
        "component": require('../404.js').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default
      },
      {
        "path": "/about/models/about",
        "exact": true,
        "component": require('../about/models/about.js').default
      },
      {
        "path": "/film/domestic/edit/:id?",
        "exact": true,
        "component": require('../film/domestic/edit/$id$.js').default
      },
      {
        "path": "/film/domestic",
        "exact": true,
        "component": require('../film/domestic/index.js').default
      },
      {
        "path": "/film/foreign/edit/:id?",
        "exact": true,
        "component": require('../film/foreign/edit/$id$.js').default
      },
      {
        "path": "/film/foreign",
        "exact": true,
        "component": require('../film/foreign/index.js').default
      },
      {
        "path": "/film/models/film",
        "exact": true,
        "component": require('../film/models/film.js').default
      },
      {
        "path": "/user/models/user",
        "exact": true,
        "component": require('../user/models/user.js').default
      },
      {
        "path": "/about",
        "exact": true,
        "component": require('../about/index.js').default
      },
      {
        "path": "/login/models/login",
        "exact": true,
        "component": require('../login/models/login.js').default
      },
      {
        "path": "/music/edit/:id?",
        "exact": true,
        "component": require('../music/edit/$id$.js').default
      },
      {
        "path": "/music",
        "exact": true,
        "component": require('../music/index.js').default
      },
      {
        "path": "/music/models/music",
        "exact": true,
        "component": require('../music/models/music.js').default
      },
      {
        "path": "/user/components/InputPicture",
        "exact": true,
        "component": require('../user/components/InputPicture.js').default
      },
      {
        "path": "/user/edit/:id?",
        "exact": true,
        "component": require('../user/edit/$id$.js').default
      },
      {
        "path": "/user",
        "exact": true,
        "component": require('../user/index.js').default
      },
      {
        "path": "/login",
        "exact": true,
        "component": require('../login/index.js').default
      },
      {
        "component": () => React.createElement(require('E:/work/webRTC/umiV1.3.18-20180828/node_modules/_umi-build-dev@0.22.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', routes: '[{"path":"/","component":"./src\\\\layouts\\\\index.js","routes":[{"path":"/404","exact":true,"component":"./src/pages/404.js"},{"path":"/","exact":true,"component":"./src/pages/index.js"},{"path":"/about/models/about","exact":true,"component":"./src/pages/about/models/about.js"},{"path":"/film/domestic/edit/:id?","exact":true,"component":"./src/pages/film/domestic/edit/$id$.js"},{"path":"/film/domestic","exact":true,"component":"./src/pages/film/domestic/index.js"},{"path":"/film/foreign/edit/:id?","exact":true,"component":"./src/pages/film/foreign/edit/$id$.js"},{"path":"/film/foreign","exact":true,"component":"./src/pages/film/foreign/index.js"},{"path":"/film/models/film","exact":true,"component":"./src/pages/film/models/film.js"},{"path":"/user/models/user","exact":true,"component":"./src/pages/user/models/user.js"},{"path":"/about","exact":true,"component":"./src/pages/about/index.js"},{"path":"/login/models/login","exact":true,"component":"./src/pages/login/models/login.js"},{"path":"/music/edit/:id?","exact":true,"component":"./src/pages/music/edit/$id$.js"},{"path":"/music","exact":true,"component":"./src/pages/music/index.js"},{"path":"/music/models/music","exact":true,"component":"./src/pages/music/models/music.js"},{"path":"/user/components/InputPicture","exact":true,"component":"./src/pages/user/components/InputPicture.js"},{"path":"/user/edit/:id?","exact":true,"component":"./src/pages/user/edit/$id$.js"},{"path":"/user","exact":true,"component":"./src/pages/user/index.js"},{"path":"/login","exact":true,"component":"./src/pages/login/index.js"}]}]' })
      }
    ]
  }
];


export default function() {
  return (
<Router history={window.g_history}>
  <Route render={({ location }) =>
    renderRoutes(routes, {}, { location })
  } />
</Router>
  );
}
