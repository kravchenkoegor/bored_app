<template>
  <div class="row h-100">
    <template v-if="loading">
      <div class="h-100 w-100 d-flex justify-content-center align-items-center">
        <b-spinner
          variant="primary"
          type="grow"
          style="width: 3rem; height: 3rem;"
        ></b-spinner>
      </div>
    </template>

    <template v-else>
      <div class="col-7">
        <activity-info
          :title="currentActivity.activity"
          @saveActivity="saveActivity"
        />
      </div>

      <div class="col-5">
        <activity-details
          :prop-selected-type="selectedType"
          :prop-participants="participants"
          :prop-budget="budget"
          :prop-price="price"
          @getNewActivity="getNewActivity"
        />
      </div>
    </template>

    <b-modal
      ref="msg-modal"
      hide-footer
      content-class="shadow"
      :title="modalTitle"
      title-class="w-100 text-center"
    >
      <div class="d-block text-center">
        <p v-text="modalText"></p>
      </div>
      <div class="d-flex justify-content-center">
        <b-button
          class="mt-3"
          variant="outline-success"
          @click="closeModal"
        >
          OK, I got it
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Getter, Action} from 'vuex-class';
  import axios from '@/services/api';
  import {IActivity, ISimplifiedActivity} from '@/interfaces/activity';
  import ActivityInfo from '@/components/Activity/Info.vue';
  import ActivityDetails from '@/components/Activity/Details.vue';

  interface VueWithBootstrapModal extends Vue {
    show: () => void;
    hide: () => void;
  }

  const namespace = 'activity';

  @Component({
    components: {
      ActivityInfo,
      ActivityDetails
    }
  })
  export default class Activity extends Vue {
    @Action('setCurrentActivity', {namespace})
      setCurrentActivity!: (payload: IActivity | null) => Promise<void>;
    @Action('saveActivityToList', {namespace})
      saveActivityToList!: (payload: ISimplifiedActivity) => Promise<void>;
    @Getter('currentActivity', {namespace})
      currentActivity!: IActivity | null;
    @Getter('list', {namespace})
      list!: ISimplifiedActivity[];

    loading: boolean = true;
    selectedType: string | null = null;
    participants: string = '';
    price: number = 0;
    budget: boolean = true;
    modalTitle: string = '';
    modalText: string = '';

    created() {
      if (!this.currentActivity) {
        this.fetchActivities();
      } else {
        const {type, participants, price} = this.currentActivity as IActivity || {};
        this.selectedType = type;
        this.participants = String(participants);
        this.price = price;
        this.loading = false;
      }
    }

    async fetchActivities(): Promise<void> {
      try {
        const {data, error} = await axios.get('/') || {};
        if (!error) {
          await this.assignActivity(data);
        } else {
          this.showErrorModal();
        }
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    }

    async assignActivity(data: IActivity): Promise<void> {
      await this.setCurrentActivity(data);
      this.selectedType = data.type;
      this.participants = String(data.participants);
      this.price = data.price;
    }

    async saveActivity(): Promise<void> {
      const {activity, participants, price} = this.currentActivity as IActivity;

      if (!this.activityExists) {
        await this.saveActivityToList({
          name: activity,
          participants,
          budget: this.defineBudget(price)
        });
        this.showSuccessModal();
      } else {
        this.showExistsModal();
      }
    }

    async getNewActivity(payload: any) {
      try {
        this.loading = true;
        const {_selectedType, _participants, _budget, _price} = payload;
        const params: {[k: string]: string | number} = {};
        this.selectedType = _selectedType;
        this.participants = _participants;
        this.budget = _budget;
        this.price = _price;

        if (this.selectedType) {
          params.type = this.selectedType;
        }

        if (this.participants) {
          params.participants = this.participants;
        }

        if (this.budget) {
          params.price = this.price;
        }

        const {data} = await axios.get('/', {params});
        if (!data.error) {
          await this.assignActivity(data);
          this.loading = false;
        } else {
          this.showErrorModal();
          this.loading = false;
        }
      } catch (error) {
        console.error(error);
      }
    }

    defineBudget(price: number): string {
        if (price >= 0 && price <= 0.25) {
          return 'Cheap';
        } else if (price > 0.25 && price <= 0.75) {
          return 'Medium';
        } else if (price > 0.75 && price <= 1) {
          return 'Expensive';
        } else {
          return 'Unknown';
      }
    }

    showSuccessModal() {
      this.modalTitle = 'Activity successfully saved!';
      (this.$refs['msg-modal'] as VueWithBootstrapModal).show();
    }

    showExistsModal() {
      this.modalTitle = 'Activity already exists';
      this.modalText = 'Please add another activity';
      (this.$refs['msg-modal'] as VueWithBootstrapModal).show();
    }

    showErrorModal() {
      this.modalTitle = 'No activity found';
      this.modalText = 'Please change parameters and try again.';
      (this.$refs['msg-modal'] as VueWithBootstrapModal).show();
    }

    closeModal() {
      this.modalTitle = '';
      this.modalText = '';
      (this.$refs['msg-modal'] as VueWithBootstrapModal).hide();
    }

    get activityExists() {
      return this.list.findIndex(
        (a: ISimplifiedActivity) => a.name === (this.currentActivity as IActivity).activity
      ) !== -1;
    }
  }
</script>
