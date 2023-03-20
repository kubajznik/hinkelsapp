<template>
  <div class="vertical">
    <h2>Neues Produkt anlegen</h2>
    <form id="product-form" method="POST">
      <div class="form-line">
        Bezeichnung
        <input type="text" v-model="name" id="user" name="name">
      </div>
      <div class="form-line">
        Gewünschter Bestand
        <input type="number" v-model="qty_desired" name="qty_desired"/>
      </div>
      <div class="form-line">
        Dimension
        <select name="dim" v-model="dim">
          <option value="pcs">Stück</option>
          <option value="pckg">Packungen</option>
          <option value="g">Gramm</option>
          <option value="kg">Kilogramm</option>
        </select>
      </div>
      <div class="form-line">
        <input type="submit" value="Speichern" v-on:click.prevent="submitForm()">
        <button @click="this.$router.push('/products')">Abbrechen</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddProduct",
  data: function () {
    return {
      name: '',
      qty_desired: '',
      dim: '',
    }
  },
  methods: {
    submitForm() {
      let formData = new FormData;
      formData.append('name', this.name);
      formData.append('qty_desired', this.qty_desired);
      formData.append('dim', this.dim);

      axios.post(this.apibase + '/product', formData, {
        headers: {
          'Token': localStorage.getItem('token'),
        }
      })
          .then(() => {
            this.$router.push('/products');
          })
          .catch((error) => {
            // error.response.status Check status code
            console.log(error);
          });
    },
    resetForm() {
      this.name = false;
      this.qty_desired = '';
      this.dim = '';
    }
  }
}
</script>

<style scoped>

</style>