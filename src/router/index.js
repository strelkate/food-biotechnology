import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'

Vue.use(VueRouter)

export const PathHome = '/'
export const PathProjects = '/projects'
export const PathLibrary = '/library'
export const PathControl = '/control'
export const PathLk = '/lk'
export const PathNews = '/feed'
export const PathProjectsAdd = '/projects/add'
export const PathProjectsEdit = '/projects/edit/:id'
export const PathProjectsDetails = '/projects/details/:id'
export const PathStudentsAdd = '/control/students'
export const PathNewsTable = '/control/news-table'
export const PathNewsAdd = '/control/news-add'
export const PathAdmin = '/control/admin'
export const PathNewsEdit = '/control/news-edit'

const routes = [
  {
    path: PathHome,
    name: 'Home',
    component: Home
  },
  {
    path: PathProjects,
    name: 'Project',
    component: () => import(/* webpackChunkName: "about" */ '../views/project/Project.vue')
  },
  {
    path: PathLibrary,
    name: 'Library',
    component: () => import(/* webpackChunkName: "about" */ '../views/library/Library.vue')
  },

  {
    path: PathControl,
    name: 'Control',
    component: () => import(/* webpackChunkName: "about" */ '../views/control/Control.vue')
  },
  {
    path: PathLk,
    name: 'Lk',
    component: () => import(/* webpackChunkName: "about" */ '../views/lk/Lk.vue')
  },
  {
    path: PathNews,
    name: 'News',
    component: () => import(/* webpackChunkName: "about" */ '../views/feed/NewsArticle.vue')
  },
  {
    path: PathProjectsAdd,
    name: 'AddProject',
    component: () => import(/* webpackChunkName: "about" */ '../views/project/AddProject.vue')
  },
  {
    path: PathProjectsEdit,
    name: 'EditProject',
    component: () => import(/* webpackChunkName: "about" */ '../views/project/EditProject.vue'),
    props: true
  },
  {
    path: PathProjectsDetails,
    name: 'DetailsProject',
    component: () => import(/* webpackChunkName: "about" */ '../views/project/DetailsProject.vue'),
    props: true
  },
  {
    path: PathStudentsAdd,
    name: 'StudentsAdd',
    component: () => import(/* webpackChunkName: "about" */ '../views/control/ControlStudentsAdd.vue')
  },
  {
    path: PathNewsTable,
    name: 'NewsTable',
    component: () => import(/* webpackChunkName: "about" */ '../views/control/ControlNewsTable.vue')
  },
  {
    path: PathNewsAdd,
    name: 'NewsAdd',
    component: () => import(/* webpackChunkName: "about" */ '../views/control/ControlNewsAdd.vue')
  },
  {
    path: PathAdmin,
    name: 'Admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/control/ControlAdmin.vue')
  },
  {
    path: PathNewsEdit,
    name: 'NewsEdit',
    component: () => import(/* webpackChunkName: "about" */ '../views/control/ControlNewsEdit.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
