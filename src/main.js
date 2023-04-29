import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
import router from "./router";
import store from "./vuex";

const app = createApp(App);

app.use(Antd);

app.use(router);
app.use(store);

app.mount("#app");
