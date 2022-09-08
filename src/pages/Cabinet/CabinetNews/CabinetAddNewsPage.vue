<template>
  <main class="content content_cabinet">
    <section class="add-news page__section">
      <h1 class="section-title mb-50">Добавить новость</h1>
      <form @submit.prevent class="add-news__wrapper form">
        <div class="add-news__row">
          <div class="add-news__line form__item">
            <div class="d-flex">
              <div class="mr-5">
                <label for="addNewsType" class="add-news__caption form__label"
                  >Тип новости</label
                >
                <select
                  @change="(e) => setNewsType(e.target.value)"
                  @input="v$.newsType.$touch()"
                  :value="newsType"
                  class="form__select form__select_theme_white"
                  :class="{
                    invalid: v$.newsType.$error,
                  }"
                  id="addNewsType"
                >
                  <option class="select__option" value="" hidden>
                    Выберите тип новости
                  </option>
                  <option class="select__option" value="general">
                    Общая
                  </option>
                  <option class="select__option" value="regional">
                    Региональная
                  </option>
                </select>
              </div>
              <div v-if="newsType === 'regional'">
                <label for="addNewsTheme" class="add-news__caption form__label"
                  >Регион</label
                >
                <select
                  @change="(e) => setNewsRegion(e.target.value)"
                  :value="newsRegion"
                  class="form__select form__select_theme_white"
                >
                  <option class="select__option" value="" selected hidden>
                    Выберите регион
                  </option>
                  <option
                    v-for="region in regions"
                    :value="region.id"
                    :key="region.id"
                    class="select__option"
                  >
                    {{ region.title }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="add-news__line form__item">
            <label for="addNewsTheme" class="add-news__caption form__label"
              >Заголовок</label
            >
            <input
              @input="(e) => setNewsTitle(e.target.value)"
              @change="v$.newsTitle.$touch"
              :value="newsTitle"
              type="text"
              class="form__input-edit form__input-edit_width_full"
              :class="{
                invalid: v$.newsTitle.$error,
              }"
              id="addNewsTheme"
              placeholder="Заголовок новости"
            />
          </div>
          <div class="add-news__line form__item">
            <label for="addNewsImage" class="add-news__caption form__label"
              >Фото превью</label
            >
            <a @click="$refs.downoloadImageInput.click();v$.newsPreviewImage.$touch()" href="#"
              :class="{
                invalid: v$.newsPreviewImage.$error,
              }"
            >
              <img src="@/assets/images/add-news__downoload-image.png" />
            </a>
            <input
              hidden
              type="file"
              @change="(e) => setNewsPreviewImage(e.target.files[0])"
              id="addNewsImage"
              ref="downoloadImageInput"
            />
          </div>
          <div class="add-news__line form__item">
            <img
              :style="{ height: '200px', width: auto }"
              v-if="newsPreviewImage"
              :src="newsPreviewImageBlob"
            />
          </div>
          <div class="add-news__line form__item">
            <label for="addNewsDate" class="add-news__caption form__label"
              >Дата публикации</label
            >
            <input
              @input="(e) => setNewsDate(e.target.value)"
              :value="newsDate"
              type="date"
              class="form__input-edit add-news__form_date"
              :class="{
                invalid: v$.newsDate.$error,
              }"
              @change="v$.newsDate.$touch()"
              id="addNewsDate"
              placeholder="31.10.2020"
            />
          </div>
          <div class="add-news__line form__item"
            :class="{
              invalid: v$.newsContentHTML.$error,
            }"
          >
            <label for="addNewsText" class="add-news__caption form__label"
              >Текст статьи
            </label>
            <QuilEditor
              :content="newsContentHTML"
              contentType="html"
              @textChange="
                () => {
                  setNewsContentText($refs.editor.getText());
                  setNewsContentHTML($refs.editor.getHTML());
                }
              "
              ref="editor"
              theme="snow"
            />
          </div>
          <div class="add-news__line form__item form__item-line_add_news">
            <div class="form__item-left">
              <label for="addNewsTags" class="add-news__caption form__label"
                >Категория</label
              >
            </div>
            <div class="form__item-tags">
              <input
                @keydown.enter="(e) => setNewsCategoryHandler(e.target.value)"
                :value="newsCategory"
                type="text"
                class="form__input-edit"
                id="addNewsTags"
                placeholder="Введите категорию и нажмите Enter"
              />
              <ul class="tags tags_direct_row news-detail__categories">
                <li
                  class="tags__item"
                  v-for="category in categories"
                  :key="category"
                >
                  {{ category }}
                  <a
                    @click.prevent="
                      (e) => {
                        deleteCategory(category);
                      }
                    "
                    href="#"
                  >
                    <img src="@/assets/images/close_tags.svg" alt="svg_close"
                  /></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="add-news__line form__item">
            <button
              @click.prevent="(e) => saveNewsHandler()"
              type="button"
              class="button button_theme_green button_border_small form__submit"
            >
              Опубликовать
            </button>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapMutations: mapMutationsAddNews,
  mapState: mapStateAddNews,
  mapActions: mapActionsAddNews,
} = createNamespacedHelpers("news/addNews");
const { mapState: mapStateLocation } = createNamespacedHelpers("location");

