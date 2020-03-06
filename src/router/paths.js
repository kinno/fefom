/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
import Login from '../views/Login'
import Dashboard from '../views/Dashboard'
import Home from '../views/Home'
import TechosFinancieros from '../views/TechosFinancieros'
import ConsultaTechos from '../views/ConsultaTechos'
import CarteraProyectos from '../views/CarteraProyectos'
import RevisionCartera from '../views/RevisionCarteraProyectos'
import FichaTecnica from '../views/FichaTecnica'
import ListadoFichaTecnica from '../views/ListadoFichaTecnica'
import RevisionFichaTecnica from '../views/RevisionFichaTecnica'
import Oficios from '../views/Oficios'
import Catalogos from '../views/Catalogos'

export default [{
    path: '/',
    component: Login,
    name: "Login",
    props: true,
    meta: {
      guest: true
    },
  },
  {
    path: '/dashboard',
    // Relative to /src/views
    component: Dashboard,
    name: 'Dashboard',
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/home',
    // Relative to /src/views
    component: Home,
    name: 'Home',
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/techos-financieros',
    name: 'Techos Financieros',
    component: TechosFinancieros,
    meta: {
      requiresAuth: true,
      requiresFefom: true,
    },
  },
  {
    path: '/consulta_techos',
    name: 'Consulta Techos Financieros',
    component: ConsultaTechos,
    meta: {
      requiresAuth: true,
      requiresFefom: false,
    },
  },
  {
    path: '/registro_cartera_proyectos',
    name: 'Cartera de Proyectos',
    component: CarteraProyectos,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/revision_cartera_proyectos',
    name: 'Revision Cartera de Proyectos',
    component: RevisionCartera,
    meta: {
      requiresAuth: true,
      requiresFefom: true,
    },
  },
  {
    path: '/listado_ficha_tecnica',
    name: 'Listado Ficha Tecnica',
    component: ListadoFichaTecnica,
    meta: {
      requiresAuth: true,
      requiresFefom: true,
    },
  },
  {
    path: '/registro_ficha_tecnica',
    name: 'Registro Ficha Tecnica',
    component: FichaTecnica,
    meta: {
      requiresAuth: true,
      requiresFefom: false,
    },
  },
  {
    path: '/revision_ficha_tecnica',
    name: 'Revision-Ficha',
    component: RevisionFichaTecnica,
    meta: {
      requiresAuth: true,
      requiresFefom: true,
    },
  },
  {
    path: '/control_oficios',
    name: 'Oficios',
    component: Oficios,
    meta: {
      requiresAuth: true,
      requiresFefom: true,
    },
  },
  {
    path: '/catalogos',
    name: 'Catalogos',
    component: Catalogos,
    meta: {
      requiresAuth: true,
      requiresFefom: true,
    },
  },
  
  // {
  //   path: '/user-profile',
  //   name: 'User Profile',
  //   view: 'UserProfile'
  // },
  // {
  //   path: '/table-list',
  //   name: 'Table List',
  //   view: 'TableList'
  // },
  // {
  //   path: '/typography',
  //   view: 'Typography'
  // },
  // {
  //   path: '/icons',
  //   view: 'Icons'
  // },
  // {
  //   path: '/maps',
  //   view: 'Maps'
  // },
  // {
  //   path: '/notifications',
  //   view: 'Notifications'
  // },
  // {
  //   path: '/upgrade',
  //   name: 'Upgrade to PRO',
  //   view: 'Upgrade'
  // }
]
