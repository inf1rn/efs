<template>
  <main class="content">
    <section class="slider main-slider">
      <div class="main-slider__wrapper swiper-wrapper">
        <div class="swiper-container main-slider__slider">
          <div class="main-slider__wrapper swiper-wrapper">
            <div
              class="slider__slide swiper-slide"
              :style="{
                'background-image': `url(${require('@/assets/upload/main-slider__slide1.jpg')})`,
              }"
            >
              <a class="slider__title" href="https://education.apkpro.ru/"
                >Цифровая экосистема ДПО</a
              >
              <p class="slider__text"></p>
            </div>
            <div
              class="slider__slide swiper-slide"
              :style="{
                'background-image': `url(${require('@/assets/upload/main-slider__slide2.jpg')})`,
              }"
            >
              <a
                class="slider__title"
                href="https://dppo.apkpro.ru/"
                target="_blank"
                >Единый федеральный реестр портал ДППО</a
              >
              <p class="slider__text"></p>
            </div>
            <div
              class="slider__slide swiper-slide"
              :style="{
                'background-image': `url(${require('@/assets/upload/main-slider__slide3.jpg')})`,
              }"
            >
              <a class="slider__title" href="https://apkpro.ru/">
                Академия Минпросвещения России
              </a>
              <p class="slider__text"></p>
            </div>
          </div>
        </div>
      </div>
      <button
        class="slider__arrow slider__arrow_left"
        @click="prevSlide"
      ></button>
      <button
        class="slider__arrow slider__arrow_right"
        @click="nextSlide"
      ></button>
    </section>

    <section class="map-regions page__map-regions">
      <h2 class="section-title section-title_text-align_center">
        Информация по регионам
      </h2>
      <form class="form">
        <search-input
          inputClasses="form__input-edit form__input-edit_type_search map-regions__select"
          inputPlaceholder="Введите"
          :inputValue="mapFilters.regionName"
          @search="setMapFiltersRegionName($event)"
        />
        <ul class="map-regions__subjects-list">
          <li class="map-regions__subjects-item">
            <a
              @click.prevent="setMapFiltersRegionName('Москва')"
              href="#"
              class="map-regions__subjects-link"
              >Москва</a
            >
          </li>
          <li class="map-regions__subjects-item">
            <a
              @click.prevent="setMapFiltersRegionName('Санкт-Петербург')"
              href="#"
              class="map-regions__subjects-link"
              >Санкт-Петербург</a
            >
          </li>
          <li class="map-regions__subjects-item">
            <a
              @click.prevent="setMapFiltersRegionName('Севастополь')"
              href="#"
              class="map-regions__subjects-link"
              >Севастополь</a
            >
          </li>
        </ul>
      </form>
      <Map baseUrl="" :regionNameInput="mapFilters.regionName" />
    </section>

    <section
      class="efs page__section page__section_width_content page__section_mt_l"
    >
      <h2 class="section-title section-title_text-align_center">
        ЕДИНАЯ ФЕДЕРАЛЬНАЯ СИСТЕМА НАУЧНО-МЕТОДИЧЕСКОГО СОПРОВОЖДЕНИЯ
        УПРАВЛЕНЧЕСКИХ И ПЕДАГОГИЧЕСКИХ КАДРОВ
      </h2>
      <ul class="panels efs__panels">
        <li class="panels__item">
          <img
            src="@/assets/images/efs__icon_passport.svg"
            class="panels__icon"
            alt="Иконка медали"
          />
          <h3 class="card-title">Паспорт ДПО</h3>
          <p class="panels__text">
            мониторинг состояния системы ДПО в субъектах
          </p>
        </li>
        <li
          class="panels__item pointer"
          @click="openNewLink('https://education.apkpro.ru')"
        >
          <img
            src="@/assets/images/efs__icon_lms.svg"
            class="panels__icon"
            alt="Иконка книги"
          />
          <h3 class="card-title">Система управления обучением</h3>
          <p class="panels__text">
            только лучшие федеральные массовые онлайн-курсы
          </p>
        </li>
        <li
          class="panels__item pointer"
          @click="openNewLink('https://dppo.apkpro.ru/bank?page=1&sortType=1')"
        >
          <img
            src="@/assets/images/efs__icon_registry.svg"
            class="panels__icon"
            alt="Иконка сетки"
          />
          <h3 class="card-title">Реестр программ</h3>
          <p class="panels__text">банк прошедших экспертизу программ ДПО</p>
        </li>
      </ul>
    </section>

    <section
      class="news page__section page__section_width_content page__section_mt_l"
    >
      <h2 class="section-title">Новости</h2>
      <div class="news-list news__news-list">
        <div class="news-list__cards">
          <news-post v-for="post in posts" :key="post" :postData="post" />
        </div>
        <router-link
          to="/news"
          class="
            button button_theme_green button_border_rounded
            news-list__linkmore
          "
          >Посмотреть все новости</router-link
        >
      </div>
    </section>

    <section
      class="
        digital-education
        page__section page__section_width_content page__section_mt_l
      "
    >
      <h2 class="section-title">Цифровое образование</h2>
      <ul class="partner-logos digital-education__partner-logos">
        <partner-block
          v-for="partner in partners"
          :partnerInfo="partner"
          :key="partner.title"
        />
      </ul>
    </section>
  </main>
</template>
<script>
import NewsPost from "@/components/NewsPost.vue";
import PartnerBlock from "@/components/PartnerBlock.vue";
import Map from "@/components/Map/Map.vue";
import { createNamespacedHelpers } from "vuex";

const {
  mapActions: mapActionsMainPage,
  mapMutations: mapMutationsMainPage,
  mapState: mapStateMainPage,
} = createNamespacedHelpers("mainPage");
const { mapState: mapStateLocation } = createNamespacedHelpers("vuex");
import { Swiper } from "swiper";

export default {
  components: {
    NewsPost,
    PartnerBlock,
    Map,
  },
  name: "main",
  title: "Главная",
  computed: {
    ...mapStateMainPage({
      posts: (state) => state.posts,
      partners: (state) => state.partners,
      ads: (state) => state.ads,
      mapFilters: (state) => state.mapFilters,
    }),
    ...mapStateLocation({
      regions: (state) => state.regions,
    }),
  },
  methods: {
    ...mapActionsMainPage({
      getPosts: "getPosts",
      getPartners: "getPartners",
      getAds: "getAds",
    }),
    ...mapMutationsMainPage({
      setMapFiltersRegionName: "setMapFiltersRegionName",
    }),
    nextSlide() {
      this.swiper.slideNext();
    },
    prevSlide() {
      this.swiper.slidePrev();
    },
    openNewLink(link) {
      window.open(link, "_blank");
    },
  },
  created() {
    this.getPartners();
    this.getPosts();
    this.getAds();
  },
  mounted() {
    this.swiper = new Swiper(".swiper-container", {
      loop: true,
    });
  },
};
</script>
<style scoped>
@import "https://unpkg.com/swiper@7/swiper-bundle.min.css";
/deep/.map-region__region * {
  fill: #b5c2ea;
  cursor: pointer;
  transition: all ease 0.3s;
}

/deep/.map-region__region:hover * {
  fill: #303f95;
}
/deep/.map-region__region_category_2 * {
  fill: #3d495e;
}
</style>
