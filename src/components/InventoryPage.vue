<template>
  <h3>Im Lager vorhanden</h3>
  <div class="vertical">
    <LoaderAnimation v-if="showLoader"/>
    <div v-else>
      <span class="saved" v-if="saved">... gespeichert</span>
      <div class="products" id="product-list">
        <div v-for="product in products" :class="'product ' + getProductClass(product)" :id="'prod-' + product.id" :key="product.id">
          <span class="name" v-text="product.name"></span><br/>
          <div class="amount">
            <span v-text="getDim(product.dim)" class="dim"></span>
            <span>
            <font-awesome-icon class="button" icon="fa-circle-plus" @click="changeQty(product.id, true)"/>
              </span>
            <span class="qty" v-text="product.qty"></span>
            <span>
            <font-awesome-icon class="button" icon="fa-circle-minus" @click="changeQty(product.id, false)"/>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import LoaderAnimation from "@/components/LoaderAnimation";

export default {
  name: "InventoryPage",
  components: {FontAwesomeIcon, LoaderAnimation},
  mounted() {
    this.getProducts();
  },
  data: function () {
    return {
      products: [],
      saveTimeout: 0,
      saved: false,
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
          console.log(this.products)
        } else {
          console.log("Server returned " + response.status + " : " + response.statusText);
        }
      });
    },
    changeQty(id, incr = true) {
      let arrId = this.products.findIndex(e => {
        return e.id == id
      });
      if (incr) this.products[arrId].qty++;
      else this.products[arrId].qty--;
      this.products[arrId].changed = true;
      window.clearTimeout(this.saveTimeout);
      this.saveTimeout = window.setTimeout(e => {
        if (!e || e) this.updateProduct(id, arrId);
      }, 2000);
    },
    updateProduct(id, arrId) {
      axios.put(this.apibase + '/product/' + id, {qty: this.products[arrId].qty}, {
        headers: {
          'Token': localStorage.getItem('token'),
          'content-type': 'application/json',
        }
      }).then(response => {
        if (response.status === 200) {
          this.saved = true;
          window.setTimeout(() => {
            this.saved = false;
          }, 2000);
        }
      });
    },
    getDim(dim) {
      switch (dim) {
        case 'pckg':
          return 'Packungen';
        case 'pcs':
          return 'Stück';
        case 'kg':
          return 'Kilo';
        case 'g':
          return 'Gramm';
      }
    },
    getProductClass(product) {
      console.log(product.qty+'/'+product.qty_desired)
      console.log(Number(product.qty) + 5 <= product.qty_desired)
      if (product.qty == 0) return 'alert';
      if (Number(product.qty) + 5 <= product.qty_desired) return 'warn';
      return 'ok';
    },
  },
}
</script>

<style>
.products {
  font-size: 1.3em;
}

.product {
  background: darkgrey;
  border-radius: 20px;
  padding: .7em;
  margin: .5em auto;
  width: 75vw;
  border-style: inset;
  border-left: 20px solid;
  border-bottom: none;
  border-top: none;
  border-right: none;
}

.amount {
  align-items: center;
  margin-top: .5em;
  display: flex;
  justify-content: end;
}

.amount>span {
  margin: auto .2em;
}

.product .qty {
  text-align: center;
}

.product .dim {
  font-size: .7em;
}

.product button {
  border-radius: 50px;
  font-size: 1.4em;
  line-height: .5em;
  padding: 0;
}

.wrapper {
  position: relative;
}

.saved {
  font-size: .9em;
  position: absolute;
}

.product.ok {
  border-color: green;
}

.product.warn {
  border-color: yellow;
}

.product.alert {
  border-color: red;
}
</style>