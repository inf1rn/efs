<template>
  <main class="content content_cabinet">
    <section class="users page__section">
      <div class="users__top">
        <h1 class="section-title">Пользователи</h1>
        <router-link to="/cabinet/users/new-user" class="users__add"
          >+ создать пользователя</router-link
        >
      </div>

      <div class="users__wrapper wrapper-max_width-m">
        <div class="users__row row-search">
          <search-input
            type="text"
            name="search"
            inputClasses="form__input-edit form__input-edit_type_search"
            :inputValue="filters.keyword"
            id="search"
            @search="setFiltersKeyword($event)"
            :value="filters.keyword"
          />
          <div class="users__dates">
            <label for="UsersDateFrom" class="form__label">Период входа</label>
            <div class="users__dates-wrap">
              <div class="users__dates-inputs">
                <input
                  type="date"
                  name="UsersDateFrom"
                  class="form__input-edit form__input-edit_el_date-from"
                  id="dateFrom"
                  @input="(e) => setFiltersDateFrom(e.target.value)"
                  :value="filters.dateFrom"
                />
                <div class="users__dates-inputs__line"></div>
                <input
                  type="date"
                  name="UsersDateTo"
                  class="form__input-edit form__input-edit_el_date-to"
                  id="dateTo"
                  @input="(e) => setFiltersDateTo(e.target.value)"
                  :value="filters.dateTo"
                />
              </div>
              <a
                @click.prevent="clearFilters()"
                href="#"
                class="filter__reset-link users-search__reset-link"
                >Сбросить</a
              >
            </div>
          </div>
        </div>
        <div class="users__row row-table">
          <div class="row-table__top">
            <div class="row-table__found">Найдено {{ users.length }}</div>
            <div class="row-table__selects table-selects">
              <select
                class="
                  form__select_theme_transparent
                  form__select_transparent_wrapper
                "
                @change="
                  (e) => {
                    setFiltersRoleId(e.target.value);
                    getUsers();
                  }
                "
                :value="filters.roleId"
              >
                <option value="">Все роли</option>
                <option v-for="role in roles" :value="role.name" :key="role.id">
                  {{ role.title }}
                </option>
              </select>
              <select
                @change="
                  (e) => {
                    setFiltersRegionId(e.target.value);
                  }
                "
                :value="filters.regionId"
                class="form__select_theme_transparent"
              >
                <option value="">Все регионы</option>
                <option
                  v-for="region in regions"
                  :key="region.id"
                  :value="region.id"
                >
                  {{ region.title }}
                </option>
              </select>
              <select
                @change="(e) => setFiltersCityId(e.target.value)"
                :value="filters.cityId"
                class="form__select_theme_transparent"
              >
                <option value="">Все города</option>
                <option v-for="city in cities" :key="city.id" :value="city.id">
                  {{ city.title }}
                </option>
              </select>
            </div>
          </div>
          <table class="table users__table">
            <tbody>
              <tr class="table__row table__row_head">
                <th class="table__header">ФИО</th>
                <th class="table__header">E-mail</th>
                <th class="table__header">Роль</th>
                <th class="table__header">Регион</th>
                <th class="table__header">Город</th>
                <th class="table__header">Место работы</th>
                <th class="table__header">Дата регистрации</th>
                <th class="table__header">Дата последнего входа</th>
                <th class="table__header">Удалить</th>
                <th class="table__header"></th>
              </tr>
              <tr
                class="table__row"
                v-for="user in users"
                @click="
                  (e) => {
                    setIsModalActive(true);
                    setCurrentUser(user);
                  }
                "
                :key="user.id"
              >
                <td class="table__cell">
                  {{ user.second_name }} {{ user.first_name }}
                  {{ user.last_name }}
                </td>
                <td class="table__cell">{{ user.email }}</td>
                <td class="table__cell">{{ user.roles[0]?.title }}</td>
                <td class="table__cell">{{ user.region.title }}</td>
                <td class="table__cell">{{ user.city.title }}</td>
                <td class="table__cell">{{ user.organization?.title }}</td>
                <td class="table__cell">31.12.2020</td>
                <td class="table__cell">
                  {{
                    new Date(user.last_login)
                      .toLocaleString("ru-RU")
                      .slice(0, 10)
                  }}
                </td>
                <td class="table__cell">
                  <button
                    @click.stop="deleteHandler(user.id)"
                    class="button button_theme_red button_border_small"
                  >
                    Удалить
                  </button>
                </td>
                <td class="table__cell">
                  <button class="table__cell-users_row-more">
                    <img src="@/assets/images/more_dots.svg" alt="more" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>
  <teleport to="#app" v-if="isModalActive">
    <cabinet-users-popup />
  </teleport>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import SearchInput from "@/components/UI/SearchInput.vue";
import CabinetUsersPopup from "@/components/Cabinet/CabinetUsers/CabinetUsersPopup/CabinetUsersPopup.vue";

const {
  mapActions: mapActionsUsersAll,
  mapState: mapStateUsersAll,
  mapMutations: mapMutationsUsersAll,
} = createNamespacedHelpers("users/usersAll");
const { mapState: mapStateLocation } = createNamespacedHelpers("location");
const { mapState: mapStateCurrentUser, mapMutations: mapMutationsCurrentUser } =
  createNamespacedHelpers("users/currentUser");
const { mapState: mapStateAccount } = createNamespacedHelpers("account");

export default {
  components: { SearchInput, CabinetUsersPopup },
  name: "cabinet-users",
  title: "Пользователи",
  computed: {
    ...mapStateUsersAll({
      users: (state) => state.users,
      filters: (state) => state.filters,
    }),
    ...mapStateLocation({
      regions: (state) => state.regions,
      cities: (state) => state.cities,
    }),
    ...mapStateCurrentUser({
      isModalActive: (state) => state.isModalActive,
    }),
    ...mapStateAccount({
      roles: (state) => state.roles,
    }),
  },
  methods: {
    ...mapActionsUsersAll([
      "getUsers",
      "setFiltersKeyword",
      "setFiltersDateFrom",
      "setFiltersDateTo",
      "setFiltersRegionId",
      "setFiltersCityId",
      "clearFilters",
      "deleteUser",
    ]),
    ...mapMutationsCurrentUser(["setIsModalActive", "setCurrentUser"]),
    ...mapMutationsUsersAll(["setFiltersRoleId", "setRemovableUserId"]),
    deleteHandler(id) {
      this.setRemovableUserId(id);
      this.deleteUser();
    },
  },
  created() {
    this.getUsers();
  },
};
</script>