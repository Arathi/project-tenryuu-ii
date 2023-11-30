<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import MovieView from './MovieView.vue';
import Movie from '../domains/Movie';

const props = defineProps<{
  movies: Movie[];
}>();

const width = ref(window.innerWidth);
const widthPx = computed(() => `${width.value-50}px`);

onMounted(() => {
  window.onresize = () => {
    width.value = window.innerWidth;
    console.info(`更新宽度：${width.value}`);
  };
});
</script>

<template>
  <div class="movie-list">
    <movie-view
      v-for="movie in movies"
      :key="movie.bango"
      :movie="movie"
    />
  </div>
</template>

<style scoped lang="less">
.movie-list {
  display: flex;
  flex-direction: column;
  width: v-bind(widthPx);
  margin: 16px;
}
</style>