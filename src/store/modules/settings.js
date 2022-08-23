import {mapMutations} from "vuex";

export default {
    name: 'settings',
    namespaced: true,
    state: {
        isSubmitting: false,
        validationErrors: null,
    },
    mutations: {
        ...mapMutations("auth", ["updateCurrentUserStart", "updateCurrentUserSuccess", "updateCurrentUserFailure"]),
        updateCurrentUserStart(state) {
            state.isSubmitting = true;
            state.validationErrors = null;
        },
        updateCurrentUserSuccess(state) {
            state.isSubmitting = false;
        },
        updateCurrentUserFailure(state, payload) {
            state.isSubmitting = false;
            state.validationErrors = payload;
        }
    },
}