<template>
  <main class="content content_cabinet">
    <section class="users page__section">
      <div class="users__top">
        <h1 class="section-title">формы для согласования</h1>
      </div>
      <div class="users__wrapper wrapper-max_width-m">
        <div class="users__row row-search">
          <search-input
            type="text"
            name="search"
            inputClasses="form__input-edit form__input-edit_type_search"
            id="search"
            @search="
              (val) => {
                setKeyword(val);
                fetchFormsApproval();
              }
            "
            :inputValue="filters.keyword"
          />
        </div>
        <div class="users__row row-table">
          <div class="row-table__top">
            <div class="row-table__found">
              Ожидают согласования: {{ forms.length }}
            </div>
          </div>
          <table class="table users__table">
            <tbody>
              <tr class="table__row table__row_head">
                <th class="table__header">Номер</th>
                <th class="table__header">Наименование</th>
                <th class="table__header">Периодичность</th>
                <th class="table__header">Действие</th>
                <th class="table__header">Субъекст ДПО</th>
                <th class="table__header">Заполнитель</th>
                <th class="table__header"></th>
              </tr>
              <tr
                class="table__row"
                v-for="form of forms"
                :key="form.id"
                @click="
                  $router.push(
                    `/cabinet/forms/approval/approval-form-${form.id}`
                  )
                "
              >
                <td class="table__cell">{{ form.id }}</td>
                <td class="table__cell">
                  {{ form.title }}
                </td>
                <td class="table__cell">
                  {{ getFrequencyRus(form.frequency) }}
                </td>
                <td class="table__cell">10.10.21 - 31.10.21</td>
                <td class="table__cell"></td>
                <td class="table__cell">{{}}</td>
                <td class="table__cell">
                  <button class="table__cell-users_row-more">
                    <img src="@/assets/images/more_dots.svg" alt="more" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <div class="table-pagination table-pagination_nopadd">
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
import { createNamespacedHelpers } from "vuex";
import { translateMixin } from "@/mixins/translateMixin";

const {
  mapState: mapStateFormsApproval,
  mapActions: mapActionsFormsApproval,
  mapMutations: mapMutationsFormsApproval,
} = createNamespacedHelpers("forms/approval/formsApproval");

export default {
  name: "cabinet-forms-approval",
  mixins: [translateMixin],
  methods: {
    ...mapActionsFormsApproval(["fetchFormsApproval"]),
    ...mapMutationsFormsApproval(["setKeyword"]),
  },
  computed: {
    ...mapStateFormsApproval({
      forms: (state) => state.forms,
      filters: (state) => state.filters,
    }),
  },
  created() {
    this.fetchFormsApproval();
  },
};
</script>