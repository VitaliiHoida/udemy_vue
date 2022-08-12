import authApi from '@/api/auth';

export default {
    name: "auth",
    namespaced: true,
    state: {
        isSubmit: false,
    },
    mutations: {
        registerStart(state) {
            state.isSubmit = true;
        },
        registerSuccess(state) {
            state.isSubmit = false;
        },
        registerFailure(state) {
            state.isSubmit = false;
        },
    },
    actions: {
        register(context, credentials) {
            return new Promise(resolve => {
                context.commit('registerStart');
                authApi.register(credentials)
                    .then(response => {
                        console.log('response', response);
                        context.commit('registerSuccess', response.data.user);
                        resolve(response.data.user);})
                    .catch(result => {
                        context.commit('registerFailure', result.response.data.errors);
                        console.log('result errors', result);})
            });

            /*setTimeout(()=>{
                context.commit('registerStart')
            }, 1000)*/
        },
    },
};