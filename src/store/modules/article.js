import articleApi from '@/api/article';

export default {
    name: 'article',
    namespaced: true,
    state: {
        data:null,
        isLoading: false,
        error: null,
    },
    getters: {},
    mutations: {
        getArticleStart(state) {
            state.isLoading = true;
            state.data = null;
        },
        getArticleSuccess(state, payload) {
            state.isLoading = false;
            state.data = payload;
        },
        getArticleFailure(state) {
            state.isLoading = false;
        },
    },
    actions: {
        getArticle(context, {slug}) {
            return new Promise(resolve => {
                context.commit('getArticleStart', slug);
                articleApi.getArticle(slug)
                    .then(article => {
                        context.commit('getArticleSuccess', article);
                        resolve(article);
                    })
                    .catch(() => {
                        context.commit('getArticleFailure');
                    })
            });
        },
    },
}