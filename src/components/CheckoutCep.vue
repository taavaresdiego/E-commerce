<template>
  <div>
    <h2>Endereço de Entrega</h2>
    <div class="form-cep">
      <label for="cep">CEP</label>
      <input
        type="text"
        id="cep"
        name="cep"
        v-model="cep"
        @input="buscarCep"
        placeholder="00000-000"
      />
      <div class="status" aria-live="polite">{{ status }}</div>
    </div>
    <label for="rua">Rua</label>
    <input
      type="text"
      id="rua"
      name="rua"
      v-model="endereco.rua"
      @input="emitirEndereco"
    />
    <label for="numero">Número</label>
    <input
      type="text"
      id="numero"
      name="numero"
      v-model="endereco.numero"
      @input="emitirEndereco"
      ref="numeroInput"
    />
    <label for="bairro">Bairro</label>
    <input
      type="text"
      id="bairro"
      name="bairro"
      v-model="endereco.bairro"
      @input="emitirEndereco"
    />
    <label for="cidade">Cidade</label>
    <input
      type="text"
      id="cidade"
      name="cidade"
      v-model="endereco.cidade"
      @input="emitirEndereco"
    />
    <label for="estado">Estado</label>
    <input
      type="text"
      id="estado"
      name="estado"
      v-model="endereco.estado"
      @input="emitirEndereco"
    />
  </div>
</template>

<script>
export default {
  name: "CheckoutCep",
  data() {
    return {
      cep: "",

      endereco: {
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
      },
      status: "",
    };
  },
  methods: {
    async buscarCep() {
      this.cep = this.cep.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2");
      if (this.cep.length === 9) {
        this.status = "Buscando...";
        try {
          const cepLimpo = this.cep.replace("-", "");
          const response = await fetch(
            `https://viacep.com.br/ws/${cepLimpo}/json/`
          );
          const data = await response.json();

          if (data.erro) {
            this.status = "CEP não encontrado. Preencha manualmente.";

            Object.assign(this.endereco, {
              rua: "",
              bairro: "",
              cidade: "",
              estado: "",
            });
          } else {
            this.status = "Endereço encontrado!";

            this.endereco.rua = data.logradouro;
            this.endereco.bairro = data.bairro;
            this.endereco.cidade = data.localidade;
            this.endereco.estado = data.uf;
            this.$refs.numeroInput.focus();
          }

          this.emitirEndereco();
        } catch (error) {
          this.status = "Falha na rede. Preencha manualmente.";
          console.error(error);
          this.emitirEndereco();
        }
      } else {
        this.status = "";
      }
    },

    emitirEndereco() {
      this.$emit("update:endereco", this.endereco);
    },
  },
};
</script>

<style scoped>
.form-cep {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 10px;
}
.status {
  font-size: 12px;
  padding-bottom: 16px;
}
label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}
input {
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
