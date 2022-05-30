<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'
};
</script>

<style scoped>
.btn {
  color: teal;
  align-self: flex-end;
  background-color: transparent;
  border: 1px solid teal;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}
</style>