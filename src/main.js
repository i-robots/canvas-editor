import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//to pass data between components
export const bus = new Vue();
//bus.$emit("event_name", {  })
//bus.$on("event_name", this.method);
//bus.$off("event_name", this.method);


new Vue({
    render: h => h(App),
}).$mount('#app')
