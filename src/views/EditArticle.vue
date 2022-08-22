<template>
  <div>
    <app-loading v-if="isLoading"/>
    <article-form v-if="article !== null"
                  :initial="initialValues"
                  :errors="validationErrors"
                  :is-submitting="isSubmitting"
                  @articleSubmit="onSubmit"/>
  </div>
</template>

<script>
import ArticleForm from "@/components/ArticleForm";
import AppLoading from "@/components/Loading";
import {mapState, mapActions} from "vuex";

export default {
  name: 'EditArticle',
  components: {
    ArticleForm,
    AppLoading,
  },
  computed: {
    ...mapState("editArticle", ["isSubmitting", "validationErrors", "isLoading", "article"]),
    initialValues() {
      if (this.article) {
        return {
          title: this.article.title,
          description: this.article.description,
          body: this.article.body,
          tagList: this.article.tagList,
        };
      } else {
        return null;
      }
    },
  },
  methods: {
    ...mapActions("editArticle", ["updateArticle", "getArticle"]),
    onSubmit(articleInput) {
      const slug = this.$route.params.slug;
      this.updateArticle({slug, articleInput}).then(article => {
        this.$router.push({name: 'article', params: {slug: article.slug}});
      });
    }
  },
  mounted() {
    this.getArticle({slug: this.$route.params.slug});
  },
}
</script>
