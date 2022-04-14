<template>
  <div class="tabs__body _tabs-block _active">
    <form class="tabs__body-form form reports_tabs-form reports_tabs-form--two">
      <div class="reports_tabs-form-wrap reports-wrap">
        <div class="repots__row row-spollers">
          <div class="spollers _spoller-init">
            <cabinet-report-template
              v-for="template in templates"
              :key="template.id"
              :forms="forms"
              :regions="regions"
              :templateData="template"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: mapStateReportTemplates,
  mapActions: mapActionsReportTemplates,
} = createNamespacedHelpers("forms/reports/reportTemplates");
const { mapState: mapStateLocation } = createNamespacedHelpers("location");
const { mapState: mapStateReports } = createNamespacedHelpers("forms/reports");
import CabinetReportTemplate from "@/components/Cabinet/CabinetReportTemplate.vue";

export default {
  components: { CabinetReportTemplate },
  name: "cabinet-templates",
  computed: {
    ...mapStateReportTemplates({
      templates: (state) => state.templates,
    }),
    ...mapStateReports({
      forms: (state) => state.forms,
    }),
    ...mapStateLocation({
      regions: (state) => state.regions,
    }),
  },
  methods: {
    ...mapActionsReportTemplates(["fetchReportTemplates"]),
  },
  created() {
    this.fetchReportTemplates();
  },
};
</script>
<style scoped>
.form__select {
  width: 150px;
}
</style>