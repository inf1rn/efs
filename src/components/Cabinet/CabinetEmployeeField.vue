<template>
  <div class="spollers__item">
    <button
      type="button"
      :class="{ '_spoller-active': isFieldActive }"
      @click="isFieldActive = !isFieldActive"
      class="spollers__title"
    >
      <span>{{ employee.position ? employee.position : "Новый сотрудник" }}</span>
    </button>
    <div class="spollers__body" v-if="isFieldActive">
      <div class="spollers__body-wrap">
        <div class="spollers__body-line">
          <div class="spollers__body-caption form__label-two">Должность</div>
          <div class="spollers__body-info">
            <input
              autocomplete="off"
              type="text"
              name="form[]"
              class="spollers__body-input form-input__border"
              :value="employee.position"
              @input="$emit('change-employee-position', $event.target.value)"
            />
          </div>
        </div>
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
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "cabinet-employee-field",
  data() {
    return {
      isFieldActive: false,
    };
  },
  props: {
    employee: Object,
  },
};
</script>