import axios from "@/api/axios";

const getUserProfile = slug => {
    return axios.get(`/profiles/${slug}`)
        .then(response => response.data.profile);
}

const followUser = slug => {
    return axios.post(`/profiles/${slug}/follow`)
        .then(response => response.data.profile);
}

const unfollowUser = slug => {
    return axios.delete(`/profiles/${slug}/follow`)
        .then(response => response.data.profile);
}

export default{
    getUserProfile,
    followUser,
    unfollowUser
}