<template>
  <main class="regional__new-listeners content content_cabinet">
    <section class="form-detail page__section">
      <!-- <ul class="breadcrumbs page__breadcrumbs">
            <li class="breadcrumbs__item">
              <a href="#" class="breadcrumbs__link">Формы</a>
            </li>
            <li class="breadcrumbs__item">
              <span href="#" class="breadcrumbs__link breadcrumbs__link_current">добавить слушателя</span>
            </li>
          </ul> -->
      <div class="form-detail__top">
        <h1 class="section-title">
          №{{ form?.id }} <br />
          {{ form?.title }}
        </h1>
      </div>
      <div class="form-detail__info">
        <div class="form-detail__info-item">
          <label class="form-detail__info-item-label">
            <div class="form-detail__info-item-name">Организация</div>
            <span
              type="text"
              class="form-detail__info-item-input"
              placeholder="Заполните поле:"
              >{{
                form?.created_by &&
                getOrganizationById(form.created_by.organization_id).title
              }}</span
            >
          </label>
        </div>
        <div class="form-detail__info-item">
          <label class="form-detail__info-item-label">
            <div class="form-detail__info-item-name">Заполнитель</div>
            <span
              type="text"
              class="form-detail__info-item-input"
              placeholder="Заполните поле:"
              >{{ form?.created_by?.first_name }}
              {{ form?.created_by?.second_name }}</span
            >
          </label>
        </div>
        <div class="form-detail__info-item">
          <label class="form-detail__info-item-label">
            <div class="form-detail__info-item-name">Дата заполнения</div>
            <span
              type="date"
              class="form-detail__info-item-input"
              placeholder="Заполните поле:"
              >{{
                new Date(form?.created_at)?.toLocaleString("ru-RU").slice(0, 10)
              }}</span
            >
          </label>
        </div>
      </div>
      <div class="form-detail__wrapper wrapper-max_width-m">
        <form class="new-listeners__body width_m from">
          <div
            class="new-listeners__block block_white"
            v-for="field of fields"
            :key="field.id"
          >
            <div class="new-listeners_tabs-form__line form__item">
              <label for="newListenersFio" class="form__label">{{
                field.field.title
              }}</label>
              <span
                type="text"
                class="spollers-body__input form-input__border"
                id="newListenersFio"
                placeholder=""
                >{{ field.value }}</span
              >
              <span class="form__label-three">{{
                field.field.description
              }}</span>
            </div>
          </div>
        </form>
        <div class="new-listeners__btn">
          <button
            type="submit"
            class="
              button
              button_theme_green--empty
              button_border_small
              form__submit
            "
            @click="isPopupVisible = true"
          >
            Отправить на доработку
          </button>
          <button
            type="submit"
            class="button button_theme_green button_border_small form__submit"
            @click="acceptFormApproval()"
          >
            Согласовать
          </button>
        </div>
      </div>
    </section>
  </main>
  <cabinet-form-result-decline-popup
    @message-input="setDeclineMessage($event)"
    @submit="declineFormApproval()"
    :message="declineMessage"
    v-show="isPopupVisible"
  />
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import CabinetFormResultDeclinePopup from "@/components/Cabinet/CabinetForms/CabinetFormResultDeclinePopup";

const {
  mapState: mapStateFormApproval,
  mapMutations: mapMutationsFormApproval,
  mapActions: mapActionsFormApproval,
} = createNamespacedHelpers("forms/approval/formApproval");

const { mapGetters: mapGettersOrganizations } =
  createNamespacedHelpers("organizations");

export default {
  name: "cabinet-form-approval",
  components: { CabinetFormResultDeclinePopup },
  data() {
    return {
      isPopupVisible: false,
    };
  },
  watch: {
    cancel: {
      handler(val) {
        console.log(val)
        if (val) {
          this.$router.push("/cabinet/forms/approval");
          this.setCancel(false)
        }
      },
    },
  },
  methods: {
    ...mapActionsFormApproval([
      "fetchFormApproval",
      "acceptFormApproval",
      "declineFormApproval",
    ]),
    ...mapMutationsFormApproval([
      "setFormId",
      "setDeclineMessage",
      "setResultId",
      "setCancel"
    ])
  },
  computed: {
    ...mapStateFormApproval({
      form: (state) => state.form,
      fields: (state) => state.fields,
      cancel: (state) => state.cancel,
    }),
    ...mapGettersOrganizations(["getOrganizationById"]),
  },
  created() {
    console.log(this.$route.params.formId);
    this.setFormId(this.$route.params.formId);
    this.setResultId(this.$route.params.resultId);
    this.fetchFormApproval();
  },
};
</script>