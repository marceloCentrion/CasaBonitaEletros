import axios from 'axios';
import AuthService from './auth'
import LoginService from './login';
import ClientesService from './clientes';
import MarcasService from './marcas';
import CasesService from './cases';
import ContatoService from './contato';
import EmpresaService from './empresa';
import PaginaService from './pagina';
import BannersService from './banners';
import CategoriaService from './categoria';
import GruposServices from './grupos';
import ProdutosServices from './produtos';
import NewslettersServices from './newsletters';
import EnderecoService from './endereco';
import ProjetosService from './projetos';
import coresService from './cores';
import coresProdutosService from './cores_podutos';
import tamanhosService from './tamanhos';
import representantesService from './representantes';
import atributosService from './atributos';
import pedidoService from './pedido';
import cuponsService from './cupons';
import freteService from './frete';
import perguntasService from './perguntas';
import pageService from './pages';
import cepService from './cep';
import taxaService from './taxas';
import cartoesService from './cartoes';
import pagarmeService from './pagarme';
import CombosService from './combos';
import estadosService from './estados';
import cidadesService from './cidades';
import estoquesService from './estoques';
import imagensProdutosService from './imagens_produtos';
import variacoes from './variacoes';
import usuarios from './usuarios';
import configuracoes from './configuracoes';
import orcamentos from './orcamentos';

const API_ENVS = {
  production: '',
  development: '',
   local: 'https://backend.casabonitaeletros.com.br/api',
  cep: 'http://viacep.com.br/ws/',
  MelhorEnvio: 'https://melhorenvio.com.br/api'
}
const httpClient = axios.create({
  baseURL: API_ENVS.local
})
const httpCep = axios.create({
  baseURL: API_ENVS.cep
})

const httpMelhorEnvio = axios.create({
  baseURL: API_ENVS.MelhorEnvio
})

httpClient.interceptors.request.use((config) => {
  if (import.meta.client) {
    const storage = useAuthStore();
    if (storage.token) {
      config.headers.Authorization = `Bearer ${storage.token}`;
    }
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const storage = useAuthStore();
      storage.token = null;
      navigateTo('/login-sistema');
    }
    return Promise.reject(error);
  }
);

export default {
  auth: AuthService(httpClient),
  login: LoginService(httpClient),
  clientes: ClientesService(httpClient),
  cases: CasesService(httpClient),
  contato: ContatoService(httpClient),
  empresa: EmpresaService(httpClient),
  pagina: PaginaService(httpClient),
  banners: BannersService(httpClient),
  categoria: CategoriaService(httpClient),
  grupos: GruposServices(httpClient),
  produtos: ProdutosServices(httpClient),
  newsletters: NewslettersServices(httpClient),
  endereco: EnderecoService(httpClient),
  projetos: ProjetosService(httpClient),
  combos: CombosService(httpClient),
  cores: coresService(httpClient),
  coresProdutos: coresProdutosService(httpClient),
  tamanhos: tamanhosService(httpClient),
  representantes: representantesService(httpClient),
  atributos: atributosService(httpClient),
  cupons: cuponsService(httpClient),
  marcas: MarcasService(httpClient),
  cep: cepService(httpCep),
  perguntas: perguntasService(httpClient),
  frete: freteService(httpMelhorEnvio),
  pedido: pedidoService(httpClient),
  pages: pageService(httpClient),
  taxas: taxaService(httpClient),
  cartoes: cartoesService(httpClient),
  pagarme: pagarmeService(httpClient),
  estados: estadosService(httpClient),
  cidades: cidadesService(httpClient),
  estoques: estoquesService(httpClient),
  imagensProdutos: imagensProdutosService(httpClient),
  variacoes: variacoes(httpClient),
  usuarios: usuarios(httpClient),
  configuracoes: configuracoes(httpClient),
  orcamentos: orcamentos(httpClient),
}
