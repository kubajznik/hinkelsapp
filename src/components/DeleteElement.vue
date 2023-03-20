<template>
<div class="vertical">
  <span v-text="element + ' wirklich löschen?'"></span>
  <div>
    <div class="form-line">
      <button @click="deleteElement()">Löschen</button>
      <button @click="this.$router.back()">Abbrechen</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "DeleteElement",
  props: {
    element: String,
    id: String,
  },
  methods: {
    deleteElement() {
      axios.delete(this.apibase + '/' + this.element + '/' + this.id, {
        headers: {
          'Token': localStorage.getItem('token'),
        }
      }).then(response => {
        if (response.status === 200) {
          this.$router.back();
        } else {
          console.log("Server returned " + response.status + " : " + response.statusText);
        }
      });
    }
  }
}
</script>

<style scoped>

</style>