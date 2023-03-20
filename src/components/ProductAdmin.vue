<template>
  <div class="vertical">
    <font-awesome-icon icon="fa-circle-plus" @click="this.$router.push('/newproduct')" class="add"/>
    <LoaderAnimation v-if="showLoader"/>
    <div v-else v-for="p of products" :id="p.id" :key="p.id" :class="'product ' + getProductClass(p)">
      <div>
        <span v-text="p.name"></span>
        <br>
        <span v-text="p.qty + ' ' + p.dim + '/' + p.qty_desired + ' ' + p.dim"></span>
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-circle-minus" class="delete" @click="$router.push('/delete/product/' + p.id)"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoaderAnimation from "@/components/LoaderAnimation";

export default {
  name: "ProductAdmin",
  components: {
    LoaderAnimation,
  },
  data: function () {
    return {
      products: [],
      showLoader: true,
    }
  },
  methods: {
    getProducts() {
      axios.get(this.apibase + '/product', {
        headers: {
          'Token': localStorage.getItem('token'),
        }
      }).then(response => {
        if (response.status === 200) {
          for (let d of response.data) {
            this.products.push(d);
          }
          this.showLoader = false;
        } else {
          console.log("Server returned " + response.status + " : " + response.statusText);
        }
      });
    },
    getProductClass(product) {
      console.log(product.qty+'/'+product.qty_desired)
      console.log(Number(product.qty) + 5 <= product.qty_desired)
      if (product.qty == 0) return 'alert';
      if (Number(product.qty) + 5 <= product.qty_desired) return 'warn';
      return 'ok';
    }
  },

  mounted() {
    this.getProducts();
  }
}
</script>

<style scoped>
.product {
  background: darkgrey;
  border-radius: 20px;
  padding: 1em;
  margin: .5em auto .5em auto;
  display: flex;
  justify-content: space-between;
  min-width: 80vw;
}

.product > div:last-child {

  display: flex;
  justify-content: center;
  align-items: center;
}

.delete {
  font-size: 2em;
  color: red;
}

.delete:hover, .delete:active {
  font-weight: bold;
}

.add {
  font-size: 2em;
  color: green;
}
</style>