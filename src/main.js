import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const pinia = createPinia()

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/css/style.css'

// sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

//charts
import VueApexCharts from "vue3-apexcharts";

// json . excel
import JsonExcel from "vue-json-excel3";

const app = createApp(App)
app.component("downloadExcel", JsonExcel);
app.config.globalProperties.$filters = {
    currency(value) {
        return new Intl.NumberFormat('es-CL').format(parseFloat(value));
    }
}
app.use(router)
app.use(pinia)
app.use(VueSweetalert2)
app.use(VueApexCharts)
app.mount('#app')
