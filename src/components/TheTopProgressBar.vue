<template>
  <div
    class="progress"
    :class="{ show: isShow, failed: isFail }"
    :style="{ width: currentProgress + '%' }"
  ></div>
</template>

<script>
export default {
  name: "TheTopProgressBar",

  data() {
    return {
      isShow: false,
      isFail: false,
      currentProgress: 0,
      requestId: null,
    };
  },

  methods: {
    start() {
      if (!this.isShow) {
        this.isFail = false;

        this.isShow = true;
        this.currentProgress = 0;

        this.animate({
          duration: 10000,
          timing: (timeFraction) => {
            return timeFraction == 1
              ? 1
              : 1 * (-Math.pow(2, (-10 * timeFraction) / 1) + 1); //easeOutExpo
          },
          draw: (progress) => {
            this.currentProgress = progress * 100;
          },
        });
      }
    },

    finish() {
      if (this.isShow) {
        cancelAnimationFrame(this.requestId);
        const currentProgress = this.currentProgress;
        this.animate({
          duration: 500,
          timing: (timeFraction) => {
            return timeFraction;
          },
          draw: (progress) => {
            this.currentProgress = currentProgress + progress * 100;
            if (this.currentProgress > 100) this.currentProgress = 100;
          },
        });
      }
    },

    fail() {
      this.isFail = true;
      this.isShow = true;
      this.finish();
    },

    animate({ duration, draw, timing }) {
      const start = performance.now();

      const animate = (time) => {
        let timeFraction = (time - start) / duration;

        if (timeFraction > 1) timeFraction = 1;

        const progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1 && this.currentProgress < 100) {
          this.requestId = requestAnimationFrame(animate);
        } else {
          this.isShow = false;

          this.isFail = false;
          this.currentProgress = 0;
        }
      };

      requestAnimationFrame(animate);
    },
  },
};
</script>

<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  width: 0;
  opacity: 0;
  background: var(--blue);
  transition: all 0.2s linear 0.2s;

  z-index: 999999;
}

.progress.show {
  opacity: 1;
  transition: none;
}

.progress.failed {
  background-color: #db3851;
}
</style>
