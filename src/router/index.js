import { createRouter, createWebHashHistory } from "vue-router";
import store from "../vuex";
import { computed } from "vue";
import { message } from "ant-design-vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
    meta: {
      requiresAuth: true, //设置需要授权的页面
    },
  },
  {
    path: "/home",
    redirect: "/home/rigistered",
    component: () => import("../components/HomePage.vue"),
    children: [
      {
        path: "rigistered",
        component: () => import("../views/VisitorRegister.vue"),
        meta: {
          requiresAuth: true, //设置需要授权的页面
        },
      },
      {
        path: "blacklist",
        component: () => import("../views/BlackListView.vue"),
      },
      {
        path: "search",
        component: () => import("../views/VisitorSearch.vue"),
      },
      {
        path: "personal",
        component: () => import("../views/PersonalView.vue"),
      },
      {
        path: "statistical",
        component: () => import("../views/VisitorStatistical.vue"),
      },
      {
        path: "manage",
        component: () => import("../views/ManageOperator.vue"),
      },
      {
        path: "announced",
        component: () => import("../views/AnnouncedView.vue"),
      },
      {
        path: "balcklist",
        component: () => import("../views/BlackListView.vue"),
      },
      {
        path: "dept",
        component: () => import("../views/DeptManage.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../components/LoginPage.vue"),
  },
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  // const isLoggedIn = localStorage.getItem("token"); //此处使用 localStorage 存储 token
  const isLoggedIn = computed(() => store.state.user.operatorId).value;
  console.log(requiresAuth && !isLoggedIn);
  if (requiresAuth && isLoggedIn) {
    // 如果未登录且页面需要授权，则跳转到登录页面
    next("/login");
  } else {
    // 否则继续执行路由
    next();
  }
});

export default router;
