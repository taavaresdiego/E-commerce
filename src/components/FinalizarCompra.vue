<template>
  <section>
    <ErroNotificacao :erros="erros" />

    <CheckoutCep @update:endereco="endereco = $event" />

    <button class="btn" @click.prevent="finalizarCompra">
      Finalizar Compra
    </button>
  </section>
</template>

<script>
import CheckoutCep from "@/components/CheckoutCep.vue";
import ErroNotificacao from "./ErroNotificacao.vue";
import { api } from "@/services.js";
import { mapState } from "vuex";

export default {
  name: "FinalizarCompra",

  components: {
    CheckoutCep,
    ErroNotificacao,
  },
  props: ["produto"],
  data() {
    return {
      erros: [],

      endereco: {
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
      },
    };
  },
  computed: {
    ...mapState(["usuario"]),
    compra() {
      return {
        comprador_id: this.usuario.email,
        vendedor_id: this.produto.usuario_id,
        produto: this.produto,
        endereco: this.endereco,
      };
    },
  },
  methods: {
    criarTransacao() {
      return api.post("/transacao", this.compra).then(() => {
        this.$router.push({ name: "compras" });
      });
    },
    async criarUsuario() {
      try {
        this.$store.commit("UPDATE_USUARIO", {
          ...this.usuario,
          ...this.endereco,
        });
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("logarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("getUsuario");
        await this.criarTransacao();
      } catch (error) {
        this.erros.push(error.response.data.message);
      }
    },
    finalizarCompra() {
      this.erros = [];
      if (this.$store.state.login) {
        this.criarTransacao();
      } else {
        this.criarUsuario();
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn {
  background: #e80;
}
</style>
