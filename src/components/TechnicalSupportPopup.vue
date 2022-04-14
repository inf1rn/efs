<template>
  <div class="popup page__popup-support popup_active">
    <button @click="() => setIsOpened(false)" class="popup__close-btn"></button>
    <h2 class="popup__title">Служба поддержки</h2>
    <form @submit.prevent class="form">
      <fieldset class="form__fieldset">
        <div class="form__two-columns">
          <div class="form__item">
            <label for="support-lastname" class="form__label">Фамилия</label>
            <input
              @input="(e) => setLastName(e.target.value)"
              :value="lastName"
              type="text"
              name="support-lastname"
              class="form__input-edit form__input-edit_el_support-lastname"
              id="support-lastname"
            />
          </div>
          <div class="form__item">
            <label for="support-name" class="form__label">Имя</label>
            <input
              @input="(e) => setFirstName(e.target.value)"
              :value="firstName"
              type="text"
              name="support-name"
              class="form__input-edit form__input-edit_el_support-name"
              id="support-name"
            />
          </div>
          <div class="form__item">
            <label for="support-secondname" class="form__label">Отчество</label>
            <input
              @input="(e) => setThirdName(e.target.value)"
              :value="thirdName"
              type="text"
              name="support-secondname"
              class="form__input-edit form__input-edit_el_support-secondname"
              id="support-secondname"
            />
          </div>
          <div class="form__item">
            <label for="support-email" class="form__label">E-mail</label>
            <input
              @input="(e) => setEmail(e.target.value)"
              :value="email"
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
            @input="(e) => setQuestion(e.target.value)"
            :value="question"
            name="support-question"
            class="form__textarea form__textarea_el_support-question"
            id="support-question"
          ></textarea>
        </div>
      </fieldset>
      <fieldset class="form__fieldset form__fieldset_type_button-area">
        <button
          @click="sendQuestion"
          type="submit"
          class="button button_theme_green button_border_rounded form__submit"
        >
          Отправить
        </button>
      </fieldset>
    </form>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "TechnicalSupportPopup",
  methods: {
    ...mapMutations({
      setFirstName: "technicalSupport/setFirstName",
      setLastName: "technicalSupport/setLastName",
      setThirdName: "technicalSupport/setThirdName",
      setEmail: "technicalSupport/setEmail",
      setIsOpened: "technicalSupport/setIsOpened",
      setQuestion: "technicalSupport/setQuestion",
    }),
    ...mapActions({
      sendQuestion: "technicalSupport/sendQuestion",
    }),
  },
  computed: {
    ...mapState({
      firstName: (state) =>
        state.technicalSupport.technicalSupportFormData.firstName,
      lastName: (state) =>
        state.technicalSupport.technicalSupportFormData.lastName,
      thirdName: (state) =>
        state.technicalSupport.technicalSupportFormData.thirdName,
      email: (state) => state.technicalSupport.technicalSupportFormData.email,
      question: (state) =>
        state.technicalSupport.technicalSupportFormData.question,
    }),
  },
};
</script>