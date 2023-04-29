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
    meta: {
      requiresAuth: true, //设置需要授权的页面
    },
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
        meta: {
          requiresAuth: true, //设置需要授权的页面
        },
      },
      {
        path: "search",
        component: () => import("../views/VisitorSearch.vue"),
        meta: {
          requiresAuth: true, //设置需要授权的页面
        },
      },
      {
        path: "personal",
        component: () => import("../views/PersonalView.vue"),
        meta: {
          requiresAuth: true, //设置需要授权的页面
        },
      },
      {
        path: "statistical",
        component: () => import("../views/VisitorStatistical.vue"),
        meta: {
          requiresAuth: true, //设置需要授权的页面
        },
      },
      {
        path: "manage",
        component: () => import("../views/ManageOperator.vue"),
        meta: {
          requiresAuth: true, //设置需要授权的页面
        },
      },
      {
        path: "announced",
        component: () => import("../views/AnnouncedView.vue"),
        meta: {
          requiresAuth: true, //设置需要授权的页面
        },
      },
      {
        path: "balcklist",
        component: () => import("../views/BlackListView.vue"),
        meta: {
          requiresAuth: true, //设置需要授权的页面
        },
      },
      {
        path: "dept",
        component: () => import("../views/DeptManage.vue"),
        meta: {
          requiresAuth: true, //设置需要授权的页面
        },
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
  const isLoggedIn = store.state.user.operatorId;
  console.log(isLoggedIn);
  if (requiresAuth && isLoggedIn === undefined) {
    // 如果未登录且页面需要授权，则跳转到登录页面
    next("/login");
  } else {
    // 否则继续执行路由
    next();
  }
});

export default router;
