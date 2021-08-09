import TheTopProgressBar from "./TheTopProgressBar";
import TopProgressBar from './index';

export default {

  install(Vue, options = {}) {
    let { container } = options;
    if (!container) {
      container = document.createElement('div');
      document.body.appendChild(container);
    }

    TopProgressBar.setInstance(new Vue(TheTopProgressBar).$mount(container));
    Vue.prototype.$progress = TopProgressBar;


    Vue.$progress = TopProgressBar;

    if (options && options.router) {
      options.router.beforeEach((to, from, next) => {
        TopProgressBar.start();
        next();
      });

      options.router.afterEach(() => {
        TopProgressBar.finish();
      });

      options.router.onError((err) => {

        TopProgressBar.fail();
        throw err;
      });
    }
  }
}