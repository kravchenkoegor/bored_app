<template>
  <div class="details h-100 d-flex flex-column">
    <h3 class="card__title">Activity details:</h3>

    <b-form-group
      label="Type"
    >
      <b-form-select
        v-model="selectedType"
        :options="types"
      >
        <template slot="first">
          <option :value="null">
            Any type
          </option>
        </template>
      </b-form-select>
    </b-form-group>

    <b-form-group
        label="Participants"
    >
      <b-form-input
        v-model="participants"
        type="text"
      />
    </b-form-group>

    <b-form-group
      label="Budget"
      class="position-relative"
    >
      <div class="checkbox">
        <b-form-checkbox
          v-model="budget"
        />
      </div>

      <template v-if="budget">
        <b-form-input
          v-model="price"
          type="range"
          min="0"
          max="1"
          step="0.05"
        />
        <div class="d-flex justify-content-between">
          <span class="text-secondary">cheap</span>
          <span class="text-secondary">expensive</span>
        </div>
      </template>
    </b-form-group>

    <b-button
      variant="primary"
      block
      class="mt-auto"
      @click="getNewActivity"
    >
      Hit me with the new one!
    </b-button>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component
  export default class ActivityDetails extends Vue {
    @Prop({required: true}) propSelectedType: any;
    @Prop({required: true}) propParticipants: any;
    @Prop({required: true}) propBudget: any;
    @Prop({required: true}) propPrice: any;

    // as far as I can't retrieve all the types from API I need to hardcode them
    types: string[] = [
      'education',
      'recreational',
      'social',
      'diy',
      'charity',
      'cooking',
      'relaxation',
      'music',
      'busywork'
    ];

    selectedType: string | null = null;
    participants: string = '';
    price: number = 0;
    budget: boolean = true;

    created() {
      this.selectedType = this.propSelectedType;
      this.participants = this.propParticipants;
      this.budget = this.propBudget;
      this.price = this.propPrice;
    }

    getNewActivity(): void {
      this.$emit('getNewActivity', {
        _selectedType: this.selectedType,
        _participants: this.participants,
        _budget: this.budget,
        _price: this.price
      });
    }
  }
</script>

<style lang="scss" scoped>
  .checkbox {
    left: 60px;
    position: absolute;
    top: -32px;
  }
</style>
