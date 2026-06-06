import {
  LayoutDashboardIcon,
  GridDotsIcon,
  TagIcon,
  PictureInPictureIcon,
  PaperclipIcon,
  BuildingStoreIcon,
  UserIcon,
  UsersIcon,
  PlaneIcon,
  BoxIcon,
  BasketIcon,
  VariableIcon,
  PhoneCallIcon,
  TicketIcon,
  LayersOffIcon,
  CreditCardIcon,
} from "vue-tabler-icons";

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipBgColor?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: "Home" },
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    to: "/admin/dashboard",
  },
  { header: "Clientes" },
  {
    title: "Clientes",
    icon: UsersIcon,
    to: "/admin/clientes",
  },
  {
    title: "Pedidos",
    icon: BasketIcon,
    to: "/admin/pedidos",
  },
  { header: "Produtos" },
  {
    title: "Produtos",
    icon: BoxIcon,
    to: "/admin/produtos",
  },

  {
    title: "Combos",
    icon: LayersOffIcon,
    to: "/admin/combos",
  },
  {
    title: "Marcas",
    icon: TagIcon,
    to: "/admin/marcas",
  },
  {
    title: "Variações",
    icon: VariableIcon,
    to: "/admin/variacoes",
  },
  {
    title: "Grupos",
    icon: GridDotsIcon,
    to: "/admin/grupos",
  },
  {
    title: "Categorias",
    icon: TagIcon,
    to: "/admin/categorias",
  },
  { header: "Banners e Páginas" },
  {
    title: "Banners",
    icon: PictureInPictureIcon,
    to: "/admin/banners",
  },
  {
    title: "Categoria Banners",
    icon: PaperclipIcon,
    to: "/admin/categoria-banners",
  },
  { header: "Outros" },
  {
    title: "Cupons",
    icon: TicketIcon,
    to: "/admin/cupons",
  },
  {
    title: "Newsletters",
    icon: PlaneIcon,
    to: "/admin/newsletters",
  },
  {
    title: "Contatos",
    icon: PhoneCallIcon,
    to: "/admin/contatos",
  },
  {
    title: "Empresa",
    icon: BuildingStoreIcon,
    to: "/admin/empresa",
  },
  {
    title: "Taxas do Cartão",
    icon: CreditCardIcon,
    to: "/admin/taxas-cartao",
  },
  {
    title: "Usuários",
    icon: UserIcon,
    to: "/admin/usuarios",
  },
];

export default sidebarItem;
