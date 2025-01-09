import {
    createRouter,
    createWebHistory,
  } from 'vue-router'
  import {h, resolveComponent} from 'vue';
  import publicRoutes from "@/router/public_routes";
  import NotFound from '@/public/views/NotFound.vue';
  import Unauthorized from '@/public/views/AccessDenied.vue';
  import {getRoleByToken, getToken} from "@/kernel/utils";
  import privateRoutes from "@/router/private_routes";

  
  const routes= [
    {
      path:'',
      redirect: '/login',
    },
    {
      path: '/',
      component: {
        render () {
          return h(resolveComponent("router-view"))
        }
      },
      children:[
        ...publicRoutes.map(route => {
          route.meta.requireAuth = false
          return {...route}
        }),
        ...privateRoutes.map(route => {
          route.meta.requireAuth = true
          return {...route}
        }),
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    },
    {
      name: "unautorized",
      path: "/unautorized",
      component: Unauthorized
    }
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  router.beforeEach(async (to, from, next) => {
    const publicRoutes = ["/login", "/unautorized"];
    const authRequired = !publicRoutes.includes(to.path);
    const loggedIn = getToken();
  
    if (authRequired && !loggedIn) {
      return next("/login");
    }
  
    if (loggedIn) {
      const role = await getRoleByToken();
  
      if (role) {
        console.log(role);
        console.log(to.meta);
  
        // Verificar si el rol del usuario está en los roles permitidos
        if (to.meta && to.meta.role && Array.isArray(to.meta.role)) {
          // Si `role` es un arreglo, se verifica si el rol del usuario está en ese arreglo
          if (!to.meta.role.includes(role.toUpperCase())) {
            return next("/unautorized");
          }
        } else if (to.meta && to.meta.role && to.meta.role.toString().toLowerCase() !== role.toString().toLowerCase()) {
          return next("/unautorized");
        }
      } else {
        return next("/login");
      }
      next();
    }
  
    if (loggedIn && to.path.toString().toLowerCase() === "/login") {
      return next("/list-products");
    }
  
    next();
  });
  
  
  export default router