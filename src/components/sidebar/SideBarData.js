import * as icon from '@fortawesome/free-solid-svg-icons';

export const SideBarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon.faDashboard,
    disabled: false
  },
  {
    title: 'Punto De Venta',
    path: '/pos',
    icon: icon.faCalculator,
    disabled: false
  },
  {
    title: 'Salidas',
    path: '/salidas',
    icon: icon.faTruckRampBox,
    disabled: false
  },
  {
    title: 'Entradas',
    path: '/entradas',
    icon: icon.faBoxOpen,
    disabled: false
  },
  /*{
    title: 'Control de Caja',
    path: '/caja',
    icon: icon.faCalculator,
    disabled: true
  },*/
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
    disabled: false
  },
  {
    title: 'Empleados',
    path: '/empleados',
    icon: icon.faUserGroup,
    disabled: false
  }
];