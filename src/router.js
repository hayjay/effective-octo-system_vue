import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/auth/register",
      name: "register",
      component: () => import("./components/Auth/Register")
    },
    {
      path: "/auth/login",
      name: "login",
      component: () => import("./components/Auth/Login")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/Todo/AddTodo")
    },
    {
      path: "/auth/login",
      name: "login",
      component: () => import("./components/Auth/Login")
    },
    {
      path: "/my-todos",
      alias: "/todos",
      name: "todos",
      component: () => import("./components/Todo/List")
    },
  ]
});
