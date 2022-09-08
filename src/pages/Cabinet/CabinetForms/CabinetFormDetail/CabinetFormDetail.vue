<template>
  <main class="content content_cabinet">
    <section class="form-detail page__section">
      <ul class="breadcrumbs page__breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link to="/cabinet/forms" class="breadcrumbs__link"
            >формы</router-link
          >
        </li>
        <li class="breadcrumbs__item">
          <span to="/cabinet/forms" class="breadcrumbs__link">{{
            form?.title
          }}</span>
        </li>
      </ul>
      <div class="form-detail__top">
        <h1 class="section-title">
          №{{ formId }} <br />
          {{ form?.title }}
        </h1>
        <span href="#" class="form-detail__subtitle">{{ rusFrequency }}</span>
      </div>

      <div class="form-detail__wrapper wrapper-max_width-m">
        <div class="tabs form-detail__tabs _tabs">
          <nav class="tabs__navigation">
            <button
              type="submit"
              class="tabs__title _tabs-item"
              :class="{ _active: component === 'CabinetFormDetailStat' }"
              @click="component = 'CabinetFormDetailStat'"
            >
              Статистика формы
            </button>
            <button
              type="submit"
              class="tabs__title _tabs-item"
              :class="{ _active: component === 'CabinetFormDetailEdit' }"
              @click="component = 'CabinetFormDetailEdit'"
            >
              Настройки формы
            </button>
          </nav>
          <div class="tabs__content">
            <keep-alive>
              <component
                :is="component"
                :fields="fields"
                :formEditableData="formEditableData"
                :form="form"
                @save-fields="saveFields()"
              ></component>
            </keep-alive>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import CabinetFormDetailEdit from "./CabinetFormDetailEdit.vue";
import CabinetFormDetailStat from "./CabinetFormDetailStat.vue";
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions, mapMutations } =
  createNamespacedHelpers("forms/formDetail");

export default {
  components: { CabinetFormDetailEdit, CabinetFormDetailStat },
  name: "cabinet-form-detail-edit",
  data() {
    return {
      component: "CabinetFormDetailStat",
    };
  },
  methods: {
    ...mapActions(["fetchForm", "saveFields"]),
    ...mapMutations(["setFormId"]),
  },
  computed: {
    ...mapState({
      form: (state) => state.form,
      fields: (state) => state.fields,
      formId: (state) => state.formId,
      formEditableData: (state) => state.formEditableData,
      rusFrequency() {
        switch (this.form.frequency) {
          case "daily":
            return "Ежедневно";
          case "quarterly":
            return "Ежеквартально";
          case "monthly":
            return "Ежемесячно";
          case "yearly":
            return "Ежегодно";
          default:
            return "";
        }
      },
    }),
    title() {
      return this.form?.title;
    },
  },
  created() {
    this.setFormId(this.$route.params.formId);
    this.fetchForm();
  },
};
</script>