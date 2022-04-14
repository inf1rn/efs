<template>
  <article class="news-card">
    <img
      :src="postData.preview_image"
      :alt="postData.alt"
      class="news-card__cover"
    />
    <p class="news-card__date">
      {{ new Date(postData.published_at).toLocaleDateString("ru-RU") }}
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