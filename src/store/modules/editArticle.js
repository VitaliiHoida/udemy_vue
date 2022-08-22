import articleApi from '@/api/article';

export default {
    name: 'editArticle',
    namespaced: true,
    state: {
        isSubmitting: false,
        validationErrors: null,
        isLoading: false,
        article: null,
    },
    mutations: {
        updateArticleStart(state) {
            state.isSubmitting = true;
        },
        updateArticleSuccess(state) {
            state.isSubmitting = false;
        },
        updateArticleFailure(state, payload) {
            state.isSubmitting = false;
            state.validationErrors = payload;
        },
        getArticleStart(state) {
            state.isLoading = true;
        },
        getArticleSuccess(state, payload) {
            state.isLoading = false;
            state.article = payload;
        },
        getArticleFailure(state) {
            state.isLoading = false;
        },
    },
    actions: {
        updateArticle(context, {slug, articleInput}) {
            return new Promise(resolve => {
                context.commit('updateArticleStart');
                articleApi.updateArticle(slug, articleInput)
                    .then(article => {
                        context.commit('updateArticleSuccess', article)
                        resolve(article);
                    })
                    .catch(result => {
                        context.commit('updateArticleFailure', result.response.data.errors);
                    });
            })
        },
        getArticle(context, {slug}) {
            return new Promise(resolve => {
                context.commit('getArticleStart');
                articleApi.getArticle(slug)
                    .then(article => {
                        context.commit('getArticleSuccess', article)
                        resolve(article);
                    })
                    .catch(() => {
                        context.commit('getArticleFailure');
                    });
            })
        },
    },
}