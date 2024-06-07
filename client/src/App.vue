<template>
  <TheHeader />

  <main>
    <div class="container">
      <input type="text" class="search-input" v-model="searchInput" placeholder="Поиск">

      <div class=" cards">
        <CardInShop v-for="product of filteredProducts" :product />
        <div v-if="filteredProducts.length === 0 && isLoad" class="nothing-found">
          Пусто :(
        </div>
      </div>
    </div>
  </main>

  <TheFooter />


</template>

<script setup lang="ts">

import { ref, computed, watch } from 'vue';

import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import CardInShop from './components/CardInShop.vue';

import { Product } from './types.ts';
import { useStore } from './store.ts'
import { useUser } from 'vue-clerk';

const { isLoaded, user, isSignedIn } = useUser()

watch(isLoaded, async () => {
  if (isSignedIn.value && user.value) {
    useStore().loadCart(user.value.id)
    useStore().isAdmin = !!user.value.organizationMemberships[0]?.role
    useStore().userId = user.value.id
  }
})

const searchInput = ref('')
const products = ref<Product[]>([]);
const isLoad = ref(false)

fetch('http://localhost:3000/getProducts').then(response => response.json()).then(data => {
  products.value = data
  isLoad.value = true
})

const filteredProducts = computed(() => {
  console.log(products.value[0]?.title.toLowerCase())
  console.log(searchInput.value.toLowerCase())
  return products.value.filter(i => i.title.toLowerCase().includes(searchInput.value.toLowerCase()))
})

</script>

<style scoped>
.nothing-found {
  font-size: 30px;
  margin-top: 50px;
}

.cards {
  display: flex;
  padding: 10px 0;
  gap: 50px 25px;
  flex-wrap: wrap;
  justify-content: center;
}

.search-input {
  width: 100%;
  padding: 5px 15px;
  outline: none;
  border: none;
  border-bottom: 1px solid #E5E5E5;
  background: none;
  color: #E5E5E5;
  font-size: 20px;
  margin: 0 auto;
  margin-bottom: 20px;
}
</style>