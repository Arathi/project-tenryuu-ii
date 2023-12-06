import {createApp} from 'vue';
import {createPinia} from 'pinia';
import App from './App.vue';

const appNode = (() => {
  const node = document.createElement('div');
  node.id = 'edh2-app';
  let parent: HTMLElement|null = document.body; // document.querySelector("#waterfall.masonry");
  // if (parent == null) parent = document.body;
  parent.append(node);
  return node;
})();

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.mount("#edh2-app");
