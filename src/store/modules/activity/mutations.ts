import {MutationTree} from 'vuex';
import {IActivityState} from './types';
import {IActivity, ISimplifiedActivity} from '@/interfaces/activity';

export const mutations: MutationTree<IActivityState> = {
  setCurrentActivity: (state: IActivityState, payload: IActivity): void => {
    state.currentActivity = payload;
  },
  saveActivityToList: (state: IActivityState, payload: ISimplifiedActivity): void => {
    state.list.push(payload);
  },
  removeActivityFromList: (state: IActivityState, index: number): void => {
    state.list.splice(index, 1);
  },
  clearList: (state: IActivityState): void => {
    state.list = [];
  },
  restoreActivitiesFromLocalStorage: (state: IActivityState, payload: string): void => {
    state.list = JSON.parse(payload);
  }
};
