
// Описываем структуру компонента
<template>
  <div>
    <div class="container">
      <h1>Страница с постами</h1>
      <my-input 
        v-model="searchQuery" 
        v-focus 
        placeholder="Поиск по постам" 
      />
      <div class="app__btns">
        <my-button @click="showDialog">Создать пост </my-button>
        <my-select v-model="selectedSort" :options="sortOptions" />
      </div>
      <my-dialog v-model:show="dialogVisible">
        <post-form />
      </my-dialog>
      <post-list :posts="sortedAndSearchedPosts" v-if="!isPostLoading" />
      <div v-else>Идет загрузка...</div>
    </div>
  </div>
</template>

// Описываем логику компонента
<script>
import PostForm from "@/components/PostForm.vue";
import MyButton from '@/components/UI/MyButton.vue'
import PostList from "@/components/PostList.vue";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";
import { usePosts } from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts.js";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts.js";
import { ref } from "vue";
import axios from "axios";

export default {
  components: {
    PostList,
    PostForm,
    MySelect,
    MyButton,
    MyInput,
  },
  // структура компонента МОДЕЛЬКИ
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "по названию" },
        { value: "body", name: "по тексту поста" },
      ],
    };
  },
  setup(props) {
    const { posts, totalPages, isPostLoading } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } =
      useSortedAndSearchedPosts(sortedPosts);

    return {
      posts,
      totalPages, 
      isPostLoading, 
      sortedPosts, 
      selectedSort, 
      searchQuery, 
      sortedAndSearchedPosts
    };
  },
};
</script>


// Стилизуем компонент


<style>
.app__btns {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}
</style>