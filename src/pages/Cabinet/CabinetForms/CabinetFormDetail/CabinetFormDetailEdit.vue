<template>
  <div class="tabs__body _tabs-block _active">
    <div class="form-detail__row row-period d-flex">
      <div class="form-detail__row-period">
        <label for="Periodicity" class="form__label"
          >Периодичность заполнения</label
        >
        <select
          type="text"
          name="Periodicity"
          class="form__input-edit"
          id="Periodicity"
          :value="formEditableData.frequency"
          @change="(e) => setFrequency(e.target.value)"
        >
          <option value="daily">Единоразово</option>
          <option value="monthly">Ежемесячно</option>
          <option value="quarterly">Ежеквартально</option>
          <option value="half-year">Раз в полугодие</option>
          <option value="yearly">Раз в год</option>
        </select>
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
              :value="formEditableData.activeStart"
              @change="(e) => setActiveStart(e.target.value)"
            />
            <div class="form-detail__dates-inputs__line"></div>
            <input
              type="date"
              name="formDetailDateTo"
              class="form__input-edit input-edit__to"
              id="dateTo"
              :value="formEditableData.activeEnd"
              @change="(e) => setActiveEnd(e.target.value)"
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
          :fieldTitle="
            form.fields.find((immutableField) => immutableField.id == field.id)
              .title
          "
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
      <div class="form-detail__btn">
        <button
          type="submit"
          class="button button_theme_green button_border_small form__submit"
          @click="$emit('save-fields')"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import CabinetFormField from "@/components/Cabinet/CabinetForms/CabinetFormField.vue";
import { createNamespacedHelpers } from "vuex";

const { mapMutations, mapActions } =
  createNamespacedHelpers("forms/formDetail");

export default {
  props: {
    fields: Array,
    form: Object,
    formEditableData: Object,
  },
  components: { CabinetFormField },
  name: "cabinet-form-detail-edit",
  methods: {
    ...mapMutations([
      "setFieldTitle",
      "setFieldDescription",
      "setFieldType",
      "setFieldRequired",
      "setFrequency",
      "setActiveStart",
      "setActiveEnd",
    ]),
    ...mapActions(["deleteField", "createField", "toggleEnabledField"]),
  },
};
</script>