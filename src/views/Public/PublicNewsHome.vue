<template>
    <router-view :key="$route.fullPath"/>
</template>
<script>
    export default {
        name: "public-news"
    }
</script>