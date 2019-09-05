import {Module} from 'vuex';
import {getters} from './getters';
import {actions} from './actions';
import {mutations} from './mutations';
import {IActivityState} from './types';

export const state: IActivityState = {
  currentActivity: null,
  list: []
};

export const activity: Module<IActivityState, {}> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
