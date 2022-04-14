<template>
  <div class="popup-new popup_users_info--edit _active">
    <div class="popup__content">
      <div class="popup__body">
        <div class="popup__body-wrap body-wrap">
          <label class="body-wrap__comment">
            <div class="body-wrap__text">Добавить комментарий</div>
            <textarea
              @input="$emit('message-input', $event.target.value)"
              :value="message"
              class="body-wrap__error"
            ></textarea>
          </label>
          <div class="user_tabs-form__btn">
            <button
              type="submit"
              class="button button_theme_green button_border_small form__submit"
              @click="$emit('submit')"
            >
              Сохранить изменения
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "cabinet-form-result-decline-popup",
  props: {
    message: String,
  },
};
</script>