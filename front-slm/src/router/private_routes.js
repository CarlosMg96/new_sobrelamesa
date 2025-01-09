import Products from "@/modules/products/views/ProductsList.vue";

export default [
    {
      path: "",
      component: () =>
        import(/* webpackChunkName "admin" */ "@/layouts/PrivateLayout.vue"),
      meta: {
        requireAuth: true,
        role: ['MASTER', 'ADMIN', 'SALES', 'STORE']
      },
      children: [
        {
          path: "list-products",
          name: "products",
          component: Products,
          meta: {
            title: "Productos",
            role: ['MASTER', 'ADMIN', 'SALES', 'STORE']
          },
        },
      ],
    },
  ];