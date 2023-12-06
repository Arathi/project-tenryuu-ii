<script lang="ts" setup>
import {ref, computed} from 'vue';
import {storeToRefs} from 'pinia';
import {useSettingStore} from '../stores/SettingStore';

const open = ref(false);
const store = useSettingStore();
const {coverBlur} = storeToRefs(store);

const dropdownClassNames = computed<string|undefined>(() => {
  if (open.value) return "open";
  return undefined;
});

function openDropdown() {
  open.value = true;
}

function closeDropdown() {
  open.value = false;
}
</script>

<template>
  <ul class="nav navbar-nav"
      @mouseenter="openDropdown"
      @mouseleave="closeDropdown"
  >
    <li class="dropdown">
      <a>
        <span class="hidden-md hidden-sm">设置</span>
        <span class="caret"></span>
      </a>
      <div class="menu-container" v-show="open">
        <label>
          <span class="field">模糊半径：</span>
          <input class="value" type="number" v-model="coverBlur" placeholder="模糊半径" />
        </label>
      </div>
    </li>
  </ul>
</template>

<style lang="less" scoped>
.dropdown {
  .menu-container {
    position: absolute;
    top: 100%;
    left: 0;
    border: 1px solid rgba(0,0,0,0.15);
    box-shadow: 0 6px 12px rgba(0,0,0,0.175);

    background-color: white;

    display: flex;
    flex-direction: column;
    padding: 8px;

    label {
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;

      .field {
        width: 80px;
      }
      .value {
        flex: 1;
      }
    }
  }
}
</style>