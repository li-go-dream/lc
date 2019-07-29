const Login = () => import('@/components/login')
const Main = () => import('@/components/main')
const None = () => import('@/components/404')

const Project_list = () => import('@/components/view/project_list')
const Authorization = () => import('@/components/view/authorization')
const Dictionary = () => import('@/components/view/dictionary')

const manager = [
  {
    path: '/404',
    name: 'None',
    component: None,
    meta:{
      authRequired: false,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta:{
      authRequired: false,
    },
  },
  {
    path: '/',
    redirect: '/project_list',
    name: 'main',
    component: Main,
    meta:{
      authRequired: true,
    },
    children: [
      {
        path: 'project_list',
        name: 'project_list',
        component: Project_list,
        text: '监管与分析',
        meta:{
          authRequired: true,
        },
      },
      {
        path: 'authorization',
        name: 'authorization',
        component: Authorization,
        father: '系统设置',
        text: '人员权限管理',
        meta:{
          authRequired: true,
        },
      },
      {
        path: 'dictionary',
        name: 'dictionary',
        component: Dictionary,
        father: '系统设置',
        text: '字典管理',
        meta:{
          authRequired: true,
        },
      },
    ]
  }
]

const people = [
  {
    path: '/404',
    name: 'None',
    component: None,
    meta:{
      authRequired: false,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta:{
      authRequired: false,
    },
  },
  {
    path: '/',
    redirect: '/project_list',
    name: 'main',
    component: Main,
    meta:{
      authRequired: true,
    },
    children: [
      {
        path: 'project_list',
        name: 'project_list',
        component: Project_list,
        text: '监管与分析',
        meta:{
          authRequired: true,
        },
      }
    ]
  }
]

var ismanager = JSON.parse(window.localStorage.getItem('data'))
var rou = [];
if(ismanager){
  rou = manager;
}else{
  rou = people;
}
export default manager
