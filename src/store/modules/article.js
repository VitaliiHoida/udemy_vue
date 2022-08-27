import articleApi from '@/api/article';

export default {
    name: 'article',
    namespaced: true,
    state: {
        data: null,
        isLoading: false,
        error: null,
        comments: null,
    },
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
        deleteArticleStart() {},
        deleteArticleSuccess() {},
        deleteArticleFailure() {},
        getCommentsStart() {},
        getCommentsSuccess(state, payload) {
            state.comments = payload;
        },
        getCommentsFailure() {},
        sendCommentsStart() {},
        sendCommentsSuccess() {},
        sendCommentsFailure() {},
        deleteCommentsStart() {},
        deleteCommentsSuccess() {},
        deleteCommentsFailure() {},
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
        deleteArticle(context, {slug}) {
            return new Promise(resolve => {
                context.commit('deleteArticleStart', slug);
                articleApi.deleteArticle(slug)
                    .then(() => {
                        context.commit('deleteArticleSuccess');
                        resolve();
                    })
                    .catch(() => {
                        context.commit('deleteArticleFailure');
                    })
            });
        },
        getComments(context, {slug}) {
            return new Promise(resolve => {
                context.commit('getCommentsStart', slug);
                articleApi.getComments(slug)
                    .then(comments => {
                        context.commit('getCommentsSuccess', comments);
                        resolve(comments);
                    })
                    .catch(() => {
                        context.commit('getCommentsFailure');
                    })
            });
        },
        addComment(context, {slug, comment}) {
            return new Promise(resolve => {
                context.commit('sendCommentsStart', slug);
                articleApi.addComment(slug, comment)
                    .then((comments) => {
                        context.commit('sendCommentsSuccess');
                        resolve(comments);
                    })
                    .catch(() => {
                        context.commit('sendCommentsFailure');
                    })
            });
        },
        deleteComment(context, {slug, id}) {
            return new Promise(resolve => {
                context.commit('deleteCommentsStart', slug);
                articleApi.delComments(slug, id)
                    .then(() => {
                        context.commit('deleteCommentsSuccess');
                        resolve();
                    })
                    .catch(() => {
                        context.commit('deleteCommentsFailure');
                    })
            });
        },
    },
}