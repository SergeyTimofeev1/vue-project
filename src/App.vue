<template>
  <div class="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/UI/Navbar.vue";
export default {
  components: { Navbar },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  margin: 0 auto;
  display: block;
  padding: 0 15px;
}
</style>