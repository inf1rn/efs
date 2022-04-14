<template>
  <li class="stat-panels__item">
    <h3 class="stat-panels__title">{{ title }}</h3>
    <p class="stat-panels__num">{{ value }}</p>
  </li>
</template>
<script>
export default {
  name: "data-block",
  props: {
    title: String,
    value: Number,
  },
};
</script>