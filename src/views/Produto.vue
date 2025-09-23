<template>
  <section>
    <div v-if="produto" class="produto">
      <div class="fotos">
        <img
          v-if="fotoAtiva"
          :src="fotoAtiva.src"
          :alt="fotoAtiva.titulo"
          class="foto-principal"
        />
        <ul class="miniaturas" v-if="produto.fotos && produto.fotos.length > 1">
          <li
            v-for="foto in produto.fotos"
            :key="foto.src"
            @click="trocarFoto(foto)"
            :class="{ ativa: fotoAtiva && foto.src === fotoAtiva.src }"
          >
            <img :src="foto.src" :alt="foto.titulo" />
          </li>
        </ul>
      </div>

      <div class="info">
        <h1>{{ produto.nome }}</h1>
        <p class="preco">{{ produto.preco | numeroPreco }}</p>
        <p class="descricao">{{ produto.descricao }}</p>
        <transition mode="out-in" v-if="produto.vendido === 'false'">
          <button class="btn" @click="adicionarAoCarrinho">
            Adicionar ao Carrinho
          </button>
        </transition>
        <button v-else class="btn btn-disabled" disabled>
          Produto Vendido
        </button>
      </div>
    </div>
    <PaginaCarregando v-else />
  </section>
</template>

<script>
import { api } from "@/services.js";

export default {
  name: "Produto",
  props: ["id"],

  data() {
    return {
      produto: null,
      fotoAtiva: null,
    };
  },
  methods: {
    getProduto() {
      api.get(`/produto/${this.id}`).then((response) => {
        this.produto = response.data;
        document.title = this.produto.nome;

        if (this.produto.fotos && this.produto.fotos.length > 0) {
          this.fotoAtiva = this.produto.fotos[0];
        }
      });
    },
    adicionarAoCarrinho() {
      this.$store.commit("ADICIONAR_ITEM", this.produto);
      this.$router.push({ name: "carrinho" });
    },
    trocarFoto(foto) {
      this.fotoAtiva = foto;
    },
  },
  created() {
    this.getProduto();
  },
};
</script>

<style scoped>
.produto {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}

.preco {
  color: #e80;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.descricao {
  font-size: 1.2rem;
}

.btn {
  margin-top: 60px;
  width: 200px;
}

.fotos {
  grid-row: 1 / 3;
}

.foto-principal {
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  margin-bottom: 20px;
}

.miniaturas {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 10px;
}

.miniaturas li {
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.miniaturas li:hover,
.miniaturas li.ativa {
  border-color: #568f87;
  transform: scale(1.1);
}

.info {
  position: sticky;
  top: 20px;
}

@media screen and (max-width: 500px) {
  .produto {
    grid-template-columns: 1fr;
  }
  .fotos {
    grid-row: 2;
  }
  .info {
    position: initial;
  }
}
</style>
