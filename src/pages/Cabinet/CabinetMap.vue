<template>
  <main class="content content_cabinet">
    <section class="interactive-map page__section page__section_margin-top-s">
      <h1 class="section-title">Интерактивная карта</h1>
      <div class="filter interactive-map__filter">
        <form class="form interactive-map__form" @submit.prevent>
          <fieldset class="form__fieldset form__fieldset_row">
            <div class="form__item form__item_row form__item_width_s">
              <label for="district" class="form__label">Выбрать регион</label>
              <search-input
                inputClasses="form__input-edit form__input-edit_type_search"
                inputPlaceholder="Введите"
                :inputValue="filters.regionName"
                @search="setFiltersRegionName($event)"
              />
            </div>
            <div class="form__item form__item_row form__item_width_s">
              <label for="period" class="form__label">Период</label>
              <select
                name="period"
                class="form__select form__select_theme_white"
                id="period"
                v-model="filters.period"
              >
                <option value="Ноябрь 2021" class="select__option">
                  Ноябрь 2021
                </option>
              </select>
            </div>
          </fieldset>
          <a
            @click="clearFilters"
            href="#"
            class="filter__reset-link interactive-map__reset-link"
            >Сбросить</a
          >
        </form>
        <ul class="map-regions__subjects-list">
          <li class="map-regions__subjects-item">
            <a
              @click.prevent="setFiltersRegionName('Москва')"
              href="#"
              class="map-regions__subjects-link"
              >Москва</a
            >
          </li>
          <li class="map-regions__subjects-item">
            <a
              @click.prevent="setFiltersRegionName('Санкт-Петербург')"
              href="#"
              class="map-regions__subjects-link"
              >Санкт-Петербург</a
            >
          </li>
          <li class="map-regions__subjects-item">
            <a
              @click.prevent="setFiltersRegionName('Севастополь')"
              href="#"
              class="map-regions__subjects-link"
              >Севастополь</a
            >
          </li>
        </ul>
      </div>
      <ul class="map-color-legend interactive-map__map-color-legend">
        <li class="map-color-legend__item">
          <span class="map-color-legend__text">Показатели ниже нормы</span>
        </li>
        <li class="map-color-legend__item">
          <span class="map-color-legend__text">Просрочена отчетность</span>
        </li>
        <li class="map-color-legend__item">
          <span class="map-color-legend__text">Показатели в норме</span>
        </li>
      </ul>
      <Map
        baseUrl="/cabinet"
        @handler-click-map="handlerGetRegionStat($event)"
        :regionNameInput="filters.regionName"
      />
    </section>
    <section class="region-statistic page__section page__section_mt_l">
      <h2 class="section-title">{{ currentRegionName }}</h2>
      <ul class="stat-panels region-detail__stat-panels">
        <data-block
          :title="statPart.title"
          :value="statPart.value"
          v-for="statPart in regionStat"
          :key="statPart.code"
        />
      </ul>
    </section>
  </main>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import Map from "../../components/Map/Map.vue";
import { useTippy } from "vue-tippy";
import { ref } from "@vue/reactivity";
import { h } from "@vue/runtime-core";

const {
  mapActions: mapActionsCabinetMap,
  mapMutations: mapMutationsCabinetMap,
  mapState: mapStateCabinetMap,
} = createNamespacedHelpers("cabinetMap");
const { mapState: mapStateLocation } = createNamespacedHelpers("location");

export default {
  name: "CabinetMap",
  title: "Интерактивная карта",
  components: {
    Map,
  },
  computed: {
    ...mapStateCabinetMap({
      regionStat: (state) => state.regionStat,
      regionStatLoaded: (state) => state.loaded,
      filters: (state) => state.filters,
      currentRegionName: (state) => state.currentRegionName,
    }),
    ...mapStateLocation({
      regions: (state) => state.regions,
    }),
  },
  methods: {
    ...mapActionsCabinetMap({
      getRegions: "getRegions",
      getRegionStat: "getRegionStat",
    }),
    ...mapMutationsCabinetMap({
      setCurrentRegionId: "setCurrentRegionId",
      clearFilters: "clearFilters",
      setFiltersRegionName: "setFiltersRegionName",
      setCurrentRegionName: "setCurrentRegionName",
    }),
    handlerGetRegionStat({ title, regionId }) {
      this.setCurrentRegionId(regionId);
      this.setCurrentRegionName(title);
      this.getRegionStat();
    },
  },
};
</script>
<style scoped>
/deep/.map-region__region * {
  fill: #3d495e;
  cursor: pointer;
  transition: all ease 0.3s;
}

/deep/.map-region__region_category_2 * {
  fill: #d9e4f2;
}

/deep/ * {
  fill: #839ece;
}

/deep/.map-region__region:hover * {
  stroke: #2fd385;
  stroke-width: 2;
}
</style>
