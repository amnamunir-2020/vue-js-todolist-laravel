

import './bootstrap';
import * as Vue from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

//   import { createApp } from 'vue';
//  const app = createApp({});



const app = Vue.createApp()
app.use(VueAxios, axios)

import TodoComponent from './components/TodoComponent.vue';
app.component('todo-component', TodoComponent);


 app.mount('#app');
