<template>
  <main class="content content_cabinet">
    <section class="list-listeners page__section">
      <ul class="breadcrumbs page__breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link to="/cabinet/reports" class="breadcrumbs__link"
            >отчеты</router-link
          >
        </li>
        <li class="breadcrumbs__item">
          <router-link to="/cabinet/listeners" class="breadcrumbs__link"
            >слушатели</router-link
          >
        </li>
        <li class="breadcrumbs__item">
          <span href="#" class="breadcrumbs__link breadcrumbs__link_current">{{
            regionName
          }}</span>
        </li>
      </ul>
      <div class="list-listeners__top mb-50">
        <div class="list-listeners__left">
          <h1 class="section-title">{{ regionName }}</h1>
          <router-link
            v-if="permissions?.includes('create_listeners')"
            to="/cabinet/listeners/new-listener"
            class="list-listeners__add link-add"
            >+ добавить слушателя</router-link
          >
        </div>
        <div class="list-listeners__btn">
          <label
            for="downoloadCSV"
            class="button button_theme_green button_border_small"
          >
            Загрузить .CSV
          </label>
          <input
            type="file"
            id="downoloadCSV"
            @change="
              (e) => {
                setListenersCSV(e.target.files[0]);
                uploadListenersCSV();
              }
            "
            hidden
          />
        </div>
      </div>

      <div class="list-listeners__wrapper wrapper-max_width-m">
        <div class="list-listeners__row row-search mb-50">
          <input
            type="text"
            name="search"
            class="form__input-edit form__input-edit_type_search"
            id="search"
          />
        </div>
        <div class="list-listeners__row row-table">
          <div class="row-table__top">
            <div class="row-table__found">Найдено {{ listeners.length }}</div>
          </div>
          <table class="table list-listeners__table">
            <tbody>
              <tr class="table__row table__row_head">
                <th class="table__header">№</th>
                <th class="table__header">СНИЛС</th>
                <th class="table__header">Субъект ДПО</th>
                <th class="table__header">Тип населенного пункта</th>
                <th class="table__header">Название населенного пункта</th>
                <th class="table__header">Уровень образования</th>
                <th class="table__header">Должность</th>
                <th class="table__header"></th>
              </tr>
              <tr
                class="table__row"
                v-for="listener of listeners"
                :key="listener.id"
              >
                <td class="table__cell">{{ listener.id }}</td>
                <td class="table__cell">{{ listener.snils }}</td>
                <td class="table__cell">{{ listener.organization_name }}</td>
                <td class="table__cell">город</td>
                <td class="table__cell">{{ listener.region_name }}</td>
                <td class="table__cell">{{ listener.education_level }}</td>
                <td class="table__cell">{{ listener.position }}</td>
                <td class="table__cell">
                  <button class="table__cell-users_row-more">
                    <img src="@/assets/images/more_dots.svg" alt="more" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="table-pagination">
            <div class="table-pagination__count">
              {{ firstItemNumber }}-{{ lastItemNumber }} из
              {{ pagination?.total }}
            </div>
            <div class="table-pagination__bullets">
              <button @click="setPrevPage()" class="bullets-left _disabled">
                <img
                  src="@/assets/images/table-pagination/left.svg"
                  alt="left"
                />
              </button>
              <button @click="setNextPage()" class="bullets-right">
                <img
                  src="@/assets/images/table-pagination/right.svg"
                  alt="right"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

const {
  mapState: mapStateRegionListeners,
  mapActions: mapActionsRegionListeners,
  mapMutations: mapMutationsRegionListeners,
} = createNamespacedHelpers("listeners/regionListeners");

const { mapGetters: mapGettersLocation } = createNamespacedHelpers("location");
const { mapState: mapStateAccount } = createNamespacedHelpers("account");

export default {
  name: "cabinet-region-listeners",
  title: "Слушатели",

  computed: {
    ...mapStateRegionListeners({
      listeners: (state) => state.listeners,
      regionId: (state) => state.regionId,
      pagination: (state) => state.pagination,
    }),
    ...mapStateAccount({
      permissions: (state) => state.userData?.permissions,
    }),
    ...mapGettersLocation(["getRegionByRegionId"]),
    regionName() {
      if (!this.regionId) {
        return this.regionId;
      }

      return this.getRegionByRegionId(+this.regionId)?.title;
    },
    firstItemNumber() {
      if (!this.pagination) {
        return;
      }
      const { current_page, per_page } = this.pagination;
      return (current_page - 1) * per_page + 1;
    },
    lastItemNumber() {
      if (!this.pagination) {
        return;
      }
      const { current_page, count } = this.pagination;
      return this.firstItemNumber + count - 1;
    },
  },
  methods: {
    ...mapActionsRegionListeners([
      "fetchListeners",
      "setNextPage",
      "setPrevPage",
      "uploadListenersCSV",
    ]),
    ...mapMutationsRegionListeners(["setRegionId", "setListenersCSV"]),
  },
  created() {
    this.setRegionId(this.$route.params.regionId);
    this.fetchListeners();
  },
};
</script>