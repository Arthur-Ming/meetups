<template>
  <div class="wrapper bg-grey">
    <the-header></the-header>
    <slot />
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";

export default {
  name: "BaseLayout",
  components: { TheFooter, TheHeader },
};
</script>

<style scoped>
main {
  flex: 1 0 auto;
}
</style>
