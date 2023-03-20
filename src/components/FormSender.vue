<template>
<span></span>
</template>

<script>
const form = document.querySelector('form');

export default {
  name: "FormSender",
  mounted() {
    form.addEventListener("submit", event => {
      event.preventDefault();
      this.sendData();
    });
  },
  methods: {
    sendData(e) {
      console.log('formsender')
      e.preventDefault();
      const XHR = new XMLHttpRequest();
      const FormData = new FormData(form)

      // Define what happens on successful data submission
      XHR.addEventListener("load", (event) => {
        alert(event.target.responseText);
      });

      // Define what happens in case of error
      XHR.addEventListener("error", () => {
        alert('Oops! Something went wrong.');
      });

      // Set up our request
      XHR.open("POST", this.apibase + "/user/login");

      // The data sent is what the user provided in the form
      XHR.send(FormData);
    }
  },

}
</script>

<style scoped>

</style>