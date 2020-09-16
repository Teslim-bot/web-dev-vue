import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/auth/Login";
import Registration from "../views/auth/Registration";
import Dashboard from "../views/Dashboard";
import CreateExpense from "@/views/CreateExpense";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/createExpense",
    name: "createExpense",
    component: CreateExpense
  },
  {
    path: "/register",
    name: "register",
    component: Registration
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
