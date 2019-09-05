import {ActionTree} from 'vuex';
import {IActivityState} from './types';
import {IActivity} from '@/interfaces/activity';

export const actions: ActionTree<IActivityState, {}> = {
  setCurrentActivity: ({commit}, payload: IActivity | null): void => {
    commit('setCurrentActivity', payload);
  },
  saveActivityToList: ({commit, state}, payload: IActivity): void => {
    commit('saveActivityToList', payload);
    localStorage.setItem('codersrank_test_app', JSON.stringify(state.list));
  },
  removeActivityFromList: ({commit, state}, index: number): void => {
    commit('removeActivityFromList', index);
    if (!state.list.length) {
      localStorage.removeItem('codersrank_test_app');
    } else {
      localStorage.setItem('codersrank_test_app', JSON.stringify(state.list));
    }
  },
  clearList: ({commit}): void => {
    commit('clearList');
    localStorage.removeItem('codersrank_test_app');
  },
  restoreActivitiesFromLocalStorage: ({commit}, payload: string): void => {
    commit('restoreActivitiesFromLocalStorage', payload);
  }
};
