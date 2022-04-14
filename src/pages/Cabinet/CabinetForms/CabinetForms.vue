<template>
  <main class="content content_cabinet">
    <section class="users page__section">
      <div class="users__top">
        <h1 class="section-title">формы</h1>
        <router-link
          v-if="userPermissions.includes('create_forms')"
          to="/cabinet/forms/new-form"
          class="users__add"
          >+ создать форму</router-link
        >
      </div>

      <div class="users__wrapper wrapper-max_width-m">
        <div class="users__row row-search">
          <search-input
            :inputValue="filters.keyword"
            @search="
              ($event) => {
                setKeyword($event);
                fetchForms();
              }
            "
          />
        </div>
        <div class="users__row row-table">
          <div class="row-table__top">
            <div class="row-table__found">Найдено {{ forms.length }}</div>
            <div class="row-table__selects table-selects">
              <div class="table-selects__col">
                <select
                  class="form__select_theme_transparent"
                  style="width: 150px; margin-right: 20px"
                >
                  <option>Выберите период</option>
                </select>
              </div>
              <div class="table-selects__col">
                <select
                  class="form__select_theme_transparent"
                  style="width: 150px"
                >
                  <option>Выберите статус</option>
                </select>
              </div>
            </div>
          </div>
          <table class="table users__table">
            <tbody>
              <tr class="table__row table__row_head">
                <th class="table__header">Номер</th>
                <th class="table__header">Наименование</th>
                <th class="table__header">Периодичность</th>
                <th class="table__header">Действие</th>
                <th class="table__header">Заполнило</th>
                <th class="table__header">Статус</th>
                <th class="table__header">Удалить</th>
                <th class="table__header"></th>
              </tr>
              <tr
                class="table__row"
                v-for="form in forms"
                :key="form.id"
                @click="$router.push(`${formUrl}${form.id}`)"
              >
                <td class="table__cell">{{ form.id }}</td>
                <td class="table__cell">
                  {{ form.title }}
                </td>
                <td class="table__cell">Раз в год</td>
                <td class="table__cell">10.10.21 - 31.10.21</td>
                <td class="table__cell">67/85</td>
                <td class="table__cell">{{ form.status.title }}</td>
                <td class="table__cell">
                  <button
                    @click.stop="deleteHandler(form.id)"
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
</template>
<script>
import { createNamespacedHelpers } from "vuex";

const {
  mapActions: mapActionsForms,
  mapState: mapStateForms,
  mapMutations: mapMutationsForms,
} = createNamespacedHelpers("forms/formsAll");
const { mapState: mapStateAccount } = createNamespacedHelpers("account");

export default {
  name: "cabinet-forms",
  title: "Формы",
  methods: {
    ...mapActionsForms(["fetchForms", "deleteForm"]),
    ...mapMutationsForms(["setKeyword", "setRemovableFormId"]),
    deleteHandler(formId) {
      this.setRemovableFormId(formId);
      this.deleteForm();
    },
  },
  computed: {
    ...mapStateForms({
      forms: (state) => state.forms,
      filters: (state) => state.filters,
    }),
    ...mapStateAccount({
      userRole: (state) => state.userData.roles[0],
      userPermissions: (state) => state.userData.permissions,
    }),
    formUrl() {
      console.log(this.userRole);
      const fillFormRoles = ["regional_monitoring"];

      if (fillFormRoles.includes(this.userRole.name)) {
        return "/cabinet/forms/fill-form-";
      }
      return "/cabinet/forms/form-";
    },
  },
  created() {
    this.fetchForms();
  },
};
</script>