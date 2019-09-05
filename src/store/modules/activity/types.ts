import {IActivity, ISimplifiedActivity} from '@/interfaces/activity';

export interface IActivityState {
  currentActivity: IActivity | null;
  list: ISimplifiedActivity[];
}
