<script setup lang="ts">
import { computed } from 'vue';
import Star from './Star.vue';
import { Label as MovieLabel } from '../domains/MovieDetails';

const props = defineProps<{
  category: MovieLabel;
}>();

const categoryURL = computed(() => `/genre/${props.category.value}`);

function collect() {
  //
}
</script>

<template>
  <div class="category">
    <star @click="collect"/>
    <a :href="categoryURL">
      <label>{{category.name}}</label>
    </a>
  </div>
</template>

<style scoped lang="less">
.category {
  display: flex;
  flex-direction: row;
}
</style>
