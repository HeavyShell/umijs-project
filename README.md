### Demo地址：
http://umi.ixiewei.com

### umiJS之1.3.18版本搭建react项目经历

#### 一，项目搭建：

1 cnpm install umi -g 全局安装umi的1.3.18版本

2 umi -v 查看版本如下：
    1.3.18
    
3 mkdir 创建src目录，然后src下创建pages目录

4 pages下创建index.js,代码如下：

    export default () => <div>Index page</div>;
    
5 umi dev 运行项目，访问：http://localhost:8000/即可


#### 二，配置路由：

1 增加三个页面，用于模拟切换路由，/aa，/aa/bb，/cc

    umi约定方式，目录即路由,
    
    (1)src下新建aa目录，然后aa下创建index.js文件：export default () => <div>aa page</div>;
    
    (2)src/aa下新建bb目录，然后bb下创建index.js文件：export default () => <div>bb page</div>;
    
    (3)src下新建cc目录，然后cc下创建index.js文件：export default () => <div>cc page</div>;
    
2 访问路径分别为：

    http://localhost:8000/aa
    
    http://localhost:8000/aa/bb
    
    http://localhost:8000/cc
    
3 使用路由跳转Link

    (1)修改src/index.js:
    
    import Link from 'umi/link';
    export default () => (
        <div>
            Index page
            <div>
                <Link to={'/aa'}>去aa page</Link>
            </div>
            <div>
                <Link to={'/aa/bb'}>去bb page</Link>
            </div>
            <div>
                <Link to={'/cc'}>去cc page</Link>
            </div>
        </div>
    );
    (2)修改src/aa/index.js:
    import Link from 'umi/link';
    export default () => (
        <div>
            aa page
            <div>
                <Link to={'/aa/bb'}>去bb page</Link>
            </div>
            <div>
                <Link to={'/cc'}>去cc page</Link>
            </div>
            <div>
                <Link to={'/'}>去Index page</Link>
            </div>
        </div>
    );
    
    (3) bb，cc页面修改同上
    

#### 三，结合dva，页面接入store数据，model配置

1 安装依赖：cnpm install umi-plugin-dva --save

2 在 .umirc.js 里配置插件

    export default {
        plugins: ['umi-plugin-dva'],
    };
    
3 启动方式放于package.json中，修改package.json:

    {
        "scripts": {
            "start": "umi dev",
            "build": "umi build"
        },
        "dependencies": {
            "umi-plugin-dva": "^0.9.1"
        }
    }
    
4 src下增加models目录，存放全局model文件，下创建app.js

  (1)src/aa下创建models目录，然后创建aa.js的model  
  
  (2)src/aa/bb下创建models目录，然后创建bb.js的model  
  
  (3)src/cc下创建models目录，然后创建cc.js的model  
  
  给出aa.js代码如下：
  
    export default {
        namespace: 'aa',
        state: {
            name:'aa model',
        },
        subscriptions: {
            setup({ dispatch, history }) {  // eslint-disable-line
                return history.listen(({ pathname, query }) => {
                dispatch({type: 'dataInit', payload: {pathname}});
                });
            },
        },
    
        effects: {
            * dataInit({payload: {pathname}}, {put,call,select}){    
        
            },
        },
    
        reducers: {
        
        },
  
  };
  
5 每个页面模板中，获取model数据并显示，以aa/index.js为例：

    import Link from 'umi/link';
    import {connect} from 'dva';

    const Modules=({app,aaName}) => (
        <div>
            aa page
            <div>
                <Link to={'/aa/bb'}>去bb page</Link>
            </div>
            <div>
                <Link to={'/cc'}>去cc page</Link>
            </div>
            <div>
                <Link to={'/'}>去Index page</Link>
            </div>
            <div>
                app-model值为：{app['name']}
            </div>
            <div>
                aa-model值为：{aaName}
            </div>
        </div>
    );

    export default connect(({
        app,
        aa
    })=>({
        app,
        aaName:aa['name']
    }))(Modules)

