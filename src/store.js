import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/services.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    usuario: {
      id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
    usuario_produtos: null,
    carrinho: [],
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload);
    },
    UPDATE_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos = payload;
    },
    ADD_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos.unshift(payload);
    },
    ADICIONAR_ITEM(state, payload) {
      const itemExistente = state.carrinho.find(
        (item) => item.id === payload.id
      );
      if (itemExistente) {
        itemExistente.quantidade++;
      } else {
        const newItem = { ...payload, quantidade: 1 };
        state.carrinho.push(newItem);
      }
    },
    REMOVER_ITEM(state, itemId) {
      const index = state.carrinho.findIndex((item) => item.id === itemId);
      if (index > -1) {
        state.carrinho.splice(index, 1);
      }
    },

    ATUALIZAR_QUANTIDADE_ITEM(state, { itemId, quantidade }) {
      const item = state.carrinho.find((item) => item.id === itemId);
      if (item) {
        item.quantidade = quantidade;
      }
    },
  },
  actions: {
    getUsuarioProdutos(context) {
      return api
        .get(`/produto?usuario_id=${context.state.usuario.id}`)
        .then((response) => {
          context.commit("UPDATE_USUARIO_PRODUTOS", response.data);
        });
    },
    getUsuario(context) {
      return api.get(`/usuario`).then((response) => {
        context.commit("UPDATE_USUARIO", response.data);
        context.commit("UPDATE_LOGIN", true);
      });
    },
    criarUsuario(context, payload) {
      context.commit("UPDATE_USUARIO", { id: payload.email });
      return api.post("/usuario", payload);
    },
    logarUsuario(context, payload) {
      return api
        .login({
          username: payload.email,
          password: payload.senha,
        })
        .then((response) => {
          window.localStorage.token = `Bearer ${response.data.token}`;
        });
    },
    deslogarUsuario(context) {
      context.commit("UPDATE_USUARIO", {
        id: "",
        nome: "",
        email: "",
        senha: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
      });
      window.localStorage.removeItem("token");
      context.commit("UPDATE_LOGIN", false);
    },
  },
});
