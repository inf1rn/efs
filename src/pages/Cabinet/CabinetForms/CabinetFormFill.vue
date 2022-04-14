<template>
  <main class="regional__new-listeners content content_cabinet">
    <section class="form-detail page__section">
      <div class="form-detail__top">
        <h1 class="section-title">
          №{{ formId }} <br />
          {{ formTitle }}
        </h1>
      </div>

      <div class="form-detail__wrapper wrapper-max_width-m">
        <form @submit.prevent class="new-listeners__body width_m from">
          <div
            class="new-listeners__block block_white mb-3"
            v-for="(result, index) in results"
            :key="result.id"
          >
            <div class="new-listeners_tabs-form__line form__item">
              <label for="newListenersFio" class="form__label">{{
                fields[index][0].title
              }}</label>
              <input
                :type="getInputType(fields[index][0].type)"
                class="spollers-body__input form-input__border"
                id="newListenersFio"
                placeholder=""
                @input="
                  (e) =>
                    setFieldResult({ id: result.id, value: e.target.value })
                "
                :value="result.value"
              />
              <span class="form__label-three">{{
                fields[index][0].description
              }}</span>
            </div>
          </div>
          <div class="admin_mailings__row add-row_btns add-row">
            <button
              type="submit"
              class="
                button
                button_theme_green--empty
                button_border_small
                form__submit
              "
              @click="sendFormResults()"
            >
              Сохранить
            </button>
            <button
              type="submit"
              class="button button_theme_green button_border_small form__submit"
            >
              Сохранить и отправить
            </button>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } =
  createNamespacedHelpers("forms/formFill");

export default {
  name: "cabinet-form-fill",
  methods: {
    ...mapActions(["fetchFormResults", "sendFormResults", "fetchForm"]),
    ...mapMutations(["setFormId", "setFieldResult"]),
    getInputType(fieldType) {
      switch (fieldType) {
        case "string": {
          return "text";
        }
        case "integer": {
          return "number";
        }
      }
    },
  },
  computed: {
    ...mapState({
      fields: (state) => state.fields,
      results: (state) => state.formResults,
      formId: (state) => state.formId,
      formTitle: (state) => state.formTitle,
    }),
    title() {
      return this.formTitle;
    },
  },
  created() {
    this.setFormId(this.$route.params.formId);
    this.fetchFormResults();
    this.fetchForm();
  },
};
</script>