<template>
  <main class="content content_cabinet">
    <section class="listeners admin-listeners page__section">
      <!-- <ul class="breadcrumbs page__breadcrumbs">
              <li class="breadcrumbs__item">
                <a href="#" class="breadcrumbs__link">Организации</a>
              </li>
              <li class="breadcrumbs__item">
                <a href="#" class="breadcrumbs__link">Регионы</a>
              </li>
              <li class="breadcrumbs__item">
                <span href="#" class="breadcrumbs__link breadcrumbs__link_current">Республика Адыгея (Адыгея)</span>
              </li>
            </ul> -->
      <div class="admin-listeners__header mb-50">
        <div class="admin-listeners__left">
          <h1 class="section-title">слушатели</h1>
          <router-link
            v-if="permissions?.includes('create_listeners')"
            to="/cabinet/listeners/new-listener"
            class="admin-listeners__add link-add"
            >+ добавить слушателя</router-link
          >
        </div>
        <div class="admin-listeners__btn">
          <label
            type="submit"
            for="importCSV"
            class="button button_theme_green border button_border_small"
          >
            Загрузить .CSV
          </label>
          <input
            type="file"
            id="importCSV"
            @change="
              (e) => {
                setListenerCSV(e.target.files[0]);
                uploadListenerCSV();
              }
            "
            hidden
          />
        </div>
      </div>

      <div class="listeners__wrapper wrapper-max_width-m">
        <div class="listeners__row listeners__panel">
          <h3>Статистика по стране</h3>
          <ul class="stat-panels listeners-detail__stat-panels">
            <li class="stat-panels__item">
              <h3 class="stat-panels__title">Регионы</h3>
              <p class="stat-panels__num">10</p>
            </li>
            <li class="stat-panels__item">
              <h3 class="stat-panels__title">Организаций ДПО</h3>
              <p class="stat-panels__num">3350</p>
            </li>
            <li class="stat-panels__item">
              <h3 class="stat-panels__title">Реализуемых программ</h3>
              <p class="stat-panels__num">{{ statistics.programsCount }}</p>
            </li>
            <li class="stat-panels__item">
              <h3 class="stat-panels__title">Слушателей</h3>
              <p class="stat-panels__num">{{ listenersStat[0]?.value }}</p>
            </li>
          </ul>
        </div>
        <div class="listeners__row listeners__inputs">
          <div class="listeners__region">
            <div class="listeners__region-block">
              <label for="listenersRegion" class="form__label">Регион</label>
              <select
                name="listenersRegion"
                class="form__select form__select_theme_white"
                :value="filters.regionId"
                @change="
                  (e) => {
                    setFiltersRegionId(e.target.value);
                    fetchRegionsListenersStat();
                  }
                "
              >
                <option value="">Вcе</option>
                <option
                  v-for="region of regions"
                  :value="region.title"
                  :key="region.id"
                >
                  {{ region.title }}
                </option>
              </select>
            </div>
          </div>
          <div class="listeners__region">
            <div class="listeners__region-block">
              <label for="listenersRegion" class="form__label">Город</label>
              <select
                name="listenersRegion"
                class="form__select form__select_theme_white"
                :value="filters.cityId"
                @change="
                  (e) => {
                    setFiltersCityId(e.target.value);
                    fetchRegionsListenersStat();
                  }
                "
              >
                <option value="">Вcе</option>
                <option
                  v-for="city of cities"
                  :value="city.title"
                  :key="city.id"
                >
                  {{ city.title }}
                </option>
              </select>
            </div>
          </div>
          <div class="listeners__year">
            <label for="listenersYear" class="form__label">Год</label>
            <select
              name="listenersYear"
              class="form__select form__select_theme_white"
            ></select>
          </div>
          <div class="listeners__kvartal">
            <label for="listenersKvartal" class="form__label">Квартал</label>
            <select
              name="listenersKvartal"
              class="form__select form__select_theme_white"
            ></select>
          </div>
          <div
            class="listeners__link"
            @click.prevent="
              () => {
                clearFilters();
                fetchRegionsListenersStat();
              }
            "
          >
            <a href="#" class="filter__reset-link reports-search__reset-link"
              >Сбросить</a
            >
          </div>
        </div>
        <div class="admin-listeners__region-static">
          <!-- <router-link :to="`/cabinet/subjects/${filters.regionId}`" v-if="filters.regionId"
            >Перейти к статистике по региону</router-link
          > -->
        </div>
        <div class="listeners__row listeners__all">
          <div class="listeners__list">
            <div
              class="listeners__item"
              v-for="listenerStat of listenersStat"
              :key="listenerStat.code"
            >
              <span>{{ listenerStat.title }}</span>
              <p>{{ listenerStat.value }}</p>
            </div>
          </div>
        </div>
        <div class="listeners__row listeners__table">
          <div class="table_header">
            <ul>
              <li>
                <a
                  @click.prevent="() => $refs.downoloadCSV.click()"
                  href="#"
                  class="table_header-icon_download"
                  >Скачать в формате csv</a
                >
              </li>
              <li>
                <a
                  @click.prevent="() => $refs.downoloadXLS.click()"
                  href="#"
                  class="table_header-icon_download"
                  >Скачать в формате xls</a
                >
              </li>
            </ul>
            <a
              href="#"
              @click.prevent="
                downloadItem({ url: csvUrl, label: 'listeners.csv' })
              "
              download
              hidden
              ref="downoloadCSV"
            ></a>
            <a
              href="#"
              download
              @click.prevent="
                downloadItem({ url: xlsUrl, label: 'listeners.xls' })
              "
              hidden
              ref="downoloadXLS"
            ></a>
          </div>
          <table class="table admin-listeners__table-orgs">
            <tr class="table__row table__row_head">
              <th class="table__header">Населенный пункт</th>
              <th class="table__header">Субъект ДПО</th>
              <th class="table__header">Количество слушателей</th>
              <th class="table__header"></th>
            </tr>
            <tr
              class="table__row"
              v-for="regionListenerStat of regionsListenersStat"
              :key="regionListenerStat.id"
            >
              <td class="table__cell">{{ regionListenerStat.region }}</td>
              <td class="table__cell">
                {{ regionListenerStat.organization }}
              </td>
              <td class="table__cell">{{ regionListenerStat.count }}</td>
              <td class="table__cell">
                <button class="table__cell-users_row-more">
                  <img src="@/assets/images/more_dots.svg" alt="more" />
                </button>
              </td>
            </tr>
          </table>
          <!-- <div class="table-pagination">
            <div class="table-pagination__count">1-10 из 1240</div>
            <div class="table-pagination__bullets">
              <button class="bullets-left _disabled">
                <img
                  src="@/assets/images/table-pagination/left.svg"
                  alt="left"
                />
              </button>
              <button class="bullets-right">
                <img
                  src="@/assets/images/table-pagination/right.svg"
                  alt="right"
                />
              </button>
            </div>
          </div> -->
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
import { loadFileMixin } from "@/mixins/loadFileMixin";

