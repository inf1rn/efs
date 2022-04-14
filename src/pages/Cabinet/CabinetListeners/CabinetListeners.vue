<template>
  <main class="content content_cabinet">
    <section class="listeners regional-listeners admin-listeners page__section">
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
            for="downoloadCSV"
            class="button button_theme_green border button_border_small"
          >
            Загрузить .CSV
          </label>
          <input
            type="file"
            id="downoloadCSV"
            v-show="false"
            @change="
              (e) => {
                setListenersCSV(e.target.files[0]);
                uploadListenersCSV();
              }
            "
          />
        </div>
      </div>

      <div class="listeners__wrapper">
        <form class="form regional-detail__search form-width-m">
          <input
            type="text"
            name="search"
            class="
              form__input-edit
              form__input-edit_type_search
              form__input-edit_width_full
            "
            id="search"
          />
        </form>
        <div class="listeners__row">
          <div class="row-table__top">
            <div class="row-table__found">Найдено {{ listeners.length }}</div>
          </div>
          <table class="table admin-listeners__table-orgs">
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
          </table>
          <div class="table-pagination">
            <div class="table-pagination__count">
              {{ firstItemNumber }}-{{ lastItemNumber }} из
              {{ pagination?.total }}
            </div>
            <div class="table-pagination__bullets">
              <button class="bullets-left" @click="setPrevPage()">
                <img
                  src="@/assets/images/table-pagination/left.svg"
                  alt="left"
                />
              </button>
              <button class="bullets-right" @click="setNextPage()">
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
  mapState: mapStateListenersAll,
  mapActions: mapActionsListenersAll,
  mapMutations: mapMutationsListenersAll,
} = createNamespacedHelpers("listeners/listenersAll");
const { mapState: mapStateAccount } = createNamespacedHelpers("account");

export default {
  name: "cabinet-listeners",
  methods: {
    ...mapActionsListenersAll([
      "fetchListeners",
      "setNextPage",
      "setPrevPage",
      "uploadListenersCSV",
    ]),
    ...mapMutationsListenersAll(["setListenersCSV"]),
  },
  computed: {
    ...mapStateListenersAll({
      listeners: (state) => state.listeners,
      pagination: (state) => state.pagination,
      listenersCSV: (state) => state.listenersCSV,
    }),
    ...mapStateAccount({
      permissions: (state) => state.userData?.permissions,
    }),
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
  created() {
    this.fetchListeners();
  },
};
</script>