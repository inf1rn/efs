<template>
  <main class="regional__new-listeners content content_cabinet">
    <section class="form-detail page__section">
      <h1 class="section-title mb-3">создать форму</h1>
      <div class="form-detail__row mb-3">
        <label for="FormName" class="form__label">Имя формы</label>
        <input
          :value="name"
          @input="(e) => setName(e.target.value)"
          @change="v$.name.$touch()"
          type="text"
          name="Periodicity"
          class="form__input-edit"
          :class="{
            invalid: v$.name.$error,
          }"
          id="FormName"
          placeholder="Введите имя формы"
        />
      </div>
      <div class="form-detail__row row-period d-flex">
        <div class="form-detail__row-period">
          <label for="Periodicity" class="form__label"
            >Периодичность заполнения</label
          >
          <select
            name="Periodicity"
            class="form__input-edit"
            id="Periodicity"
            placeholder="1 раз в год"
            :value="frequency"
            @change="(e) => setFrequency(e.target.value)"
          >
            <option value="daily">Ежедневно</option>
            <option value="monthly">Ежемесячно</option>
            <option value="quarterly">Ежеквартально</option>
            <option value="half-year">Раз в полугодие</option>
            <option value="yearly">Ежегодно</option>
          </select>
        </div>
        <div class="form-detail__row-period">
          <label for="Periodicity" class="form__label"
            >Предназначение формы</label
          >
          <select class="form__input-edit" placeholder="1 раз в год"></select>
        </div>
        <div class="form-detail__dates">
          <label for="formDetailDateFrom" class="form__label"
            >Период действия</label
          >
          <div class="form-detail__dates-wrap">
            <div class="form-detail__dates-inputs d-flex">
              <input
                type="date"
                name="formDetailDateFrom"
                class="form__input-edit input-edit__form"
                id="dateFrom"
                :value="activeDateFrom"
                @change="(e) => setActiveDateFrom(e.target.value)"
              />
              <div class="form-detail__dates-inputs__line"></div>
              <input
                type="date"
                name="formDetailDateTo"
                class="form__input-edit input-edit__to"
                id="dateTo"
                :value="activeDateBefore"
                @change="(e) => setActiveDateBefore(e.target.value)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="form-detail__row row-spollers">
        <div data-spollers class="spollers _spoller-init">
          <cabinet-form-field
            v-for="field in fields"
            :key="field.id"
            :field="field"
            :title="field.title"
            @change-field-title="setFieldTitle($event)"
            @change-field-description="setFieldDescription($event)"
            @change-field-type="setFieldType($event)"
            @change-field-required="setFieldRequired($event)"
            @delete-field="deleteField($event)"
            @duplicate-field="createField($event)"
            @toggle-enabled-field="toggleEnabledField($event)"
          />
        </div>
      </div>
      <div class="form-detail__row">
        <button
          type="submit"
          @click="setNewEmptyField()"
          class="
            button button_theme_green button_border_small
            form__submit
            mr-5
          "
        >
          Добавить поле
        </button>
        <button
          type="submit"
          @click="submitButton()"
          class="button button_theme_green button_border_small form__submit"
        >
          Создать форму
        </button>
      </div>
    </section>
  </main>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import CabinetFormField from "@/components/Cabinet/CabinetForms/CabinetFormField.vue";
import { createNamespacedHelpers } from "vuex";

const { mapState, mapMutations, mapActions } =
  createNamespacedHelpers("forms/newForm");

export default {
  name: "cabinet-new-form",
  title: "Новая форма",
  components: { CabinetFormField },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      name: { required, $lazy: true },
    };
  },
  computed: {
    ...mapState({
      name: (state) => state.name,
      frequency: (state) => state.frequency,
      activeDateFrom: (state) => state.activeDateFrom,
      activeDateBefore: (state) => state.activeDateBefore,
      fields: (state) => state.fields,
    }),
  },
  methods: {
    ...mapMutations([
      "setName",
      "setFrequency",
      "setActiveDateFrom",
      "setActiveDateBefore",
      "setNewEmptyField",
      "setFieldTitle",
      "setFieldDescription",
      "setFieldType",
      "setFieldRequired",
      "createField",
      "deleteField",
      "toggleEnabledField",
    ]),
    ...mapActions(["saveForm"]),
    async submitButton() {
      console.log("fields");
      console.log(this.fields);
      let isFieldsValid = true;
      this.fields.map((field) => {
        if (!field.description || !field.title) {
          isFieldsValid = false;
        }
      });

      if (!isFieldsValid) {
        alert("Не заполнены все данные полей");
        return;
      }
      this.v$.name.$touch();
      if (this.v$.name.$error) {
        alert("Имя формы не может быть пустым");
        return;
      }
      const isFieldsEmpty = this.fields.length === 0;
      if (isFieldsEmpty) {
        alert("Нельзя создать форму без полей");
      } else {
        try {
          await this.saveForm();
        } catch (e) {
          alert("Ошибка при отправке формы");
        }
      }
    },
  },
};
</script>