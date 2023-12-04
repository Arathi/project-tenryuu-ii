<script setup lang="ts">
import { computed } from 'vue';
import Heart from './Heart.vue';
import { Actress } from '../domains/MovieDetails';

const props = defineProps<{
  actress: Actress;
}>();

const actressURL = computed(() => `/star/${props.actress.value}`);

function collect() {
  //
}
</script>

<template>
  <div class="actress">
    <heart @click="collect"/>
    <a :href="actressURL">
      <label>{{actress.name}}</label>
    </a>
  </div>
</template>

<style scoped lang="less">
</style>
