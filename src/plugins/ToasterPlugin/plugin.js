import TheToaster from "./TheToaster";
import Toaster from "./index";

export default {

   install(Vue, options = {}) {
      let { container } = options;
      if (!container) {
         container = document.createElement('div');
         document.body.appendChild(container);
      }
      Toaster.setInstance(new Vue(TheToaster).$mount(container));
      Vue.prototype.$toaster = Toaster;
      /*  const toaster = new Vue(TheToaster).$mount(container);
       Vue.prototype.$toaster = toaster; */
   }
}