import * as icon from '@fortawesome/free-solid-svg-icons';

export const SideBarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon.faDashboard,
    disabled: false
  },
  {
    title: 'Salidas',
    path: '/salidas',
    icon: icon.faTruckRampBox,
    disabled: true
  },
  {
    title: 'Entradas',
    path: '/entradas',
    icon: icon.faBoxOpen,
    disabled: false
  },
  {
    title: 'Clientes',
    path: '/clientes',
    icon: icon.faUsers,
    disabled: false
  },
  {
    title: 'Proveedores',
    path: '/proveedores',
    icon: icon.faTruckMoving,
    disabled: false
  },
  {
    title: 'Productos',
    path: '/productos',
    icon: icon.faBoxesPacking,
    disabled: false
  },
  {
    title: 'Categorias',
    path: '/categorias',
    icon: icon.faTags,
    disabled: false
  },
  
  {
    title: 'Inventario',
    path: '/inventario',
    icon: icon.faBoxes,
    disabled: true
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