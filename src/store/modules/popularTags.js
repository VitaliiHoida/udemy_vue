import popularTagsApi from '@/api/popularTags';

export default {
    name: "popularTags",
    namespaced: true,
    state: {
        data: null,
        isLoading: false,
        error: null,
    },
    getters: {},
    mutations: {
        getPopularTagsStart(state) {
            state.isLoading = true;
            state.data = null;
        },
        getPopularTagsSuccess(state, payload) {
            state.isLoading = false;
            state.data = payload;
        },
        getPopularTagsFailure(state) {
            state.isLoading = false;
        },
    },
    actions: {
        getPopularTags(context) {
            return new Promise(resolve => {
                context.commit('getPopularTagsStart');
                popularTagsApi.getPopularTags()
                    .then(tags => {
                        context.commit('getPopularTagsSuccess', tags);
                        resolve(tags);
                    })
                    .catch(() => {
                        context.commit('getPopularTagsFailure');
                    })
            });
        },
    },
}