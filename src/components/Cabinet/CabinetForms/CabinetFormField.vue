<template>
  <div class="spollers__item">
    <button
      type="button"
      class="spollers__title"
      :class="isFieldActive ? '_spoller-active' : ''"
      @click="isFieldActive = !isFieldActive"
    >
      <div class="spollers__title-edit">
        <ul>
          <li>
            <a @click.stop.prevent="$emit('duplicate-field', field)" href="#"
              >Дублировать</a
            >
          </li>
          <!--
          <li>
            <a @click.stop.prevent="$emit('toggle-enabled-field', field.id)" href="#">{{
              field.enabled ? "Выключить" : "Включить"
            }}</a>
          </li>
          -->
          <li @click.stop.prevent="$emit('delete-field', field.id)">
            <a href="#">Удалить</a>
          </li>
          <!--
          <li>
            <a href="#">Вверх</a>
          </li>
          -->
          <!--
          <li>
            <a href="#">Вниз</a>
          </li>
          -->
        </ul>
      </div>
      <span>{{ fieldTitle }}</span>
    </button>
    <div class="spollers__body" :hidden="!isFieldActive">
      <div class="spollers__body-wrap">
        <div class="spollers__body-line">
          <div class="spollers__body-caption">заголовок</div>
          <div class="spollers__body-info">
            <input
              @input="
                (e) =>
                  $emit('changeFieldTitle', {
                    id: field.id,
                    title: e.target.value,
                  })
              "
              autocomplete="off"
              type="text"
              name="form[]"
              placeholder="ОКПО"
              class="spollers__body-input"
              :value="field.title"
            />
          </div>
        </div>
        <div class="spollers__body-line">
          <div class="spollers__body-caption">Подсказка</div>
          <div class="spollers__body-info">
            <input
              @input="
                (e) =>
                  $emit('changeFieldDescription', {
                    id: field.id,
                    description: e.target.value,
                  })
              "
              :value="field.description"
              autocomplete="off"
              type="text"
              name="form[]"
              placeholder="Общероссийский классификатор предприятий и организаций"
              class="spollers__body-input"
            />
          </div>
        </div>
        <div class="spollers__body-line">
          <div class="spollers__body-caption">тип поля</div>
          <div class="spollers__body-info">
            <select
              class="form__select form__select_theme_white"
              style="width: 220px"
              :value="field.type"
              @change="
                (e) =>
                  $emit('changeFieldType', {
                    id: field.id,
                    type: e.target.value,
                  })
              "
            >
              <option value="string">Строковый</option>
              <option value="integer">Числовой</option>
            </select>
          </div>
        </div>
        <div class="spollers__body-line">
          <div class="checkbox form-group">
            <input
              :checked="field.required"
              type="checkbox"
              :id="'chk' + field.id"
              @change="
                (e) =>
                  $emit('changeFieldRequired', {
                    id: field.id,
                    required: e.target.checked,
                  })
              "
            />
            <label :for="'chk' + field.id">Обязательное для заполнения</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "cabinet-form-field",
  props: {
    field: Object,
    fieldTitle: String,
  },
  data() {
    return {
      isFieldActive: false,
    };
  },
};
</script>