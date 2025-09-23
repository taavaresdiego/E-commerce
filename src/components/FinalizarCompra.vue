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
    ...mapState(["usuario", "login"]),
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
    async criarTransacao() {
      try {
        await api.post("/transacao", this.compra);

        this.$router.push({ name: "compras" });
      } catch (error) {
        this.erros.push(error.response.data.message);
      }
    },

    async criarUsuario() {
      this.erros = [];
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
      if (this.login) {
        this.criarTransacao();
      } else {
        this.criarUsuario();
      }
    },
  },
};
</script>
