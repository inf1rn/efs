<template>
  <main class="content">
    <section class="regions-page page__section page__section_width_content">
      <h1 class="section-title page__title">Субъекты</h1>
      <form class="form form-width-m regions-page__search">
        <search-input :inputValue="filters.keyword" @search="handlerSearch" />
      </form>
      <div class="regions-page__region-search">
        <div class="regions-page__letters">
          <div class="hex-menu">
            <div class="hex-menu__row">
              <a
                v-for="charStatus in charStatuses.slice(0, 7)"
                :key="charStatus.char"
                href="#"
                @click="() => changeChar(charStatus)"
                :class="{
                  'hex-menu__item_disabled': charStatus.disabled,
                  'hex-menu__item_active': charStatus.char === currentChar,
                }"
                class="hex hex-menu__item"
                >{{ charStatus.char }}</a
              >
            </div>
            <div class="hex-menu__row">
              <a
                v-for="charStatus in charStatuses.slice(7, 13)"
                :key="charStatus.char"
                href="#"
                @click="() => changeChar(charStatus)"
                :class="{
                  'hex-menu__item_disabled': charStatus.disabled,
                  'hex-menu__item_active': charStatus.char === currentChar,
                }"
                class="hex hex-menu__item"
                >{{ charStatus.char }}</a
              >
            </div>
            <div class="hex-menu__row">
              <a
                v-for="charStatus in charStatuses.slice(13, 20)"
                :key="charStatus.char"
                href="#"
                @click="() => changeChar(charStatus)"
                :class="{
                  'hex-menu__item_disabled': charStatus.disabled,
                  'hex-menu__item_active': charStatus.char === currentChar,
                }"
                class="hex hex-menu__item"
                >{{ charStatus.char }}</a
              >
            </div>
            <div class="hex-menu__row">
              <a
                v-for="charStatus in charStatuses.slice(20, 26)"
                :key="charStatus.char"
                href="#"
                @click="() => changeChar(charStatus)"
                :class="{
                  'hex-menu__item_disabled': charStatus.disabled,
                  'hex-menu__item_active': charStatus.char === currentChar,
                }"
                class="hex hex-menu__item"
                >{{ charStatus.char }}</a
              >
            </div>
            <div class="hex-menu__row">
              <a
                v-for="charStatus in charStatuses.slice(26, 34)"
                :key="charStatus.char"
                href="#"
                @click="() => changeChar(charStatus)"
                :class="{
                  'hex-menu__item_disabled': charStatus.disabled,
                  'hex-menu__item_active': charStatus.char === currentChar,
                }"
                class="hex hex-menu__item"
                >{{ charStatus.char }}</a
              >
            </div>
          </div>
        </div>
        <div class="regions-page__region-list">
          <h3 class="panel-title">{{ currentChar }}</h3>
          <nav class="regions-page__region-menu">
            <router-link
              :to="baseURL + '/subjects/' + region.id"
              v-for="region in currentRegions"
              :key="region.title"
              class="regions-page__region-menu-item"
              >{{ region.title }}</router-link
            >
          </nav>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapActions: mapActionsRegions,
  mapState: mapStateRegions,
  mapMutations: mapMutationsRegions,
} = createNamespacedHelpers("subjects/organizationsRegions");

const { mapState: mapStateLocation } = createNamespacedHelpers("location");

export default {
  name: "regions",
  props: {
    baseURL: String,
  },
  title: "Регионы",
  data() {
    return {
      alphabet: [
        "а",
        "б",
        "в",
        "г",
        "д",
        "е",
        "ё",
        "ж",
        "з",
        "и",
        "й",
        "к",
        "л",
        "м",
        "н",
        "о",
        "п",
        "р",
        "с",
        "т",
        "у",
        "ф",
        "х",
        "ц",
        "ч",
        "ш",
        "щ",
        "ъ",
        "ы",
        "ь",
        "э",
        "ю",
        "я",
      ],
    };
  },
  computed: {
    ...mapStateRegions({
      currentChar: (state) => state.currentChar,
      charStatuses: (state) => state.charStatuses,
      currentRegions: (state) => state.regions,
      filters: (state) => state.filters,
    }),
    ...mapStateLocation({
      allRegions: (state) => state.regions,
    }),
    charStatuses() {
      const alphabetData = this.alphabet.map((char) => ({
        char,
        disabled: true,
      }));

      this.allRegions.forEach((region) => {
        const charData = alphabetData.find(
          (charData) => charData.char == region.title[0].toLowerCase()
        );
        if (charData) {
          charData.disabled = false;
        }
      });
      return alphabetData;
    },
  },
  methods: {
    ...mapActionsRegions(["getRegions"]),
    ...mapMutationsRegions(["setCurrentChar", "setFiltersKeyword"]),
    changeChar(charStatus) {
      if (charStatus.disabled) {
        return;
      }
      this.setCurrentChar(charStatus.char);
      this.setFiltersKeyword("");
      this.getRegions();
    },
    handlerSearch($event) {
      this.setFiltersKeyword($event);
      if (!$event) {
        return;
      }
      this.setCurrentChar(null);
      this.getRegions();
    },
  },
  created() {
    this.getRegions();
  },
};
</script>