<template>
  <div>
    <article-form :initial="initialValues"
                  :errors="validationErrors"
                  :is-submitting="isSubmitting"
                  @articleSubmit="onSubmit"/>
  </div>
</template>

<script>
import ArticleForm from "@/components/ArticleForm";
import {mapState, mapActions} from "vuex";

export default {
  name: 'CreateArticle',
  components: {
    ArticleForm,
  },
  data: () => ({
    initialValues: {
      title: '',
      description: '',
      body: '',
      tagList: [],
    },
  }),
  computed: {
    ...mapState("createArticle", ["isSubmitting", "validationErrors"]),
  },
  methods: {
    ...mapActions("createArticle", ["createArticle"]),
    onSubmit(articleInput) {
      this.createArticle({articleInput}).then(article => {
        this.$router.push({name: 'article', params:{slug: article.slug}});
      });
    }
  }
}
</script>