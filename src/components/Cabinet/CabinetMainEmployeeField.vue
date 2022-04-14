<template>
  <div class="spollers__item mb-3">
    <button
      type="button"
      :class="{ '_spoller-active': isFieldActive }"
      @click="isFieldActive = !isFieldActive"
      class="spollers__title"
    >
      <span>{{ employee.position }}</span>
    </button>
    <div class="spollers__body" v-if="isFieldActive">
      <div class="spollers__body-wrap">
        <div class="spollers__body-line">
          <div class="spollers__body-caption form__label-two">ФИО</div>
          <div class="spollers__body-info">
            <input
              autocomplete="off"
              type="text"
              name="form[]"
              class="spollers__body-input form-input__border"
              :value="employee.name"
              @input="$emit('change-employee-name', $event.target.value)"
            />
          </div>
        </div>
        <div class="spollers__body-line">
          <div class="spollers__body-caption form__label-two">Описание</div>
          <div class="spollers__body-info">
            <input
              autocomplete="off"
              type="text"
              name="form[]"
              class="spollers__body-input form-input__border"
              :value="employee.description"
              @input="$emit('change-employee-description', $event.target.value)"
            />
          </div>
        </div>
        <div class="spollers__body-line">
          <button
            class="
              button
              button_theme_green--empty
              button_border_small
              form__submit
            "
            @click="downoloadFile()"
          >
            Загрузить фото
          </button>
          <input
            type="file"
            ref="downoloadImageInput"
            @change="$emit('change-employee-img', $event.target.files[0])"
            hidden
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "cabinet-main-employee-field",
  data() {
    return {
      isFieldActive: false,
    };
  },
  methods: {
    downoloadFile() {
      this.$refs.downoloadImageInput.click();
    },
  },
  props: {
    employee: Object,
  },
};
</script>