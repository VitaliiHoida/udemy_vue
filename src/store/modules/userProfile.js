import userProfileApi from "@/api/userProfile";

export default {
    name: "userProfile",
    namespaced: true,
    state: {
        user: null,
        isLoading: false,
        error: null,
    },
    mutations: {
        getUserProfileStart(state) {
            state.isLoading = true;
            state.user = null;
        },
        getUserProfileSuccess(state, payload) {
            state.isLoading = false;
            state.user = payload;
        },
        getUserProfileFailure(state) {
            state.isLoading = false;
        },
        followUserStart() {
        },
        followUserSuccess() {
        },
        followUserFailure() {
        },
    },
    actions: {
        getUserProfile(context, {slug}) {
            return new Promise(resolve => {
                context.commit('getUserProfileStart');
                userProfileApi.getUserProfile(slug)
                    .then(userProfile => {
                        context.commit('getUserProfileSuccess', userProfile);
                        resolve(userProfile);
                    })
                    .catch(()=>{
                        context.commit('getUserProfileFailure');
                    })
            })
        },
        followUser(context, {slug, following}){
            return new Promise(resolve => {
                context.commit('followUserStart');
                const promise = following
                    ? userProfileApi.unfollowUser(slug)
                    : userProfileApi.followUser(slug)

                promise.then(userProfile => {
                    context.commit('followUserSuccess', userProfile);
                    resolve(userProfile);
                })
                    .catch(() => {
                        context.commit('followUserFailure');
                    })
            });
        },
    },
}