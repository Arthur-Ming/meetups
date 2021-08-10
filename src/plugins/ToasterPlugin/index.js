import TheToaster from './TheToaster';

export default {
  instance: null,

  setInstance(instance) {
    this.instance = instance;
  },

  error(message) {
    if (!this.instance) {
      this.setInstance(TheToaster);
      this.instance.error(message);
    } else {
      this.instance.error(message);
    }
  },

  success(message) {
    if (!this.instance) {
      this.setInstance(TheToaster);
      this.instance.success(message);
    } else {
      this.instance.success(message);
    }
  },
};
