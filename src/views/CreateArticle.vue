<template>
  <div>
    <article-form :initial-values="initialValues"
                  :errors="validationErrors"
                  :is-submitting="isSubmitting"
                  @articleSubmit="onSubmit"/>
  </div>
</template>

<script>
import ArticleForm from "@/components/ArticleForm";

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
    validationErrors: null,
    isSubmitting: false,
  }),
  methods: {
    onSubmit(data) {
      console.log('onSubmit', data)
    }
  }
}
</script>