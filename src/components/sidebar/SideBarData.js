import * as icon from '@fortawesome/free-solid-svg-icons';

export const SideBarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon.faDashboard,
    disabled: "true"
  },
  {
    title: 'Salidas',
    path: '/salidas',
    icon: icon.faTruckRampBox,
    disabled: "true"
  },
  {
    title: 'Entradas',
    path: '/entradas',
    icon: icon.faBoxOpen,
    disabled: ""
  },
  {
    title: 'Clientes',
    path: '/clientes',
    icon: icon.faUsers,
    disabled: ""
  },
  {
    title: 'Proveedores',
    path: '/proveedores',
    icon: icon.faTruckMoving,
    disabled: ""
  },
  {
    title: 'Productos',
    path: '/productos',
    icon: icon.faBoxesPacking,
    disabled: ""
  },
  {
    title: 'Categorias',
    path: '/categorias',
    icon: icon.faTags,
    disabled: ""
  },
  
  {
    title: 'Inventario',
    path: '/inventario',
    icon: icon.faBoxes,
    disabled: "true"
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