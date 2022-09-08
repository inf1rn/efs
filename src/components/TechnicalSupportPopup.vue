<template>
  <div class="popup_wrapper" @click.self="() => setIsOpened(false)">
    <div class="popup page__popup-support popup_active">
      <button
        @click="() => setIsOpened(false)"
        class="popup__close-btn"
      ></button>
      <h2 class="popup__title">Служба поддержки</h2>
      <form @submit.prevent class="form">
        <fieldset class="form__fieldset">
          <div class="form__two-columns">
            <div class="form__item">
              <label for="support-lastname" class="form__label">Фамилия</label>
              <input
                :class="{
                  invalid: v$.technicalSupportFormData.lastName.$error,
                }"
                @input="(e) => setLastName(e.target.value)"
                :value="technicalSupportFormData.lastName"
                type="text"
                name="support-lastname"
                class="form__input-edit form__input-edit_el_support-lastname"
                id="support-lastname"
              />
            </div>
            <div class="form__item">
              <label for="support-name" class="form__label">Имя</label>
              <input
                :class="{
                  invalid: v$.technicalSupportFormData.firstName.$error,
                }"
                @input="(e) => setFirstName(e.target.value)"
                :value="technicalSupportFormData.firstName"
                type="text"
                name="support-name"
                class="form__input-edit form__input-edit_el_support-name"
                id="support-name"
              />
            </div>
            <div class="form__item">
              <label for="support-secondname" class="form__label"
                >Отчество</label
              >
              <input
                :class="{
                  invalid: v$.technicalSupportFormData.thirdName.$error,
                }"
                @input="(e) => setThirdName(e.target.value)"
                :value="technicalSupportFormData.thirdName"
                type="text"
                name="support-secondname"
                class="form__input-edit form__input-edit_el_support-secondname"
                id="support-secondname"
              />
            </div>
            <div class="form__item">
              <label for="support-email" class="form__label">E-mail</label>
              <input
                :class="{
                  invalid: v$.technicalSupportFormData.email.$error,
                }"
                @input="(e) => setEmail(e.target.value)"
                :value="technicalSupportFormData.email"
                type="email"
                name="support-email"
                class="form__input-edit form__input-edit_el_support-email"
                id="support-email"
              />
            </div>
          </div>
          <div class="form__item">
            <label for="support-question" class="form__label">Ваш вопрос</label>
            <textarea
              :class="{
                invalid: v$.technicalSupportFormData.question.$error,
              }"
              @input="(e) => setQuestion(e.target.value)"
              :value="technicalSupportFormData.question"
              name="support-question"
              class="form__textarea form__textarea_el_support-question"
              id="support-question"
            ></textarea>
          </div>
        </fieldset>
        <div class="form-group">
        <input
          type="checkbox"
          @input="
            (e) => {
              setAgreeProcessing(e.target.checked);
            }
          "
          :checked="technicalSupportFormData.agreeProcessing"
          id="chk"
        />
        <label for="chk">Согласен на обработку персональных данных</label>
        </div>
        <fieldset class="form__fieldset form__fieldset_type_button-area">
          <button
            @click="submitButton"
            type="submit"
            class="button button_theme_green button_border_rounded form__submit"
          >
            Отправить
          </button>
        </fieldset>
      </form>
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { mapActions, mapMutations, mapState } from "vuex";
import { required, email, sameAs } from "@vuelidate/validators";
export default {
  name: "TechnicalSupportPopup",
  validations() {
    return {
      technicalSupportFormData: {
        firstName: { required, $lazy: true },
        lastName: { required, $lazy: true },
        thirdName: { required, $lazy: true },
        email: { required, email, $lazy: true },
        question: { required, $lazy: true },
        agreeProcessing: { sameAs: sameAs(true) },
      },
    };
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  methods: {
    ...mapMutations({
      setFirstName: "technicalSupport/setFirstName",
      setLastName: "technicalSupport/setLastName",
      setThirdName: "technicalSupport/setThirdName",
      setEmail: "technicalSupport/setEmail",
      setIsOpened: "technicalSupport/setIsOpened",
      setQuestion: "technicalSupport/setQuestion",
      setAgreeProcessing: "technicalSupport/setAgreeProcessing"
    }),
    ...mapActions({
      sendQuestion: "technicalSupport/sendQuestion",
    }),
    async submitButton() {
      console.log("************* submit");
      await this.v$.technicalSupportFormData.firstName.$touch();
      await this.v$.technicalSupportFormData.lastName.$touch();
      await this.v$.technicalSupportFormData.thirdName.$touch();
      await this.v$.technicalSupportFormData.email.$touch();
      await this.v$.technicalSupportFormData.question.$touch();
      await this.v$.technicalSupportFormData.agreeProcessing.$touch();
      const isValid = await this.v$.technicalSupportFormData.$validate();
      console.log(isValid);
      if (!isValid) {
        alert("Неправильно заполнены поля формы");
      } else {
        this.sendQuestion();
      }
    },
  },
  computed: {
    ...mapState({
      technicalSupportFormData: (state) =>
        state.technicalSupport.technicalSupportFormData,
    }),
  },
};
</script>

<style>
.popup_wrapper {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
</style>