import * as icon from '@fortawesome/free-solid-svg-icons';

export const SideBarData = [
  {
    title: 'Principal',
    path: '/principal',
    icon: icon.faHome
  },
  {
    title: 'Ventas',
    path: '/ventas',
    icon: icon.faCartPlus
  },
  {
    title: 'Compras',
    path: '/compras',
    icon: icon.faShoppingBag
  },
  {
    title: 'Productos',
    path: '/productos',
    icon: icon.faBox
  },
  {
    title: 'Categorias',
    path: '/categorias',
    icon: icon.faBoxArchive
  },
  {
    title: 'Clientes',
    path: '/clientes',
    icon: icon.faUserAlt
  },
  {
    title: 'Inventario',
    path: '/inventario',
    icon: icon.faBoxes
  },
  {
    title: 'Proveedores',
    path: '/proveedores',
    icon: icon.faTruckLoading
  }
];

export const SideBarDataAdmin = [
  {
    title: 'Perfil',
    path: '/perfil',
    icon: icon.faIdCard
  },
  {
    title: 'Usuarios',
    path: '/usuarios',
    icon: icon.faUser
  }
]