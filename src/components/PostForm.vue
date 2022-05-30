<template>
  <form @submit.prevent>
    <my-input
      v-model='post.title'
      v-focus
      type="text"
      placeholder="Название "
    />
    <my-input
      v-model="post.body"
      type="text"
      placeholder="Описание "
    />
    <my-button 
    class="btn" 
    @click="createPost" 
    style="margin-top: 15px">
      Создать
    </my-button>
  </form>
</template>

<script>

export default {

  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      if (this.post.body != '' && this.post.title != ''){
        this.post.id = Date.now();
        this.$emit("create", this.post, "second param");
        this.post = {
          title: "",
          body: "",
        }
      };
    },
  },
}



</script>

<style>
form {
  display: flex;
  flex-direction: column;
}

</style>