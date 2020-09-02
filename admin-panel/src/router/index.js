import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/components/Main";
import Aphorisms from "@/components/Aphorisms";
import Subscribers from "@/components/Subscribers";
import Materials from "@/components/Materials";
import Tasks from "@/components/Tasks";
import LoginPage from "@/components/LoginPage";
import axios from "axios";
import { getBaseUrl, getToken, setAuthorizationToken } from "../helpers";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/admin",
      component: Main,
      name: "Main",
      children: [
        {
          path: "aphorisms",
          component: Aphorisms,
          name: "Aphorisms"
        },
        {
          path: "subscribers",
          component: Subscribers,
          name: "Subscribers"
        },
        {
          path: "meterials",
          component: Materials
        },
        {
          path: "tasks",
          component: Tasks
        }
      ]
    },
    {
      path: "/admin/login",
      component: LoginPage,
      name: "Login"
    }
  ],
  mode: "history",
  base: process.env.BASE_URL
});

router.beforeEach((to, from, next) => {
  if (getToken()) {
    setAuthorizationToken(getToken());
    axios
      .get(`${getBaseUrl()}/user/auth`)
      .then(() => {
        next();
      })
      .catch(() => {
        if (to.name !== "Login") next({ name: "Login" });
        else next();
      });
  } else {
    if (to.name !== "Login") {
      next({ name: "Login" });
    } else {
      next();
    }
  }
});

export default router;
