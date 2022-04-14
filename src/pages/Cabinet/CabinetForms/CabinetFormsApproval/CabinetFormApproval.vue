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
            <input
              type="text"
              class="form-detail__info-item-input"
              placeholder="Заполните поле:"
            />
          </label>
        </div>
        <div class="form-detail__info-item">
          <label class="form-detail__info-item-label">
            <div class="form-detail__info-item-name">Заполнитель</div>
            <input
              type="text"
              class="form-detail__info-item-input"
              placeholder="Заполните поле:"
            />
          </label>
        </div>
        <div class="form-detail__info-item">
          <label class="form-detail__info-item-label">
            <div class="form-detail__info-item-name">Дата заполнения</div>
            <input
              type="date"
              class="form-detail__info-item-input"
              placeholder="Заполните поле:"
            />
          </label>
        </div>
      </div>
      <div class="form-detail__wrapper wrapper-max_width-m">
        <form class="new-listeners__body width_m from">
          <div class="new-listeners__block block_white">
            <div class="new-listeners_tabs-form__line form__item">
              <label for="newListenersFio" class="form__label"
                >Полное наименование организации ДПО (по Уставу)</label
              >
              <input
                type="text"
                class="spollers-body__input form-input__border"
                id="newListenersFio"
                placeholder=""
              />
              <span class="form__label-three"
                >Наименование организации ДПО по Уставу</span
              >
            </div>
          </div>
          <div class="new-listeners__block block_white">
            <div class="new-listeners_tabs-form__line form__item">
              <div class="form__item-block">
                <label for="newListenersEditFullname" class="form__label"
                  >ФИО руководителя организации ДПО</label
                >
                <input
                  type="text"
                  class="spollers-body__input form-input__border"
                  id="newListenersEditFullname"
                  placeholder=""
                />
              </div>

              <span class="form__label-three"
                >Например: Тихонов Валерий Анатольевич</span
              >
            </div>
          </div>
          <div class="new-listeners__block block_white">
            <div class="new-listeners_tabs-form__line form__item">
              <div class="form__item-block">
                <label for="newListenersAddress" class="form__label"
                  >Юридический адрес</label
                >
                <input
                  type="text"
                  class="spollers-body__input form-input__border"
                  id="newListenersAddress"
                  placeholder=""
                />
              </div>

              <span class="form__label-three"
                >Например: Москва, Тимирязевская улица, 36</span
              >
            </div>
          </div>
          <div class="new-listeners__block block_white">
            <div class="new-listeners_tabs-form__line form__item">
              <div class="form__item-block">
                <label for="newListenersOKPO" class="form__label">ОКПО</label>
                <input
                  type="text"
                  class="spollers-body__input form-input__border"
                  id="newListenersOKPO"
                  placeholder=""
                />
              </div>

              <span class="form__label-three"
                >Общероссийский классификатор предприятий и организаций</span
              >
            </div>
          </div>
          <div class="new-listeners__block block_white">
            <div class="new-listeners_tabs-form__line form__item">
              <div class="form__item-block">
                <label for="newListenersIIN" class="form__label">ИНН</label>
                <input
                  type="text"
                  class="spollers-body__input form-input__border"
                  id="newListenersIIN"
                  placeholder=""
                />
              </div>

              <span class="form__label-three"
                >Идентификационный номер налогоплательщика</span
              >
            </div>
          </div>
          <div class="new-listeners__block block_white">
            <div class="new-listeners_tabs-form__line form__item">
              <div class="form__item-block">
                <label for="newListenersKPP" class="form__label">КПП</label>
                <input
                  type="text"
                  class="spollers-body__input form-input__border"
                  id="newListenersKPP"
                  placeholder=""
                />
              </div>

              <span class="form__label-three"
                >Код причины постановки на учет</span
              >
            </div>
          </div>
          <div class="new-listeners__block block_white">
            <div class="new-listeners_tabs-form__line form__item">
              <div class="form__item-block">
                <label for="newListenersOGHN" class="form__label">ОГРН</label>
                <input
                  type="text"
                  class="spollers-body__input form-input__border"
                  id="newListenersOGHN"
                  placeholder=""
                />
              </div>

              <span class="form__label-three"
                >Основной государственный регистрационный номер</span
              >
            </div>
          </div>
          <div class="new-listeners__block block_white">
            <div class="new-listeners_tabs-form__line form__item">
              <div class="form__item-block">
                <label for="newListenersOKTPO" class="form__label">ОКТМО</label>
                <input
                  type="text"
                  class="spollers-body__input form-input__border"
                  id="newListenersOKTPO"
                  placeholder=""
                />
              </div>

              <span class="form__label-three"
                >Общероссийский классификатор территорий муниципальных
                образований</span
              >
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
            @click="acceptHandler()"
          >
            Согласовать
          </button>
        </div>
      </div>
    </section>
  </main>
  <cabinet-form-result-decline-popup
    @message-input="setDeclineMessage($event)"
    @submit="declineHandler()"
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

export default {
  name: "cabinet-form-approval",
  components: { CabinetFormResultDeclinePopup },
  data() {
    return {
      isPopupVisible: false,
    };
  },
  methods: {
    ...mapActionsFormApproval([
      "fetchFormApproval",
      "acceptFormApproval",
      "declineFormApproval",
    ]),
    ...mapMutationsFormApproval(["setFormId", "setDeclineMessage"]),
    acceptHandler() {
      this.acceptFormApproval();
      this.$router.push("/cabinet/forms/approval");
    },
    declineHandler() {
      this.declineFormApproval();
      this.$router.push("/cabinet/forms/approval");
    },
  },
  computed: {
    ...mapStateFormApproval({
      form: (state) => state.form,
    }),
  },
  created() {
    console.log(this.$route.params.formId);
    this.setFormId(this.$route.params.formId);
    this.fetchFormApproval();
  },
};
</script>