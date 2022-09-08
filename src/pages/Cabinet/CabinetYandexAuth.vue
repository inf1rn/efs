<template>Авторизация Яндекс</template>
<script>
import { setCookie } from "@/utils/cookie";
import { createNamespacedHelpers } from "vuex";

const { mapActions: mapActionsAccount } = createNamespacedHelpers("account");
const { mapState: mapStateAuth } = createNamespacedHelpers("auth");
export default {
  name: "cabinet-yandex-auth",
  methods: {
    ...mapActionsAccount(["getUser"]),
  },
  computed: {
    ...mapStateAuth({
      auth: (state) => state.auth,
    }),
  },
  watch: {
    auth: {
      handler(value) {
        console.log(value);

        if (this.$route.query.new) {
          alert(
            "Личный кабинет создан, пожалуйста, ожидайте одобрения от администратора системы"
          );
        }

        if (value) {
          this.$router.push("/cabinet");
        }
      },
      immediate: true,
    },
  },
  created() {
    setCookie("jwt", this.$route.query.jwt);
    setCookie("user_id", this.$route.query.id);

    this.getUser();
  },
};
</script>
