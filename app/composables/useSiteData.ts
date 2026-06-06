import services from "@/services/axios";

type SiteGrupo = Record<string, any>;
type SiteEmpresa = Record<string, any>;

let gruposRequest: Promise<SiteGrupo[]> | null = null;
let empresaRequest: Promise<SiteEmpresa> | null = null;

const normalizarLista = (data: any): SiteGrupo[] =>
  [data?.data, data].find(Array.isArray) ?? [];

const normalizarObjeto = (data: any): SiteEmpresa => {
  const valor = data?.data ?? data;
  return valor && typeof valor === "object" && !Array.isArray(valor)
    ? valor
    : {};
};

export const useSiteData = () => {
  const grupos = useState<SiteGrupo[]>("site:grupos-ativos", () => []);
  const empresa = useState<SiteEmpresa>("site:empresa", () => ({}));

  const carregarGruposSite = async (force = false) => {
    if (!force && grupos.value.length) return grupos.value;
    if (!force && gruposRequest) return gruposRequest;

    gruposRequest = services.grupos
      .getGruposAtivosSite()
      .then(({ data }) => {
        grupos.value = normalizarLista(data);
        return grupos.value;
      })
      .catch((error) => {
        console.error(error);
        return grupos.value;
      })
      .finally(() => {
        gruposRequest = null;
      });

    return gruposRequest;
  };

  const carregarEmpresaSite = async (force = false) => {
    if (!force && Object.keys(empresa.value).length) return empresa.value;
    if (!force && empresaRequest) return empresaRequest;

    empresaRequest = services.empresa
      .getSite()
      .then(({ data }) => {
        empresa.value = normalizarObjeto(data);
        return empresa.value;
      })
      .catch((error) => {
        console.error(error);
        return empresa.value;
      })
      .finally(() => {
        empresaRequest = null;
      });

    return empresaRequest;
  };

  return {
    grupos,
    empresa,
    carregarGruposSite,
    carregarEmpresaSite,
  };
};
