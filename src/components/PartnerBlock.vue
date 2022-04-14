<template>
  <li class="partner-logos__item">
    <a :href="partnerInfo.link" class="partner-logos__link" target="_blank">
      <img
        :src="partnerInfo.logo"
        :alt="partnerInfo.title"
        class="partner-logos__image"
      />
    </a>
  </li>
</template>
<script>
export default {
  name: "PartnerBlock",
  props: {
    partnerInfo: Object,
  },
};
</script>