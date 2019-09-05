<template>
  <div id="app">
    <div class="wrapper d-flex flex-column justify-content-center align-items-center w-100 h-100 py-3">
      <nav class="navigation wrapper__navigation">
        <ul class="navigation__list">
          <li
            v-for="page in pages"
            :key="page.name"
            class="navigation__item"
            :class="{'navigation__item_active': $route.name === page.path}"
          >
            <router-link
              :to="page.path"
              class="navigation__link"
            >
              {{ page.name }}
            </router-link>
          </li>
        </ul>
      </nav>

      <div class="wrapper__card card shadow">
        <div class="card__content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class extends Vue {
    pages: Array<{name: string, path: string}> = [
      {
        name: 'Activities',
        path: 'activities'
      },
      {
        name: 'My List',
        path: 'list'
      }
    ];
  }
</script>

<style lang="scss">
  @import '~bootstrap/scss/bootstrap';
  @import '~bootstrap-vue/src/index.scss';
  @import './styles/style';
</style>
