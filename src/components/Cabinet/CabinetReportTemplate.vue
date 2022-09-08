<template>
  <div class="spollers__item">
    <button
      type="button"
      class="spollers__title"
      :class="{ '_spoller-active': isFieldActive }"
      @click="isFieldActive = !isFieldActive"
    >
      <span>{{ getFormByFormId(templateData.form_id)?.title }}</span>
    </button>
    <div class="spollers__body" :hidden="!isFieldActive">
      <div class="spollers__body-wrap">
        <div class="spollers__body-line">
          <div class="spollers__body-caption form__label-two">ФОРМА</div>
          <div class="spollers__body-info">
            <select v-model="formId" class="form-input__border">
              <option v-for="form in forms" :value="form.id" :key="form.id">
                {{ form.title }}
              </option>
            </select>
          </div>
          <div class="spollers__body-caption_small">
            Форма для формирования отчета
          </div>
        </div>
        <div class="spollers__body-line">
          <div class="spollers__body-caption form__label-two">Регион</div>
          <div class="spollers__body-info">
            <select v-model="regionId" class="form-input__border">
              <option
                v-for="region in regions"
                :key="region.id"
                :value="region.id"
              >
                {{ region.title }}
              </option>
            </select>
          </div>
          <div class="spollers__body-caption_small">
            Регион для формирования отчета
          </div>
        </div>
        <div class="spollers__body-line">
          <div class="spollers__body-caption form__label-two">период</div>
          <div class="spollers__body-info body-sel">
            <div class="spollers__body-date">
              <div class="spollers__body-inp">
                <div class="spollers__body-sel">
                  <input
                    type="date"
                    name="reportsDateFrom"
                    class="form__input-edit form__input-edit_el_date-to"
                    id="dateFrom"
                    v-model="dateStart"
                  />
                </div>

                <div class="spollers__body-caption_small">Дата с</div>
              </div>
              <div class="spollers__body-inp">
                <div class="spollers__body-sel">
                  <input
                    type="date"
                    name="reportsDateTo"
                    class="form__input-edit form__input-edit_el_date-to"
                    id="dateTo"
                    v-model="dateEnd"
                  />
                  <div class="reports__dates-inputs__line"></div>
                </div>
                <div class="spollers__body-caption_small">Дата по</div>
              </div>
            </div>
          </div>
          <div class="spollers__body-btn">
            <button
              type="submit"
              @click.prevent="
                $emit('create', {
                  formId,
                  regionId,
                  dateStart,
                  dateEnd,
                })
              "
              class="button button_theme_green button_border_small form__submit"
            >
              Создать отчет
            </button>
            <button
              type="submit"
              @click.prevent="$emit('delete', reportId)"
              class="button button_theme_red button_border_small form__submit"
            >
              Удалить шаблон
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 
<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters: mapGettersLocation } = createNamespacedHelpers("location");
const { mapGetters: mapGettersReports } =
  createNamespacedHelpers("forms/reports");

export default {
  name: "cabinet-report-template",
  props: {
    templateData: Object,
    regions: Array,
    forms: Array,
  },
  computed: {
    ...mapGettersLocation(["getRegionByRegionId"]),
    ...mapGettersReports(["getFormByFormId"]),
  },
  data() {
    return {
      isFieldActive: false,
      formId: "",
      regionId: "",
      dateStart: "",
      dateEnd: "",
      reportId: "",
    };
  },
  created() {
    this.formId = this.templateData.form_id;
    this.reportId = this.templateData.id;
    console.log(this.reportId);
    this.regionId = this.templateData.region_id;
    this.dateStart = new Date(this.templateData.date_start)
      .toISOString()
      .slice(0, 10);
    this.dateEnd = new Date(this.templateData.date_end)
      .toISOString()
      .slice(0, 10);
  },
};
</script>