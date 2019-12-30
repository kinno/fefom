/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
import Login from '../views/Login'
import Dashboard from '../views/Dashboard'
import TechosFinancieros from '../views/TechosFinancieros'
import ConsultaTechos from '../views/ConsultaTechos'
import CarteraProyectos from '../views/CarteraProyectos'
import RevisionCartera from '../views/RevisionCarteraProyectos'
import FichaTecnica from '../views/FichaTecnica'
import Oficios from '../views/Oficios'
import Catalogos from '../views/Catalogos'
import Usuarios from '../components/app/UsuariosComponent'

export default [{
    path: '/',
    component: Login,
    name: "Login",
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
    path: '/registro_ficha_tecnica',
    name: 'Registro Ficha Tecnica',
    component: FichaTecnica,
    meta: {
      requiresAuth: true,
      requiresFefom: false,
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
    children: [
      // UserHome will be rendered inside User's <router-view>
      // when /user/:id is matched
      { path: 'usuarios', component: Usuarios },
    ],
    meta: {
      requiresAuth: true
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