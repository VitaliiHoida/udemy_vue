import userProfileApi from "@/api/userProfile";

export default {
    name: "userProfile",
    namespaced: true,
    state: {
        data: null,
        isLoading: false,
        error: null,
    },
    mutations: {
        getUserProfileStart(state) {
            state.isLoading = true;
            state.data = null;
        },
        getUserProfileSuccess(state, payload) {
            state.isLoading = false;
            state.data = payload;
        },
        getUserProfileFailure(state) {
            state.isLoading = false;
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
        }
    },
}