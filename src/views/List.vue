<template>
  <div class="row h-100">
    <div class="col-12 d-flex flex-column">
      <template v-if="!list.length">
        <div class="h-100 d-flex justify-content-center align-items-center">
          <h2 class="text-center">
            You have no activities in your list.
            <br>
            Go <router-link to="activities">here</router-link> and add at least one.
          </h2>
        </div>
      </template>

      <template v-else>
        <b-table
          striped
          hover
          :fields="tableFields"
          :items="list"
          class="mt-4"
        >
          <template slot="[#]" slot-scope="data">
            {{ data.index + 1 }}
          </template>
          <template slot="[actions]" slot-scope="row">
            <span
              class="check-button"
              @click="removeActivityFromList(row.index)"
            >
            </span>
          </template>
        </b-table>

        <b-button
          variant="danger"
          class="mt-auto mx-auto w-25"
          @click="clearList"
        >
          Clear all
        </b-button>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Getter, Action} from 'vuex-class';
  import {IActivity} from '@/interfaces/activity';

  const namespace = 'activity';

  @Component
  export default class List extends Vue {
    @Getter('list', {namespace}) list!: IActivity[];
    @Action('removeActivityFromList', {namespace})
      removeActivityFromList!: (index: number) => Promise<void>;
    @Action('clearList', {namespace})
      clearList!: () => Promise<void>;
    @Action('restoreActivitiesFromLocalStorage', {namespace})
      restoreActivitiesFromLocalStorage!: (payload: string) => Promise<void>;

    tableFields: Array<{key: string, label?: string}> = [
      {key: '#'},
      {key: 'name', label: 'Activity'},
      {key: 'participants'},
      {key: 'participants'},
      {key: 'actions', label: ''}
    ];

    created() {
      const storedItems = localStorage.getItem('codersrank_test_app');
      if (storedItems) {
        this.restoreActivitiesFromLocalStorage(storedItems);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .check-button {
    border: 2px solid green;
    border-radius: 50%;
    cursor: pointer;
    display: block;
    height: 26px;
    width: 26px;
    position: relative;
    transition: all .2s ease-in-out;

    &:before {
      border-left: 2px solid green;
      border-bottom: 2px solid green;
      content: '';
      display: block;
      height: 7px;
      position: absolute;
      top: 48%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      width: 12px;
    }

    &:hover {
      background: green;

      &:before {
        border-color: #fff;
      }
    }
  }

  .table td,
  .table th {
    vertical-align: middle;
  }
</style>
