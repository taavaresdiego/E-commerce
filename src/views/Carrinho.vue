<template>
  <section>
    <div v-if="carrinho.length > 0" class="carrinho">
      <h1>Seu Carrinho</h1>
      <ul class="carrinho-lista">
        <li v-for="item in carrinho" :key="item.id" class="carrinho-item">
          <div class="item-info">
            <p>{{ item.nome }}</p>
            <p class="preco">{{ item.preco | numeroPreco }}</p>
          </div>
          <div class="item-quantidade">
            <button @click="diminuirQuantidade(item.id)">-</button>
            <span>{{ item.quantidade }}</span>
            <button @click="aumentarQuantidade(item.id)">+</button>
          </div>
          <p class="subtotal">
            {{ (item.preco * item.quantidade) | numeroPreco }}
          </p>
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
      <router-link :to="{ name: 'comprar' }" class="btn"
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
import { mapState, mapMutations } from "vuex";

export default {
  name: "Carrinho",
  computed: {
    ...mapState(["carrinho"]),
    total() {
      return this.carrinho.reduce((acc, item) => {
        return acc + item.preco * item.quantidade;
      }, 0);
    },
  },
  methods: {
    ...mapMutations(["REMOVER_ITEM", "ATUALIZAR_QUANTIDADE_ITEM"]),
    removerItem(itemId) {
      this.REMOVER_ITEM(itemId);
    },
    aumentarQuantidade(itemId) {
      const item = this.carrinho.find((item) => item.id === itemId);
      if (item) {
        this.ATUALIZAR_QUANTIDADE_ITEM({
          itemId,
          quantidade: item.quantidade + 1,
        });
      }
    },
    diminuirQuantidade(itemId) {
      const item = this.carrinho.find((item) => item.id === itemId);
      if (item && item.quantidade > 1) {
        this.ATUALIZAR_QUANTIDADE_ITEM({
          itemId,
          quantidade: item.quantidade - 1,
        });
      } else if (item && item.quantidade === 1) {
        this.removerItem(itemId);
      }
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
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 20px;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
}
.item-info {
  display: flex;
  flex-direction: column;
}
.preco {
  color: #e80;
  font-weight: bold;
}
.item-quantidade {
  display: flex;
  align-items: center;
}
.item-quantidade span {
  padding: 0 10px;
}
.item-quantidade button {
  border: 1px solid #ccc;
  background: #f7f7f7;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 1rem;
}
.subtotal {
  font-weight: bold;
  text-align: right;
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
