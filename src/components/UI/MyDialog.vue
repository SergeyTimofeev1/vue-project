<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin";
export default {
  name: "my-dialog",
  mixins: [toggleMixin],
  mounted() {
    console.log("d mounted");
  },
};
</script>

<style scoped>
.dialog {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
}
.dialog__content {
  padding: 15px 10px;
  margin: auto;
  background: #fff;
  border-radius: 15px;
  min-width: 500px;
}
</style>