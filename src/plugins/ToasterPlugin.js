import TheToaster from "../components/TheToaster";

export const ToasterPlugin = {

   install(Vue, options = {}) {
      let { container } = options;
      if (!container) {
         container = document.createElement('div');
         document.body.appendChild(container);
      }

      const toaster = new Vue(TheToaster).$mount(container);
      Vue.prototype.$toaster = toaster;
   }
}