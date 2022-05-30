<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text" />
</template>

<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style>
.input {
  width: 100%;
  padding: 10px 5px;
  border: 1px solid teal;
  margin-top: 15px;
  border-radius: 5px;
  outline: none;
}
</style>