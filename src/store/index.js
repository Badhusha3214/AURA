
import { createStore } from "vuex";

import { initialState } from "./store";
import * as actions from "./actions";
import * as mutations from "./mutations";
import * as getters from "./getters";

const store = createStore({
    state: initialState,
    actions,
    mutations,
    getters
});

export default store;

