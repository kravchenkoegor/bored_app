<template>
  <div class="info d-flex flex-column h-100">
    <h3 class="card__title">You should:</h3>

    <div class="activity flex-grow-1">
      <div class="activity__title">
        {{ title }}
      </div>
    </div>

    <b-button
      variant="danger"
      block
      :disabled="!currentActivity"
      @click="$emit('saveActivity')"
    >
      Save for later
    </b-button>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Getter, Action} from 'vuex-class';
  import {IActivity} from '@/interfaces/activity';

  const namespace = 'activity';

  @Component
  export default class ActivityInfo extends Vue {
    @Prop({required: true}) title!: string;

    @Getter('currentActivity', {namespace}) currentActivity!: IActivity;
  }
</script>

<style lang="scss" scoped>
  .activity {
    border: 1px solid rgba(0, 0, 0, 0.125);
    margin-bottom: 1.25rem;

    &__title {
      padding: 1.25rem;
    }
  }
</style>
