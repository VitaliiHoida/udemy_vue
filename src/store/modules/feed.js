import feedApi from '@/api/feed';

export default {
    name: "feed",
    namespaced: true,
    state: {
        data: null,
        isLoading: false,
        error: null,
    },
    getters: {},
    mutations: {
        getFeedStart(state) {
            state.isLoading = true;
            state.data = null;
        },
        getFeedSuccess(state, payload) {
            state.isLoading = false;
            state.data = payload;
        },
        getFeedFailure(state) {
            state.isLoading = false;
        },
    },
    actions: {
        getFeed(context, {apiUrl}) {
            return new Promise(resolve => {
                context.commit('getFeedStart');
                feedApi.getFeed(apiUrl)
                    .then(response => {
                        context.commit('getFeedSuccess', response.data);
                        resolve(response.data);
                    })
                    .catch(() => {
                        context.commit('getFeedFailure');
                    })
            });
        },
    },
}