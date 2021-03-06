import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";

Vue.use(VueRouter);

function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  }

  if (
    to.matched.some((m) => m.meta.saveScrollPosition) &&
    from.matched.some((m) => m.meta.saveScrollPosition)
  ) {
    return false;
  }

  if (to.hash) {
    return {
      selector: to.hash,
    };
  }
  return { x: 0, y: 0 };
}

function requireAuthGuard(to, from, next) {
  if (to.matched.some((route) => route.meta.requireAuth)) {
    if (store.getters["auth/IS_AUTHENTICATED"]) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
}

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,

  scrollBehavior,
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("../views/MeetupsPage"),
    },
    {
      path: "/meetups",
      name: "meetups",
      component: () => import("../views/MeetupsPage"),
    },
    {
      path: "/meetups/:meetupId(\\d+)",
      name: "meetup",
      props: true,
      redirect: (to) => ({ name: "meetup.description", params: to.params }),
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
      },
      component: () => import("../views/MeetupPage"),
      children: [
        {
          path: "description",
          name: "meetup.description",
          props: true,
          component: () => import("../views/MeetupDescriptionPage"),
        },
        {
          path: "agenda",
          name: "meetup.agenda",
          props: true,
          component: () => import("../views/MeetupAgendaPage"),
        },
      ],
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterPage"),
    },

    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginPage"),
    },
    {
      path: "/meetups/create",
      name: "meetups_create",
      meta: {
        requireAuth: true,
      },
      component: () => import("../views/FormPage"),
    },
    {
      path: "/meetups/:meetupId(\\d+)/edit",
      name: "meetup-edit",
      meta: {
        requireAuth: true,
      },
      props: true,
      component: () => import("../views/FormEditPage"),
    },
    {
      path: "/#",
      name: "exit",
      component: () => import("../views/MeetupsPage"),
    },
    {
      path: "/*",
      name: "notFoundPage",
      component: () => import("../views/NotFoundPage"),
    },
  ],
});

router.beforeEach(requireAuthGuard);
