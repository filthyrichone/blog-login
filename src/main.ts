import { createApp } from 'vue'
import App from './App.vue'
import "@/global.css";
import http from "./hooks/http";

const app = createApp(App);
app.use(http);
app.mount('#app')
