<template>
  <input
    type="text"
    name="search"
    :class="
      inputClasses ||
      `form__input-edit
        form__input-edit_type_search
        form__input-edit_width_full`
    "
    :placeholder="inputPlaceholder || ''"
    :value="inputValue"
    id="search"
    @input="search"
  />
</template>
<script>
export default {
  name: "search-input",
  props: {
    inputPlaceholder: String,
    inputClasses: String,
    inputValue: [String, Number],
  },
  data() {
    return {
      timer: null,
    };
  },
  methods: {
    search(e) {
      this.$emit("input", e.target.value)
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        this.$emit("search", e.target.value);
      }, 500);
    },
  },
};
</script>