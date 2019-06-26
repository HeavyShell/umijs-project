import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

let app = dva({
  history: window.g_history,
  ...((require('E:/work/webRTC/umiV1.3.18-20180828/src/dva.js').config || (() => ({})))()),
});

window.g_app = app;
app.use(createLoading());

app.model({ namespace: 'app', ...(require('E:/work/webRTC/umiV1.3.18-20180828/src/models/app.js').default) });
app.model({ namespace: 'home', ...(require('E:/work/webRTC/umiV1.3.18-20180828/src/models/home.js').default) });
app.model({ namespace: 'about', ...(require('E:/work/webRTC/umiV1.3.18-20180828/src/pages/about/models/about.js').default) });
app.model({ namespace: 'film', ...(require('E:/work/webRTC/umiV1.3.18-20180828/src/pages/film/models/film.js').default) });
app.model({ namespace: 'user', ...(require('E:/work/webRTC/umiV1.3.18-20180828/src/pages/user/models/user.js').default) });
app.model({ namespace: 'login', ...(require('E:/work/webRTC/umiV1.3.18-20180828/src/pages/login/models/login.js').default) });
app.model({ namespace: 'music', ...(require('E:/work/webRTC/umiV1.3.18-20180828/src/pages/music/models/music.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