import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "cabinet-add-news-page",
  title: "Создать новость",
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      newsTitle: { required, $lazy: true },
      newsDate: { required, $lazy: true },
      newsType: { required, $lazy: true },
      newsPreviewImage: { required, $lazy: true },
      newsContentHTML: { required, $lazy: true },
    }
  },
  computed: {
    ...mapStateAddNews({
      newsContentHTML: (state) => state.news.contentHTML,
      newsTitle: (state) => state.news.title,
      newsDate: (state) => state.news.date,
      newsCategory: (state) => state.news.category,
      newsType: (state) => state.news.type,
      newsRegion: (state) => state.news.region,
      newsPreviewImage: (state) => state.news.previewImage,
      categories: (state) => state.news.categories,
    }),
    ...mapStateLocation({
      regions: (state) => state.regions,
    }),
    newsPreviewImageBlob() {
      if (this.newsPreviewImage) {
        return URL.createObjectURL(
          new Blob([this.newsPreviewImage], { type: "image/*" })
        );
      }
      return this.newsPreviewImage;
    },
  },
  watch: {
    newsContentHTML() {
      this.v$.newsContentHTML.$touch()
    }
  },
  methods: {
    ...mapMutationsAddNews([
      "setNewsContentHTML",
      "setNewsContentText",
      "setNewsDate",
      "setNewsCategory",
      "setNewsTitle",
      "setNewsType",
      "setNewsPreviewImage",
      "setNewsRegion",
      "deleteCategory",
      "clearNews",
    ]),
    ...mapActionsAddNews(["saveNews"]),
    setNewsCategoryHandler(category) {
      if (!category || this.categories.includes(category)) {
        return;
      }
      this.setNewsCategory(category);
    },
    newsFormValidate() {
      if (!this.v$.newsTitle.$error
        && !this.v$.newsDate.$error
        && !this.v$.newsType.$error
        && !this.v$.newsPreviewImage.$error
        && !this.v$.newsContentHTML.$error) {
        return true
      }
      return false
    },
    async saveNewsHandler() {
      try {
        await this.v$.newsTitle.$touch()
        await this.v$.newsDate.$touch()
        await this.v$.newsType.$touch()
        await this.v$.newsPreviewImage.$touch()
        await this.v$.newsContentHTML.$touch()
        const isValid = this.newsFormValidate()
        if (isValid) {
          const response = await this.saveNews()
          this.clearNews();
          this.$refs.editor.setContents("");
          this.$nextTick(() => {
            this.v$.newsTitle.$reset()
            this.v$.newsDate.$reset()
            this.v$.newsType.$reset()
            this.v$.newsPreviewImage.$reset()
            this.v$.newsContentHTML.$reset()
          })
        } else {
          alert('Ошибка при заполении полей')
        }
      } catch (e) {
        console.log(e)
        alert('Ошибка при заполении полей')
      }
    },
  }
};
</script>

<style>
a.invalid img {
  outline: 2px solid red;
}
.form__item.invalid {
  outline: 2px solid red;
}
</style>