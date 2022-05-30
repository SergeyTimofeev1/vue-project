<template>
  <div class="navbar">
    <div @click="$router.push('/')" style="cursor:pointer">Vue 3</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Страница постов</my-button>
      <my-button @click="$router.push('/about')">Инфо о приложении</my-button>
      <my-button @click="$router.push('/store')">Store</my-button>
      <my-button @click="$router.push('/composition')">Composition</my-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 1.5rem;
  justify-content: space-between;
}
.navbar__btns {
  display: flex;
  gap: .3rem;
}
</style>