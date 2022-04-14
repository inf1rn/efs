<template>
  <div class="interactive__block" id="MapPopupInfo">
    <div class="interactive__body">
      <div class="interactive__header">
        <h4>{{ regionName }}</h4>
      </div>
      <div class="interactive__row">
        <div
          class="interactive__line"
          :key="statPart.code"
          v-for="statPart in regionStat"
        >
          <p>{{ statPart.title }}</p>
          <span>{{ statPart.value }}</span>
        </div>
      </div>
      <div class="interactive__link">
        <a
          href="#"
          @click.prevent="router.push(`${baseUrl}/subjects/${regionId}`)"
          >Подробная статистика по региону</a
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "map-popup-info",
  props: {
    regionStat: Object,
    regionId: Number,
    regionName: String,
    router: Object,
    baseUrl: String,
  },
};
</script>
