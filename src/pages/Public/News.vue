<template>
  <main class="content">
    <section class="news-page page__section page__section_width_content">
      <div class="content-sidebar">
        <div class="content-sidebar__bar-container">
          <div class="content-sidebar__bar-content news-page__sidebar">
            <form class="form">
              <fieldset class="form__fieldset">
                <div class="form__item">
                  <label class="form__label">Дата</label>
                  <input
                    type="date"
                    name="date-from"
                    class="form__input-edit form__input-edit_el_date-from"
                    id="date-from"
                    placeholder="Дата с"
                    :value="filterDateFrom"
                    @change="(e) => setDateFrom(e.target.value)"
                  />
                  <input
                    type="date"
                    name="date-to"
                    class="form__input-edit form__input-edit_el_date-to"
                    id="date-to"
                    placeholder="Дата по"
                    :value="filterDateTo"
                    @change="(e) => setDateTo(e.target.value)"
                  />
                </div>
                <div class="form__item">
                  <label for="region" class="form__label">Регион</label>
                  <select
                    name="region"
                    class="
                      form__select
                      form__select_theme_white
                      form__select_width_full
                    "
                    id="region"
                    :value="filterRegionId"
                    @change="(e) => setRegionId(e.target.value)"
                  >
                    <option value="" class="select__option">
                      Выберите регион
                    </option>
                    <option
                      v-for="region in regions"
                      :value="region.id"
                      :key="region.id"
                      class="select__option"
                    >
                      {{ region.title }}
                    </option>
                  </select>
                </div>
                <div class="form__item">
                  <label class="form__label">Категория</label>
                  <ul class="tags">
                    <li
                      class="tags__item"
                      v-for="category in categories"
                      :key="category.id"
                    >
                      <a
                        href="#"
                        @click="setCategoryId(category.id)"
                        class="tags__link"
                        >{{ category.title }}</a
                      >
                    </li>
                  </ul>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <div class="content-sidebar__content">
          <h1 class="section-title page__title">Новости</h1>
          <form class="form form-width-m news-page__search">
            <search-input :inputValue="filters.keyword" @search="setKeyword($event)" />
          </form>
          <div class="news-list news-page__news-list">
            <div class="news-list__cards news-list__cards_card-width_s">
              <news-post
                v-for="post in posts"
                :key="post.slug"
                :postData="post"
              />
            </div>
            <button
              v-if="currentPostsCount !== totalPostsCount"
              class="news-list__loadmore"
              @click="getPosts()"
            >
              Показать еще новости
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import NewsPost from "@/components/NewsPost.vue";
import { createNamespacedHelpers } from "vuex";

const { mapActions: mapActionsNews, mapState: mapStateNews } =
  createNamespacedHelpers("news/newsAll");
const { mapState: mapStateLocation } = createNamespacedHelpers("location");

export default {
  components: {
    NewsPost
  },
  name: "News",
  title: "Новости",
  methods: {
    ...mapActionsNews({
      getPosts: "getPosts",
      getCategories: "getCategories",
      setDateFrom: "setDateFrom",
      setDateTo: "setDateTo",
      setRegionId: "setRegionId",
      setCategoryId: "setCategoryId",
      setKeyword: "setKeyword",
      setNewsPerPage: "setNewsPerPage",
    }),
  },
  computed: {
    ...mapStateNews({
      posts: (state) => state.posts,
      categories: (state) => state.categories,
      filters: (state) => state.filters,
      pagination: (state) => state.pagination,
      newsPerPage: (state) => state.newsPerPage,
      newsCurrentCount: (state) => state.newsCurrentCount,
    }),
    ...mapStateLocation({
      regions: (state) => state.regions,
    }),
    filterDateFrom: function () {
      return this.filters.dateFrom;
    },
    filterDateTo: function () {
      return this.filters.dateTo;
    },
    filterRegionId: function () {
      return this.filters.regionId;
    },
    filterCategoryId: function () {
      return this.filters.categoryId;
    },
    filterKeyword: function () {
      return this.filters.filterKeyword;
    },
    totalPostsCount: function () {
      return this.pagination.newsTotalCount;
    },
    currentPostsCount: function () {
      return this.pagination.newsCurrentCount;
    },
  },
  created() {
    this.getPosts();
    this.getCategories();
  },
};
</script>