#### 四，引入样式UI库antd

1 在首页中引入Button和Tag：import {Button,Tag} from 'antd';运行如下：

    <div>
        <Button type={'primary'}>按钮</Button>
        <Tag color={'green'}>标签</Tag>
    </div>

#### 五，国际化

1 安装immutable(数据操作工具，推荐使用这个)和react-intl（国际化插件）

2 翻译文件包中英繁，来自dva-cli代码项目，不重复书写低效代码，这里只讲怎么配置使用

3 使用immutable数据格式，对app的model做改造

4 以aa/index.js为例，做国际化

5 思路：创建i18字段存于app的model中，当前语言取自这里，当切换时，改变此变量即可


### 以上部分，项目基础已搭建完毕，可直接使用了，以下的就是与业务相关的一些步骤

#### 一，安装几个实用的包，将来项目中会用到

cnpm install path-to-regexp classnames moment axios react-helmet react-infinite-scroller --save

#### 二，导航菜单设计

1 定义路由菜单：
/  首页

/music  音乐列表

/music/edit/id?  音乐-新增编辑

/film  电影

    /film/domestic 电影-国产电影
    
    /film/domestic/edit/id? 电影-国产电影-新增编辑
    
    /film/foreign 电影-国外电影
    
    /film/foreign/edit/id? 电影-国外电影-新增编辑
    
/about  关于我们

2 修改router.js,按照新的菜单 填充routeData，重新修改routes下文件，重新修改models

3 utils下新建config.js文件，并把routes移入此文件，新建index.js把config和request导入，均作为utils导出


#### 三，布局设计

1 登录页单独一页，进入系统后页面分为上左右布局，通用的后台管理系统界面

2 src下新建layout目录，存放布局组件,修改router文件：

import Layout from './layout';
......

<Router history={history}>
      <Layout>
        <Switch>
        ......
            
3 左侧放入无限极菜单，动态控制菜单，涉及到父子关系，故routeData数据改造，增加id，pid，name，icon，show字段，
  并存储一份immutable数据menuMap于store中


#### 四，接入数据

1 临时借用豆瓣的电影和音乐数据：

国内电影：https://movie.douban.com/j/new_search_subjects?sort=T&range=0,10&tags=&start=0&countries=%E4%B8%AD%E5%9B%BD%E5%A4%A7%E9%99%86

国外电影：https://movie.douban.com/j/new_search_subjects?sort=T&range=0,10&tags=&start=0&countries=%E7%BE%8E%E5%9B%BD


#### 五，增加权限布局auth

1 app的store中设置字段token，用来检验是否有权限，此token为登录时，服务端返回的鉴权字段，
  前端也需要在sessionStorage中存储一份，解决页面刷新持久登录，在退出后清除即可
  
2 增加登录页面路由/login


#### 六，完善下404页面，完善页面翻译

1 修改404.js

2 完善页面主要翻译


#### 七,模拟数据mockjs的使用demo（不重要）

1 安装cnpm install mockjs --save

2 修改.roadhogrc.mock.js文件：

    const fs=require('fs');
    
    const path=require('path');
    
    const mockPath=path.join(__dirname+'/mock');

    const mock={};
    fs.readdirSync(mockPath).forEach(file=>{

        Object.assign(mock,require('./mock/'+file));
    });

    module.exports=mock;
    
3 修改.webpackrc文件，增加代理url：

    "/mock/api": {
        "target": "",
        "changeOrigin": true,
        "secure": false,
        "pathRewrite": { "^/mock/api" : "" }
    }
    
4 mock/下创建user.js,模拟user数据


5 创建user模块


### 使用：

1 下载包解压，进入目录

2 安装 npm i 或 cnpm i

3 运行 npm start启动后访问http://localhost:8000/

4 打包 npm run build
