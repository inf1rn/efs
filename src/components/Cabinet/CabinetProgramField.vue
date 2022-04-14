<template>
  <div class="admin_subject-edit__block block_white">
    <div class="spollers__title-edit">
      <ul>
        <li @click.prevent="$emit('duplicate-program', program)">
          <a href="#">Дублировать</a>
        </li>
        <li @click.prevent="$emit('delete-program', program.id)">
          <a href="javascript:;">Удалить</a>
        </li>
        <li>
          <a href="#">Вверх</a>
        </li>
        <li>
          <a href="#">Вниз</a>
        </li>
      </ul>
    </div>
    <div class="admin_subject-edit_tabs-form__line form__item">
      <div class="admin_subject-edit_tabs-form__content">
        <div class="form__item-row">
          <label for="adminSubjectNameProgramm" class="form__label-two"
            >Название программы</label
          >
          <input
            type="text"
            class="spollers-body__input form-input__border"
            id="adminSubjectEditName"
            placeholder="Введите название программы"
            :value="program.title"
            @input="$emit('change-program-title', $event.target.value)"
          />
        </div>
        <div class="form__item-row">
          <label for="adminSubjectEditName" class="form__label-two"
            >Ссылка на программу</label
          >
          <input
            type="text"
            class="spollers-body__input form-input__border"
            id="adminSubjectEditName"
            placeholder="Введите ссылку на программу"
            :value="program.link"
            @input="$emit('change-program-link', $event.target.value)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "cabinet-program-field",
  props: {
    program: Object,
  },
};
</script>