import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import {activity} from './modules/activity';

Vue.use(Vuex);

const store: StoreOptions<{}> = {
  modules: {
    activity
  }
};

export default new Vuex.Store<{}>(store);
