import {GM} from '$';
import {defineStore} from 'pinia';

interface State {
  coverBlur: number;
}

export const useSettingStore = defineStore('setting', {
  state: (): State => ({
    coverBlur: 5,
  }),
  getters: {},
  actions: {
    async load() {
      this.coverBlur = await GM.getValue<number>('coverBlur', 0);
    },
    save() {
      GM.setValue('coverBlur', this.coverBlur).then(() => {
        console.debug(`coverBlur保存成功：${this.coverBlur}`);
      });
    },
  },
});
