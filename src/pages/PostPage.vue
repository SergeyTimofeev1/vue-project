
// Описываем структуру компонента
<template>
  <div>
    <div class="container">
      <h1>Страница с постами</h1>
      <my-input v-model="searchQuery" v-focus placeholder="Поиск по постам" />
      <div class="app__btns">
        <my-button @click="showDialog">Создать пост </my-button>
        <my-select v-model="selectedSort" :options="sortOptions" />
      </div>
      <my-dialog v-model:show="dialogVisible">
        <post-form @create="createPost" />
      </my-dialog>
      <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostLoading"
      />
      <div v-else>Идет загрузка...</div>
      <div v-intersection="loadMorePosts" class="observer"></div>
      <!-- <div class="page__wrapper">
        <div 
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          class="page"
          :class="{
            'current-page': page === pageNumber
          }"
          @click="changePage(pageNumber)"
        >
          {{ pageNumber }}
        </div>
      </div> -->
    </div>
  </div>
</template>

// Описываем логику компонента
<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MySelect from "@/components/UI/MySelect.vue";
import axios from "axios";
export default {
  components: {
    PostList,
    PostForm,
    MySelect,
  },
  // структура компонента МОДЕЛЬКИ
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: "",
      searchQuery: "",
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: "title", name: "по названию" },
        { value: "body", name: "по тексту поста" },
      ],
    };
  },
  // Функционал компонента
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber
    // },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = response.data;
      } catch {
        alert("Ошибка");
      } finally {
        this.isPostLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = [...this.posts, ...response.data];
      } catch {
        alert("Ошибка");
      } finally {
      }
    },
  },
  mounted() {
    this.fetchPosts();
    // const options = {
    //   rootMargin: "0px",
    //   threshold: 1.0,
    // };
    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     this.loadMorePosts();
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);
  },
  watch: {
    // page() {
    //   this.fetchPosts()
    // }
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      );
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
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