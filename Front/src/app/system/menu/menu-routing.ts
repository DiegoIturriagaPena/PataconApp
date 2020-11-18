import { MenuItem } from './theme/menu-item';


/**
 * Super Admin Menu
 */
export const superAdminMenu: MenuItem[] =
[
  {
    displayName: 'Inicio ',
    iconName: 'home',
    route: '/pataconsys/dashboard'
  },
  {
    displayName: 'Mapa ',
    iconName: 'map',
    route: '/pataconsys/mapa'
  },
  {
    displayName: 'Flota ',
    iconName: 'local_shipping',
    route: '/pataconsys/flota',
  },
  {
    displayName: 'Choferes ',
    iconName: 'person',
    route: '/pataconsys/listaChofer'
  },
  {
    displayName: 'Rutas',
    iconName: 'room',
    route: '/pataconsys/listarRuta'
  },
  {
    displayName: 'Productores',
    iconName: 'business',
    route: '/pataconsys/listarProductor'
  },
  {
    displayName: 'Tipo de uva',
    iconName: 'loyalty',
    route: '/pataconsys/uva'
  },
  {
    displayName: 'Planificador',
    iconName: 'list_alt',
    route: '/pataconsys/listaRecorridos'
  },
  {
    displayName: 'Supervisores',
    iconName: 'supervised_user_circle',
    route: '/pataconsys/supervisores'
  }
];

/**
 * Admin (Supervisor) Menu
 */
export const adminMenu: MenuItem[] =
[
  {
    displayName: 'Inicio ',
    iconName: 'home',
    route: '/pataconsys/dashboard'
  },
  {
    displayName: 'Mapa ',
    iconName: 'map',
    route: '/pataconsys/mapa'
  },
  {
    displayName: 'Flota ',
    iconName: 'local_shipping',
    route: '/pataconsys/flota',
  },
  {
    displayName: 'Choferes ',
    iconName: 'person',
    route: '/pataconsys/listaChofer'
  },
  {
    displayName: 'Rutas',
    iconName: 'room',
    route: '/pataconsys/listarRuta'
  },
  {
    displayName: 'Productores',
    iconName: 'business',
    route: '/pataconsys/listarProductor'
  },
  {
    displayName: 'Planificador',
    iconName: 'list_alt',
    route: '/pataconsys/listaRecorridos'
  }
];
