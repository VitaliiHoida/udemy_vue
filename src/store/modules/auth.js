import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

export default {
    name: "auth",
    namespaced: true,
    state: {
        isSubmit: false,
        currentUser: null,
        validationErrors: null,
        isLoggedIn: null,
    },
    mutations: {
        registerStart(state) {
            state.isSubmit = true;
            state.validationErrors = null;
        },
        registerSuccess(state, payload) {
            state.isSubmit = false;
            state.currentUser = payload;
            state.isLoggedIn = true;
        },
        registerFailure(state, payload) {
            state.isSubmit = false;
            state.validationErrors = payload;
        },
    },
    actions: {
        register(context, credentials) {
            return new Promise(resolve => {
                context.commit('registerStart');
                authApi.register(credentials)
                    .then(response => {
                        context.commit('registerSuccess', response.data.user);
                        setItem('accessToken', response.data.user.token);
                        resolve(response.data.user);
                    })
                    .catch(result => {
                        context.commit('registerFailure', result.response.data.errors);
                    })
            });
        },
    },
};