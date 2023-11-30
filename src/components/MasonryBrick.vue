<script lang="ts" setup>
import {computed} from 'vue';

import Movie from '../domains/Movie';
import Tag from '../domains/Tag';
import Color from '../domains/Color';

const props = defineProps<{
  movie: Movie
}>();

const pageURL = computed(() => `/${props.movie.bango}`);

const xPx = computed(() => `${props.movie.x}px`);
const yPx = computed(() => `${props.movie.y}px`);

const tags = computed<Tag[]>(() => {
  if (props.movie.tags == undefined) return [];
  return props.movie.tags;
});

const color = computed<string|undefined>(() => {
  const c = new Color(0xFF, 0x50, 0x04);
  return c.hex;
});
</script>

<template>
  <div class="item masonry-brick">
    <a class="movie-box" :href="pageURL">
      <div class="photo-frame">
        <img :src="movie.thumb"
             :title="movie.title"
        />
      </div>
      <div class="photo-info">
        <span>{{movie.title}}<br>
          <div class="item-tag">
            <template v-for="tag in tags">
              <button
                :class="tag.classNames"
                disabled="disabled"
                :title="tag.description"
              >
                {{tag.title}}
              </button>
            </template>
          </div>
          <date>{{movie.bango}}</date>
          /
          <date>{{movie.releaseDate}}</date>
        </span>
      </div>
    </a>
  </div>
</template>

<style scoped lang="less">
.masonry-brick {
  position: absolute;
  top: v-bind(xPx);
  left: v-bind(yPx);

  .movie-box {
    background-color: v-bind(color);
  }
}
</style>
