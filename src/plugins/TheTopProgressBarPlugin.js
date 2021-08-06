import TheTopProgressBar from "@/components/TheTopProgressBar";

export default {

  install(Vue, options = {}) {
    let { container } = options;
    if (!container) {
      container = document.createElement('div');
      document.body.appendChild(container);
    }

    const topProgressBar = new Vue(TheTopProgressBar).$mount(container);
    Vue.prototype.$progress = topProgressBar;

    Vue.$progress = topProgressBar;

    if (options && options.router) {
      options.router.beforeEach((to, from, next) => {
        topProgressBar.start();
        next();
      });

      options.router.afterEach(() => {
        topProgressBar.finish();
      });

      options.router.onError((err) => {

        topProgressBar.fail();
        throw err;
      });
    }
  }
}