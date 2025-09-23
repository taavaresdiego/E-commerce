<template>
  <section>
    <div v-if="carrinho.length > 0" class="carrinho">
      <h1>Seu Carrinho</h1>
      <ul class="carrinho-lista">
        <li
          v-for="(item, index) in carrinho"
          :key="index"
          class="carrinho-item"
        >
          <p>{{ item.nome }}</p>
          <p class="preco">{{ item.preco | numeroPreco }}</p>
          <button @click="removerItem(item.id)" class="btn-remover">
            Remover
          </button>
        </li>
      </ul>
      <div class="carrinho-total">
        <p>
          Total: <span>{{ total | numeroPreco }}</span>
        </p>
      </div>
      <router-link to="/usuario/comprar" class="btn"
        >Finalizar Compra</router-link
      >
    </div>
    <div v-else class="carrinho-vazio">
      <h2>Seu carrinho está vazio.</h2>
      <router-link to="/" class="btn">Ver Produtos</router-link>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Carrinho",
  computed: {
    ...mapState(["carrinho"]),
    total() {
      return this.carrinho.reduce((acc, item) => {
        return acc + Number(item.preco);
      }, 0);
    },
  },
  methods: {
    removerItem(itemId) {
      this.$store.commit("REMOVER_ITEM", itemId);
    },
  },
};
</script>

<style scoped>
.carrinho {
  max-width: 800px;
  margin: 60px auto;
}
.carrinho-item {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
.carrinho-total {
  text-align: right;
  margin: 20px 0;
  font-size: 1.2rem;
  font-weight: bold;
}
.carrinho-vazio {
  text-align: center;
  margin: 80px auto;
}
.btn-remover {
  border: none;
  background: #f73;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
