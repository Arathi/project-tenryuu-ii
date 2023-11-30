<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from 'vue';
import Waterfall from './components/Waterfall.vue';
import MovieList from './components/MovieList.vue';
import Movie from './domains/Movie';
import Tag from './domains/Tag';

enum Type {
  Waterfall,
  MovieList
}

const movies = ref<Movie[]>();
const type = ref<Type>(Type.MovieList);

onBeforeMount(() => {
  const list: Movie[] = [];

  const items = document.querySelectorAll("#waterfall>#waterfall>div.item");
  for (let itemIndex=0; itemIndex<items.length; itemIndex++) {
    const item = items[itemIndex] as HTMLDivElement;

    const top = item.style.top;
    const x = Number(top.substring(0, top.length - 2));
    const left = item.style.left;
    const y = Number(left.substring(0, left.length - 2));

    const image: HTMLImageElement|null = item.querySelector(".photo-frame img");
    const thumb = image?.src;
    const title = image?.title;

    const dateNodes = item.querySelectorAll(".photo-info date");
    const bango = dateNodes[0].innerHTML;
    const releaseDate = dateNodes[1].innerHTML;

    const tags: Tag[] = [];
    const buttonNodes = item.querySelectorAll(".item-tag button");
    for (let buttonIndex=0; buttonIndex<buttonNodes.length; buttonIndex++) {
      const button = buttonNodes[buttonIndex];
      tags.push({
        classNames: button.className,
        title: button.innerHTML,
        description: button.getAttribute("title"),
      } as Tag);
    }

    const movie = {
      bango,
      thumb,
      title,
      tags,
      releaseDate,
      x,
      y
    } as Movie;

    console.info("获取电影信息：", movie);
    list.push(movie);
  }

  movies.value = list;
});

onMounted(() => {
  const waterfall: HTMLDivElement|null = document.querySelector("#waterfall>#waterfall");
  if (waterfall != null) {
    waterfall.hidden = true;
  }
});
</script>

<template>
  <waterfall :movies="movies" v-if="type == Type.Waterfall" />
  <movie-list :movies="movies" v-if="type == Type.MovieList" />
</template>

<style scoped lang="less">
</style>
