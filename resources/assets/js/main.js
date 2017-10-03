import Vue from "vue";

import PromisesBus		from "~/utils/PromisesBus";

import Alert			from "#/utils/Alert.vue";
import Form				from "#/utils/Form.vue";
import ModalManager		from "#/ModalManager.vue";
import Profile			from "#/Profile.vue";

window.$ = window.jQuery = require('jquery');
window.Popper = require('popper.js/dist/umd/popper.js');
require('bootstrap');

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
let token = document.head.querySelector("meta[name=\"csrf-token\"]");
if (token) {
	axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
} else {
	console.error("CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token");
}

Object.defineProperty(Vue.prototype,"$bus",{
	get: function() {
		return this.$root.bus;
	}
});

Object.defineProperty(Vue.prototype,"$promises",{
	get: function() {
		return this.$root.promisesBus;
	}
});

Object.defineProperty(Vue.prototype,"$rootData",{
	get: function() {
		return window.RAG;
	}
});

Vue.component("Alert",Alert);
Vue.component("Form",Form);
Vue.component("ModalManager",ModalManager);
Vue.component("Profile",Profile);

new Vue({
	el: "#app",
	data: {
		bus: new Vue({}),
		promisesBus: new PromisesBus()
	}
});
