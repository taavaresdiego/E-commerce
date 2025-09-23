<template>
  <div class="filtros">
    <form class="busca">
      <input
        name="busca"
        id="busca"
        type="text"
        v-model="busca"
        placeholder="Buscar..."
      />
      <input
        type="submit"
        id="lupa"
        value="Buscar"
        @click.prevent="buscarProdutos"
      />
    </form>
    <div class="controles">
      <div class="categorias">
        <button
          @click="filtrarCategoria('')"
          :class="{ active: !categoriaAtiva }"
        >
          Todos
        </button>
        <button
          @click="filtrarCategoria('tecnologia')"
          :class="{ active: categoriaAtiva === 'tecnologia' }"
        >
          Tecnologia
        </button>
        <button
          @click="filtrarCategoria('moda')"
          :class="{ active: categoriaAtiva === 'moda' }"
        >
          Moda
        </button>
        <button
          @click="filtrarCategoria('casa')"
          :class="{ active: categoriaAtiva === 'casa' }"
        >
          Casa
        </button>
      </div>
      <div class="ordenar">
        <label for="ordenar">Ordenar por:</label>
        <select id="ordenar" v-model="ordenar" @change="ordenarProdutos">
          <option value="">Padrão</option>
          <option value="preco-asc">Preço (Menor para Maior)</option>
          <option value="preco-desc">Preço (Maior para Menor)</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      busca: this.$route.query.q || "",
      categoriaAtiva: this.$route.query.category || "",
      ordenar: "",
    };
  },
  methods: {
    atualizarRota(query) {
      const queryAtual = { ...this.$route.query, ...query };
      // Remove a query se o valor for vazio para limpar a URL
      for (const key in queryAtual) {
        if (!queryAtual[key]) {
          delete queryAtual[key];
        }
      }
      this.$router.push({ query: queryAtual });
    },
    buscarProdutos() {
      this.atualizarRota({ q: this.busca });
    },
    filtrarCategoria(categoria) {
      this.categoriaAtiva = categoria;
      this.atualizarRota({ category: categoria });
    },
    ordenarProdutos() {
      let sort = null;
      let order = null;

      if (this.ordenar === "preco-asc") {
        sort = "preco";
        order = "asc";
      } else if (this.ordenar === "preco-desc") {
        sort = "preco";
        order = "desc";
      }

      this.atualizarRota({ _sort: sort, _order: order });
    },
  },
};
</script>

<style scoped>
.filtros {
  max-width: 800px;
  margin: 0 auto;
}

.busca {
  max-width: 600px;
  margin: 30px auto 60px auto;
  position: relative;
  padding: 0 10px;
}

#busca {
  width: 100%;
  padding: 20px;
  border: none;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  border-radius: 4px;
}

#busca:focus,
#busca:hover {
  transform: scale(1.1);
}

#lupa {
  width: 62px;
  height: 62px;
  background: url("../assets/search.svg") no-repeat center center;
  text-indent: -150px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 0px;
  box-shadow: none;
}

.controles {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
}

.categorias button {
  background: #f4f7fc;
  border: 1px solid #f4f7fc;
  border-radius: 4px;
  padding: 8px 12px;
  margin-right: 10px;
  cursor: pointer;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 1rem;
}

.categorias button:hover,
.categorias button.active {
  background: #568f87;
  color: white;
  border-color: #568f87;
}

.ordenar {
  display: flex;
  align-items: center;
}

.ordenar label {
  margin-right: 10px;
}

.ordenar select {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
}
</style>
