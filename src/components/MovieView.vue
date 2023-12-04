<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';

import Category from './Category.vue';
import Actress from './Actress.vue';

import Color from '../domains/Color';
import Movie from '../domains/Movie';
import Tag from '../domains/Tag';
import {useSettingStore} from '../stores/SettingStore';
import MovieDetails from '../domains/MovieDetails';
import axios from 'axios';

const props = defineProps<{
  movie: Movie;
}>();

const details = ref<MovieDetails>();
const settingStore = useSettingStore();

const pageURL = computed(() => `/${props.movie.bango}`);

onMounted(() => {
  axios.get<string>(pageURL.value).then((resp) => {
    const dom = document.createElement('html');
    dom.innerHTML = resp.data;
    const headers = dom.querySelectorAll(".container .info > p > .header");
    const dts = {} as MovieDetails;
    let link: HTMLLinkElement|null = null;
    let idx = 0;
    for (const header of headers) {
      const field = header.textContent;
      switch (field) {
        case "識別碼:":
          dts.bango = header.nextElementSibling.textContent;
          break;
        case "發行日期:":
          dts.releaseDate = header.nextSibling.textContent;
          break;
        case "長度:":
          dts.length = header.nextSibling.textContent;
          break;
        case "導演:":
          link = header.nextElementSibling as HTMLLinkElement|null;
          if (link != null) {
            idx = link.href.lastIndexOf("/");
            dts.director = {
              name: link.textContent != null ? link.textContent : "",
              value: link.href.substring(idx+1),
            };
          }
          break;
        case "製作商:":
          link = header.nextElementSibling as HTMLLinkElement|null;
          if (link != null) {
            idx = link.href.lastIndexOf("/");
            dts.studio = {
              name: link.textContent != null ? link.textContent : "",
              value: link.href.substring(idx+1),
            };
          }
          break;
        case "發行商:":
          link = header.nextElementSibling as HTMLLinkElement|null;
          if (link != null) {
            idx = link.href.lastIndexOf("/");
            dts.publisher = {
              name: link.textContent != null ? link.textContent : "",
              value: link.href.substring(idx+1),
            };
          }
          break;
      }
    }

    dts.categories = [];
    const categoryNodes: NodeListOf<HTMLInputElement> = dom.querySelectorAll(".info input[name='gr_sel']");
    categoryNodes.forEach((cat) => {
      const a = cat.nextElementSibling as HTMLLinkElement|null;
      if (a != null) {
        dts.categories.push({
          name: a.innerText,
          value: cat.value,
        });
      }
    });

    dts.actresses = [];
    const actressNodes: NodeListOf<HTMLLinkElement> = dom.querySelectorAll("span.genre[onmouseover] > a");
    actressNodes.forEach((act) => {
      const href = act.href;
      const idx = href.lastIndexOf("/");
      const value = href.substring(idx+1);
      dts.actresses.push({
        name: act.innerText,
        value: value,
      });
    });

    details.value = dts;
  });
});

const color = computed<string|undefined>(() => {
  // const c = new Color(0xFF, 0x50, 0x04);
  // return c.hex;
  return '#FAFAFA';
});

const tags = computed<Tag[]>(() => {
  if (props.movie.tags == undefined) return [];
  return props.movie.tags;
});

const coverFilter = computed(() => {
  return `blur(${settingStore.coverBlur}px)`;
});
</script>

<template>
  <div class="movie-view">
    <div class="movie-cover">
      <img
        :src="movie.thumb"
        :title="movie.title"
      />
    </div>
    <div class="movie-info">
      <div class="title"><a :href="pageURL">{{movie.title}}</a></div>
      <div class="more">
        <div class="async-load-data" v-if="details != undefined">
          <div class="first-line">
            <div class="property length">长度：{{details.length}}</div>
            <div class="property director" v-if="details.director != undefined">
              导演：
              <a :href="`/director/${details.director.value}`">
                <label>{{details.director?.name}}</label>
              </a>
            </div>
            <div class="property studio" v-if="details.studio != undefined">
              制作商：
              <a :href="`/studio/${details.studio.value}`">
                <label>{{details.studio?.name}}</label>
              </a>
            </div>
            <div class="property publisher" v-if="details.publisher != undefined">
              发行商：
              <a :href="`/label/${details.publisher.value}`">
                <label>{{details.publisher?.name}}</label>
              </a>
            </div>
          </div>
          <div class="label-container">
            <span>分类：</span>
            <div class="labels">
              <category v-for="category in details.categories"
                :category="category"
              />
            </div>
          </div>
          <div class="label-container">
            <span>演员：</span>
            <div class="labels">
              <actress v-for="actress in details.actresses"
                :actress="actress"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mi-footer">
        <span class="bango">{{movie.bango}}</span>&nbsp;/&nbsp;<span class="release-date">{{movie.releaseDate}}</span>
        <div class="tag" v-for="tag in tags" :key="tag.title">
          <button
            :class="tag.classNames"
            disabled="true"
            :title="tag.description"
          >
            {{tag.title}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.movie-view {
  display: flex;
  flex-direction: row;

  width: 100%;
  margin-bottom: 8px;

  .movie-cover {
    display: flex;
    flex-direction: row;
    background-color: v-bind(color);
    justify-content: center;
    align-items: center;

    height: 216px;
    padding: 0 8px;

    img {
      width: 147px;
      height: 200px;
      filter: v-bind(coverFilter);
    }
  }

  .movie-info {
    display: flex;
    flex-direction: column;

    flex: 1;
    background-color: #FAFAFA;
    padding: 8px;

    .title {
      font-size: 1.25em;
      font-weight: bold;
    }

    .more {
      flex: 1;

      .async-load-data {
        .first-line {
          display: flex;
          flex-direction: row;

          .property {
            margin-right: 32px;
          }
        }

        .label-container {
          display: flex;
          flex-direction: column;

          .labels {
            display: flex;
            flex-direction: row;

            * {
              margin-right: 4px;
            }
          }
        }
      }
    }

    .mi-footer {
      display: flex;
      flex-direction: row;

      .tag {
        margin-left: 10px;
      }
    }
  }
}
</style>