import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path : '/home',
    name : 'home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/HomeView.vue'),
    meta : {
      requireAuth : true
    }
  },
  {
    path : '/inventario',
    name : 'inventario',
    component: () => import(/* webpackChunkName: "Inventario" */ '../views/InventarioView.vue'),
    meta : {
      requireAuth : true
    }
  },
  {
    path : '/porcobrar',
    name : 'porcobrar',
    component: () => import(/* webpackChunkName: "PorCobrar" */ '../views/PorCobrarView.vue'),
    meta : {
      requireAuth : true
    }
  },
  {
    path : '/comprasmes',
    name : 'comprasmes',
    component: () => import(/* webpackChunkName: "ComprasMes" */ '../views/ComprasView.vue'),
    meta : {
      requireAuth : true
    }
  },
  {
    path : '/ventasmes',
    name : 'ventasmes',
    component: () => import(/* webpackChunkName: "VentasMes" */ '../views/VentasView.vue'),
    meta : {
      requireAuth : true
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to,from,next) => {
  const auth = localStorage.getItem('spx_localdata')
  const needAuth = to.meta.requireAuth
  if(needAuth && !auth){
    next('/')
  }
  else{
    next()
  }
})

export default router
