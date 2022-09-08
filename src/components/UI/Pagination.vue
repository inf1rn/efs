<template>
  <div class="table-pagination">
    <div class="table-pagination__count">
      {{ firstItemNumber }}-{{ lastItemNumber }} из {{ paginationData?.total }}
    </div>
    <div class="table-pagination__bullets">
      <button class="bullets-left _disabled" @click.prevent="$emit('prev')">
        <img src="@/assets/images/table-pagination/left.svg" alt="left" />
      </button>
      <button class="bullets-right" @click.prevent="$emit('next')">
        <img src="@/assets/images/table-pagination/right.svg" alt="right" />
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "pagination",
  props: {
    paginationData: Object,
  },
  computed: {
    firstItemNumber() {
      if (!this.paginationData) {
        return;
      }
      const { current_page, per_page } = this.paginationData;
      return (current_page - 1) * per_page + 1;
    },
    lastItemNumber() {
      if (!this.paginationData) {
        return;
      }
      const { current_page, count } = this.paginationData;
      return this.firstItemNumber + count - 1;
    },
  },
};
</script>