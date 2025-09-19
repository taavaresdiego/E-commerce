<template>
  <section>
    <h1>👍 Seja bem-vindo ao Bazzar👎</h1>
    <ProdutosBuscar />
    <ProdutosLista />
  </section>
</template>

<script>
import ProdutosBuscar from "@/components/ProdutosBuscar.vue";
import ProdutosLista from "@/components/ProdutosLista.vue";

export default {
  name: "home",
  components: {
    ProdutosBuscar,
    ProdutosLista,
  },
  created() {
    document.title = "Bazzar";
  },
};
</script>

<style scoped>
h1 {
  color: #568f87;
  margin-top: 40px;
  font-size: 2rem;
  text-align: center;
}
</style>
