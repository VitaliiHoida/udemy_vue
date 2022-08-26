import axios from "@/api/axios";

const getArticle = slug => {
    return axios.get(`/articles/${slug}`).then(response => response.data.article);
}

const deleteArticle = slug => {
    return axios.delete(`/articles/${slug}`);
}

const createArticle = articleInput => {
    return axios.post('/articles', {article: articleInput})
        .then(response => response.data.article);
}

const updateArticle = (slug, articleInput) => {
    return axios.put(`/articles/${slug}`, {article: articleInput})
        .then(response => response.data.article);
}

const getComments = slug => {
    return axios.get(`/articles/${slug}/comments`).then(response => response.data.comments);
}

const delComments = (slug, commentId) => {
    return axios.delete(`/articles/${slug}/comments/${commentId}`);
}

export default {
    getArticle,
    deleteArticle,
    createArticle,
    updateArticle,
    getComments,
    delComments
}