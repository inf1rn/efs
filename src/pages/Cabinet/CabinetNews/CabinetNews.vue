<template>
  <main class="content content_cabinet">
    <section class="users page__section">
      <div class="users__top">
        <h1 class="section-title">Новости</h1>
        <router-link to="/cabinet/news/add" class="users__add"
          >+ добавить новость</router-link
        >
      </div>
      <div class="users__wrapper wrapper-max_width-m">
        <div class="users__row row-search">
          <search-input
            type="text"
            name="search"
            id="search"
            :inputValue="filters.keyword"
            inputClasses="form__input-edit form__input-edit_type_search"
            @search="setKeyword($event)"
          />
        </div>
        <div class="add-news__line add-news__line-flex form__item">
          <div class="add-news__line_box">
            <label for="addNewsDate" class="add-news__caption form__label"
              >Дата публикации</label
            >
            <input
              type="date"
              class="form__input-edit add-news__form_date"
              id="addNewsDate"
              placeholder="31.10.2020"
              @change="setDate($event.target.value)"
              :value="filters.date"
            />
          </div>
          <button @click="clearFilters()" class="add-news__line-btn">
            сбросить
          </button>
        </div>
        <div class="news-list news-page__news-list">
          <div class="news-list__cards">
            <article
              class="news-card news-card_padding"
              v-for="post of posts"
              :key="post.id"
            >
              <img
                :src="post.preview_image"
                :alt="post.title"
                class="news-card__cover news-card__cover_border"
              />
              <p class="news-card__date">
                {{ new Date(post?.published_at).toLocaleDateString("ru-RU") }}
              </p>
              <router-link
                :to="`/news/${post.slug}`"
                class="card-title news-card__card-title"
                >{{ post.title }}</router-link
              >
              <p class="news-card__text">
                {{ post.preview_text }}
              </p>
              <div class="new-card-btn__box">
                <router-link
                  type="submit"
                  class="
                    button button_theme_green button_border_small
                    form__submit
                    button_news
                  "
                  tag="button"
                  :to="`/cabinet/news/${post.slug}`"
                >
                  Редактировать
                </router-link>
                <router-link
                  :to="`/news/${post.slug}`"
                  class="new-card-btn__link"
                  >Перейти</router-link
                >
              </div>
            </article>
          </div>
          <button
            v-if="currentPostsCount !== totalPostsCount && +totalPostsCount > 6"
            @click="getPosts()" class="news-list__loadmore">
            Показать еще новости
          </button>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: mapStateNews,
  mapActions: mapActionsNews,
  mapMutations: mapMutationsNews,
} = createNamespacedHelpers("news/adminNewsAll");

export default {
  name: "cabinet-news",
  computed: {
    ...mapStateNews({
      posts: (state) => state.posts,
      filters: (state) => state.filters,
      pagination: (state) => state.pagination,
    }),
    totalPostsCount: function () {
      return this.pagination.newsTotalCount;
    },
    currentPostsCount: function () {
      return this.pagination.newsCurrentCount;
    },
  },
  methods: {
    ...mapActionsNews(["getPosts", "setDate", "setKeyword", "clearFilters"]),
  },
  created() {
    this.getPosts()
  },
};
</script>