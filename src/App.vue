<template>
  <div id="app">
    <div id="toast"></div>
    <base-layout>
      <main class="main">
        <router-view />
      </main>
    </base-layout>
  </div>
</template>

<script>
import BaseLayout from "@/components/layouts/BaseLayout";
export default {
  name: "App",
  components: { BaseLayout },
};
</script>

<style scoped></style>
