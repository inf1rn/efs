<template>
  <div class="popup-new popup_form-detail_info">
    <div class="popup__content">
      <div class="popup__body">
        <div class="popup__close"></div>
        <div class="popup__body-wrap body-wrap">
          <div class="body-wrap__top">
            <div class="body-wrap__image">
              <img :src="imageSrc" alt="user-ava" />
            </div>
            <a href="#" class="filter__edit-link body-wrap__edit_link"
              >Редактировать</a
            >
          </div>
          <div class="body-wrap__content">
            <div class="body-wrap__line">
              <div class="body-wrap__label">ФИО</div>
              <div class="body-wrap__info">Ситников Касьян Витальевич</div>
            </div>
            <div class="body-wrap__line">
              <div class="body-wrap__label">Email</div>
              <div class="body-wrap__info">sitnikov@gmail.com</div>
            </div>
            <div class="body-wrap__line">
              <div class="body-wrap__label">Роль</div>
              <div class="body-wrap__info">Руководитель</div>
            </div>
            <div class="body-wrap__line">
              <div class="body-wrap__label">Место работы</div>
              <div class="body-wrap__info">
                Мирнинский политехнический институт
              </div>
            </div>
            <div class="body-wrap__line">
              <div class="body-wrap__label">Должность</div>
              <div class="body-wrap__info">Методист</div>
            </div>
            <div class="body-wrap__line">
              <div class="body-wrap__label">Регион</div>
              <div class="body-wrap__info">Республика Саха (Якутия)</div>
            </div>
            <div class="body-wrap__line">
              <div class="body-wrap__label">Город</div>
              <div class="body-wrap__info">Мирный</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "@/assets/images/avatar.jpg"
export default {
  computed: {
    imageSrc: function () {
      const image = this.userData?.image;
      return image && image !== 'null' ? image : avatar;
    },
  }
}
</script>

