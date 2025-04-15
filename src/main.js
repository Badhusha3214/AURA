import './assets/main.css'

import { createApp, reactive } from 'vue'
import App from './App.vue'

import router from './router'
import store from "./store";

import 'flowbite';
import './registerServiceWorker'

// Create a global state for component reference
const globalState = reactive({
    homeViewInstance: null,
    registerHomeView(instance) {
        this.homeViewInstance = instance;
    },
    refreshHomeView() {
        if (this.homeViewInstance && typeof this.homeViewInstance.refreshData === 'function') {
            this.homeViewInstance.refreshData();
        }
    }
});

const app = createApp(App)

// Provide global state to all components
app.provide('globalState', globalState);

app.use(router)
app.use(store)

app.mount('#app')
