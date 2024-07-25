import Vue from 'vue';
import VueRouter from 'vue-router';
import privateRoutes from "@/router/private-routes";
import publicRoutes from "@/router/public-routes";
import { getRoleNameBytoken, existsToken } from "@/kernel/utils";

Vue.use(VueRouter);

const routes = [
    {
        path:'',
        redirect:'/login'
    },
    {
        path:'/',
        component: {
            render(c) { return c('router-view') }
        },
        children: [
            ...privateRoutes.map(route => {
                route.meta.requiresAuth = false;
                return {...route};
            }),
            ...publicRoutes.map(route => {
                route.meta.requiresAuth = false;
                return {...route};
            })

        ]
    },
    {
        path: '/*',
        name: '404',
        component: ()=> import('@/components/NotFound.vue')
    },
    {
        name: "unautorized",
        path: "/unautorized",
        component: () => import("@/components/Unautorized.vue"),
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// router.beforeEach(async (to, from, next)=> {
//     const publicPages = ['/login'];
//     const authRequired = !publicPages.includes(to.path)
//     const loggedIn = existsToken()
    
//     if (authRequired && !loggedIn) {
//         return next('/login')
//     }
//     if(loggedIn){
//         const role = await getRoleNameBytoken();
//         console.log(role);

//         if(role !== undefined && role !== null && role !== ""){
//             if(to.meta && to.meta.role && to.meta.role.toString().toLowerCase() !== role.toString().toLowerCase()){
//                 return next("/unautorized")
//             }
//         }else{
//             return next("/login")
//         }
//         next();
//     }
//     if(loggedIn && to.path.toString().toLowerCase() === "/login"){
//         return next("/calendar")
//     }
//     next()
// })


export default router