const {
  mapState: mapStateRegionsListenersStat,
  mapActions: mapActionsRegionsListenersStat,
  mapMutations: mapMutationsRegionsListenersStat,
} = createNamespacedHelpers("listeners/regionsListenersStat");
const { mapState: mapStateLocation } = createNamespacedHelpers("location");
const { mapState: mapStateAccount } = createNamespacedHelpers("account");

export default {
  name: "cabinet-listeners",
  title: "Слушатели",
  methods: {
    ...mapActionsRegionsListenersStat([
      "fetchListenersStat",
      "fetchRegionsListenersStat",
      "fetchStatistics",
      "uploadListenerCSV",
    ]),
    ...mapMutationsRegionsListenersStat([
      "setFiltersRegionId",
      "setFiltersCityId",
      "clearFilters",
      "setListenerCSV",
    ]),
  },
  mixins: [loadFileMixin],
  computed: {
    ...mapStateRegionsListenersStat({
      listenersStat: (state) => state.listenersStat,
      regionsListenersStat: (state) => state.regionsListenersStat,
      filters: (state) => state.filters,
      csvUrl: (state) => state.csvUrl,
      xlsUrl: (state) => state.xlsUrl,
      statistics: (state) => state.statistics,
    }),
    ...mapStateAccount({
      permissions: (state) => state.userData?.permissions,
    }),
    ...mapStateLocation({
      regions: (state) => state.regions,
      cities: state => state.cities
    }),
  },
  created() {
    this.fetchListenersStat();
    this.fetchRegionsListenersStat();
    this.fetchStatistics();
  },
};
</script>
