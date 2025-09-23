<template>
  <section>
    <h2>Endereço de Envio</h2>
    <UsuarioForm>
      <button class="btn" @click.prevent="finalizarCompra">
        Finalizar Compra
      </button>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import { api } from "@/services.js";
import { mapState } from "vuex";

export default {
  name: "FinalizarCompra",
  components: {
    UsuarioForm,
  },
  props: ["produto"],
  data() {
    return {
      erros: [],
    };
  },
  computed: {
    ...mapState(["usuario", "login", "carrinho"]),
    compra() {
      return {
        comprador_id: this.usuario.email,
        vendedor_id: this.produto.usuario_id,
        produto: this.produto,
        endereco: {
          cep: this.usuario.cep,
          rua: this.usuario.rua,
          numero: this.usuario.numero,
          bairro: this.usuario.bairro,
          cidade: this.usuario.cidade,
          estado: this.usuario.estado,
        },
      };
    },
  },
  methods: {
    criarTransacao() {
      const transacoes = this.carrinho.map(
        (item) =>
          new Promise((resolve) => {
            const compra = {
              comprador_id: this.usuario.email,
              vendedor_id: item.usuario_id,
              produto: item,
              endereco: {
                cep: this.usuario.cep,
                rua: this.usuario.rua,
                numero: this.usuario.numero,
                bairro: this.usuario.bairro,
                cidade: this.usuario.cidade,
                estado: this.usuario.estado,
              },
            };
            resolve(api.post("/transacao", compra));
          })
      );

      return Promise.all(transacoes);
    },

    async criarUsuario() {
      this.erros = [];
      try {
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
      if (this.$store.state.carrinho.length > 0) {
        if (this.login) {
          this.criarTransacao().then(() => {
            this.$router.push({ name: "compras" });
          });
        } else {
          this.criarUsuario();
        }
      } else {
        alert("O seu carrinho está vazio.");
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
  margin-top: 10px;
}
</style>
