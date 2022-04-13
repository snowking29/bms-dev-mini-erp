import * as icon from '@fortawesome/free-solid-svg-icons';

export const SideBarData = [
  {
    title: 'Principal',
    path: '/principal',
    icon: icon.faHome
  },
  {
    title: 'Salidas',
    path: '/salidas',
    icon: icon.faTruckRampBox
  },
  {
    title: 'Entradas',
    path: '/entradas',
    icon: icon.faBoxOpen
  },
  {
    title: 'Clientes',
    path: '/clientes',
    icon: icon.faUsers
  },
  {
    title: 'Proveedores',
    path: '/proveedores',
    icon: icon.faTruckMoving
  },
  {
    title: 'Productos',
    path: '/productos',
    icon: icon.faBoxesPacking
  },
  {
    title: 'Categorias',
    path: '/categorias',
    icon: icon.faTags
  },
  
  {
    title: 'Inventario',
    path: '/inventario',
    icon: icon.faBoxes
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