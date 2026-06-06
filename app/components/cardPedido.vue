<template>
  <div class="card-card">
    <div id="card">
      <div id="div_img" v-if="produto.imagem && produto.imagem.length > 0">
        <div
          v-if="produto.item_unico == 'SIM'"
          style="
            width: 100%;
            text-align: right;
            color: #b99f47;
            font-family: 'Poppins', sans-serif;
            font-weight: 400;
            font-size: 10pt;
            position: absolute;
            right: 0;
          "
        >
          <span style="background: #000; border-radius: 8px; padding: 1px 3px"
            >* Item Único</span
          >
        </div>
        <img id="img" :src="produto.imagem" />
      </div>
      <div id="div_img" v-else>
        <div
          v-if="produto.item_unico == 'SIM'"
          style="
            width: 100%;
            text-align: right;
            color: #737373;
            font-family: 'Poppins', sans-serif;
            font-weight: 400;
            font-size: 10pt;
            position: absolute;
            right: 0;
          "
        >
          <span style="background: #000; border-radius: 8px; padding: 1px 3px"
            >* Item Único</span
          >
        </div>

        <img id="img" src="/logo/blackLogo.svg" />
      </div>
      <div id="div-titulo">
        <p id="titulo">
          {{ produto.nome }} ({{ produto.estoque.valor_variacao.nome }})
        </p>
      </div>
      <hr />
      <div class="div-preco">
        <div id="com_desconto" v-if="produto.tem_desconto == 'SIM'">
          <div id="preco_anterior">
            de
            {{
              parseFloat(produto.preco).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            }}
            por
          </div>
          <div id="preco">
            {{
              produto.preco_desconto.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            }}
          </div>
        </div>
        <p id="preco" v-else>
          {{
            produto.preco.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          }}
        </p>

        <p id="parcelas">
          ou <span class="spn-parcelas">{{ produto.parcelas }}x</span> de
          <span class="valor-parcela"> {{ valorTotal }} </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    produto: { type: Object, required: false },
  },
  setup(props) {
    const valorTotal = computed(() => {
      var precoNumerico;
      if (props.produto.tem_desconto == "SIM") {
        precoNumerico = parseFloat(props.produto.preco_desconto);
      } else {
        precoNumerico = parseFloat(props.produto.preco);
      }

      if (!isNaN(precoNumerico) && typeof props.produto.parcelas === "number") {
        const resultado = precoNumerico / props.produto.parcelas;

        return resultado.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      } else {
        return "R$ 0,00";
      }
    });

    return {
      valorTotal,
    };
  },
};
</script>

<style scoped>
.com_desconto {
  display: flex;
  justify-content: flex-start;
}

.card-card {
  width: 80%;
}

#card {
  width: 100%;
  padding: 25px;
  border-radius: 1px;
  border: 1px transparent;
  background: transparent;
  border: solid 1px #191a1514;
  border-radius: 4px;
}

.div-preco {
  text-align: left;
  min-height: 90px;
}

#titulo {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  color: #252b42;
  font-family: "Poppins", sans-serif;
}

#img {
  width: 100%;
  height: 200px;
  object-fit: contain;
}

#div_img {
  text-align: center;
  padding: 10;
  position: relative;
}

#div-titulo {
  height: 2em;
  margin-bottom: 5px;
  margin-top: 10px;
}

.btn_details {
  background: var(--primary);
  color: #fff;
  width: 100%;
  padding: 8px;
  font-weight: 700;
  border-radius: 4px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  transition: 0.3s;
  font-family: "Poppins", sans-serif;
}

.btn_details:hover {
  background: #b99f47;
}

#preco {
  color: #252b42;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 16pt;
  margin-bottom: 0;
}

#parcelas {
  color: #737373;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 10pt;
}

#preco_anterior {
  color: #737373;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 10pt;
}

#parcelas .spn-parcelas {
  color: #00c21a;
  font-family: "Poppins", sans-serif;
  margin-bottom: 0;
  font-weight: 400;
  font-size: 11pt;
}

#parcelas .valor-parcela {
  color: #252b42;
  font-family: "Poppins", sans-serif;
  margin-bottom: 0;
  font-weight: 700;
  font-size: 11pt;
}

@media (min-width: 992px) and (max-width: 1200px) {
  #img {
    width: 100%;
    height: 150px;
  }

  #desconto {
    font-size: 20px;
  }

  #card {
    padding: 15px;
  }

  #titulo {
    font-size: 15px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  #img {
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .card-card {
  }

  #img {
    width: 100%;
  }
}

@media (max-width: 575px) {
  .card-card {
    margin-right: 1em;
    margin-left: 1em;
    margin-bottom: 1em;
    width: 70%;
  }

  #img {
    width: 100%;
    height: 200px;
    object-fit: contain;
  }
}
</style>

