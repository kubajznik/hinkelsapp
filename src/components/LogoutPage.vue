<template>
<p>... logging out.</p>
</template>

<script>
export default {
  name: "LogoutPage",
  mounted() {
    localStorage.clear();
    this.$router.push('/login');
  }
}
</script>

<style scoped>

</style>