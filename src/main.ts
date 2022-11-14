import Vue,{ createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import "./utils/setAxios";
import "./common/style/reset.less";
import "./common/style/iconfont.css";
import 'lib-flexible/flexible'
createApp(App).use(store).use(router).mount('#app');
