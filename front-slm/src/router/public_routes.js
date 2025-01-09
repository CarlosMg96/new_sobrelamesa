import Login from "@/public/views/UserLogin.vue";

export default [
    {
        path: '',
        component: ()=> import(/* webpackChunkName "public" */"@/layouts/PublicLayout.vue"),
        meta:{
            requireAuth: false
        },
        children:[
            {
                path: 'login',
                name: 'login',
                component: Login,
                meta:{
                    title: 'Inicio de sesión'
                },
            },
        ]
    },

]