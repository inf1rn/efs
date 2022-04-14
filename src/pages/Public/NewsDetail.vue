<template>
  <main class="content content_pt_s">
    <section class="news-detail-page page__section page__section_width_content">
      <ul class="breadcrumbs page__breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link to="/news" class="breadcrumbs__link"
            >Новости</router-link
          >
        </li>
        <li class="breadcrumbs__item">
          <span href="#" class="breadcrumbs__link breadcrumbs__link_current">
            {{ mainPost?.title }}
          </span>
        </li>
      </ul>
      <article class="news-detail">
        <h1 class="section-title">
          {{ mainPost?.title }}
        </h1>
        <p v-if="mainPost" class="news-detail__date">
          {{ new Date(mainPost?.published_at).toLocaleDateString() }}
        </p>
        <ul class="tags tags_direct_row news-detail__categories">
          <li
            class="tags__item"
            v-for="category in mainPost?.categories"
            :key="category.id"
          >
            <a href="#" class="tags__link">{{ category.title }}</a>
          </li>
        </ul>
        <div class="news-detail__grid">
          <div v-if="mainPost" class="news-detail__body">
            <img
              :src="mainPost?.preview_image"
              alt="Слушатели в зале"
              class="news-detail__cover"
            />
            <p class="news-detail__text" v-html="mainPost?.detail_text"></p>
            <router-link to="/news" class="news-detail__backlink"
              >Назад к новостям</router-link
            >
          </div>
          <div class="news-detail__sidebar">
            <div class="news-list">
              <div class="news-list__cards news-list__cards_card-width_s">
                <news-post
                  v-for="post in otherPosts"
                  :key="post.slug"
                  :postData="post"
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import NewsPost from "@/components/NewsPost.vue";

const { mapState, mapActions, mapMutations } =
  createNamespacedHelpers("news/newsDetail");

export default {
  name: "NewsDetail",
  components: { NewsPost },
  methods: {
    ...mapActions(["getOtherPosts", "getPostById"]),
    ...mapMutations(["setPostId"]),
  },
  computed: {
    ...mapState({
      mainPost: (state) => state.mainPost,
      otherPosts: (state) => state.otherPosts,
    }),
    title() {
      return this.mainPost?.title;
    },
  },
  created() {
    this.setPostId(this.$route.params.id);
    this.getOtherPosts();
    this.getPostById();
  },
};
</script>