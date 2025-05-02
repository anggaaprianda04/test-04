import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import { provideApolloClient } from '@vue/apollo-composable';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import instanceApollo from './apollo/instanceApollo';

const routes = [
    { path: '/', name: 'Home', component: Home }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App);

app.use(createPinia);
app.use(router);
provideApolloClient(instanceApollo);
app.mount("#app");