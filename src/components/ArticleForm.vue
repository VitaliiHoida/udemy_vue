<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <validation-errors v-if="errors" :validation-errors="errors"/>
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" placeholder="Article title" v-model="title">
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="What's this article about?" v-model="description">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="body"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" v-model="tagList">
              </fieldset>
              <fieldset class="form-group">
                <button type="submit" class="btn btn-lg pull-xs-right btn-primary" :disable="isSubmitting">Publish Article</button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ValidationErrors from '@/components/ValidationErrors';

export default {
  name: 'ArticleForm',
  components: {
    ValidationErrors,
  },
  props: {
    initial: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: false,
    },
    isSubmitting: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    title: this?.initial.title,
    description: this?.initial.description,
    body: this?.initial.body,
    tagList: this?.initial.tagList.join(' '),
  }),
  methods: {
    onSubmit() {
      const form = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList?.split(' '),
      };
      this.$emit('articleSubmit', form);
    }
  },
  watch: {
    initial() {
      this.title = this.initial.title;
      this.description = this.initial.description;
      this.body = this.initial.body;
      this.tagList = this.initial.tagList.join(' ');
    },
  },
}
</script>