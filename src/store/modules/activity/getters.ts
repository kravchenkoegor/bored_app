import {GetterTree} from 'vuex';
import {IActivityState} from './types';
import {IActivity, ISimplifiedActivity} from '@/interfaces/activity';

export const getters: GetterTree<IActivityState, {}> = {
  currentActivity: (state: IActivityState): IActivity | null => state.currentActivity,
  list: (state: IActivityState): ISimplifiedActivity[] => state.list
};
