<script setup lang="ts">
import {onMounted, ref} from 'vue';
import MasonryBrick from './MasonryBrick.vue';
import Movie from '../domains/Movie';

const props = defineProps<{
  movies: Movie[];
}>();

onMounted(() => {

});
</script>

<template>
  <div class="waterfall">
    <masonry-brick
      v-for="movie in movies"
      :key="movie.bango"
      :movie="movie"
    />
  </div>
</template>

<style scoped lang="less">
.waterfall {
  position: relative;
}
</style>