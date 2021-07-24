import Vue from 'vue';
import VueRouter from 'vue-router';


import FormPage from '../views/FormPage';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/MeetupsPage'),
    },
    {
      path: '/meetups',
      name: 'meetups',
      component: () => import('../views/MeetupsPage'),
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      name: 'meetup',
      props: true,
      redirect: (to) => ({ name: 'meetup.description', params: to.params }),
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
      },
      component: () => import('../views/MeetupPage'),
      children: [
        {
          path: 'description',
          alias: 'description',
          name: 'meetup.description',
          props: true,
          component: () => import('../views/MeetupDescriptionPage'),
        },
        {
          path: 'agenda',
          name: 'meetup.agenda',
          props: true,
          component: () => import('../views/MeetupAgendaPage'),
        },
      ],
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterPage'),
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage'),
    },
    {
      path: '/form',
      name: 'form',
      component: FormPage,
    },

  ],
});