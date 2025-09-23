<template>
  <section>
    <div v-if="compras">
      <h2>Compras</h2>
      <div
        class="produtos-wrapper"
        v-for="(compra, index) in compras"
        :key="index"
      >
        <ProdutoItem v-if="compra.produto" :produto="compra.produto">
          <p class="vendedor">
            <span>Vendedor:</span> {{ compra.vendedor_id }}
          </p>
        </ProdutoItem>
      </div>
    </div>
    <div v-else-if="!loading && !compras" class="sem-compras">
      <p>Você ainda não realizou nenhuma compra.</p>
      <router-link class="btn" to="/">Ver Produtos</router-link>
    </div>
    <PaginaCarregando v-else />
  </section>
</template>

<script>
import ProdutoItem from "@/components/ProdutoItem.vue";
import { api } from "@/services.js";
import { mapState } from "vuex";

export default {
  name: "UsuarioCompras",
  components: {
    ProdutoItem,
  },
  data() {
    return {
      compras: null,
      loading: true,
    };
  },
  computed: {
    ...mapState(["usuario", "login"]),
  },
  methods: {
    getCompras() {
      this.loading = true;
      api.get(`/transacao?comprador_id=${this.usuario.id}`).then((response) => {
        this.compras = response.data;
        this.loading = false;
      });
    },
  },
  watch: {
    login() {
      this.getCompras();
    },
  },
  created() {
    if (this.login) {
      this.getCompras();
    }
  },
};
</script>

<style scoped>
.produtos-wrapper {
  margin-bottom: 40px;
}

.vendedor {
  color: #e80;
  margin-top: 10px;
}

.sem-compras {
  text-align: center;
  padding: 40px;
}

.sem-compras .btn {
  margin-top: 20px;
}

h2 {
  margin-bottom: 20px;
}
</style>
