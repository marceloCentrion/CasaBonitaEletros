import services from "@/services/axios";

let requestEmAndamento: Promise<string> | null = null;

export const useModoOperacao = () => {
  const modo = useState<string>("site:modo-operacao", () => "orcamento");
  const carregado = useState<boolean>("site:modo-operacao-carregado", () => false);

  const carregarModoOperacao = async (force = false) => {
    if (!force && carregado.value) return modo.value;
    if (!force && requestEmAndamento) return requestEmAndamento;

    requestEmAndamento = services.configuracoes
      .getSite()
      .then(({ data }) => {
        modo.value = data?.modo_operacao === "vendas" ? "vendas" : "orcamento";
        carregado.value = true;
        return modo.value;
      })
      .catch(() => {
        // Em caso de indisponibilidade, mantém orçamento como modo seguro.
        modo.value = "orcamento";
        return modo.value;
      })
      .finally(() => {
        requestEmAndamento = null;
      });

    return requestEmAndamento;
  };

  return {
    modo,
    vendasAtivas: computed(() => modo.value === "vendas"),
    carregarModoOperacao,
  };
};
