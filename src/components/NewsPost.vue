<template>
  <article class="news-card">
    <img
      :src="postData.preview_image"
      :alt="postData.alt"
      class="news-card__cover"
    />
    <p class="news-card__date">
      {{ formateDate(postData.published_at) }}
    </p>
    <router-link :to="'/news/' + postData.slug" :event="$off" class="card-title news-card__card-title">{{
      postData.title
    }}</router-link>
    <p class="news-card__text">
      {{ postData.preview_text }}
    </p>
  </article>
</template>
<script>
export default {
  name: "NewsPost",
  props: {
    postData: Object,
  },
};
</script>