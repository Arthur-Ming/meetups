<template>
  <div class="bg-white">
    <template v-if="meetup">
      <meetup-cover :title="meetup.title" :link="meetupImagelink" />
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <content-tabs :tabs="tabs">
              <router-view :meetup="meetup" />
            </content-tabs>
          </div>
          <div class="meetup__aside">
            <meetup-info
              :organizer="meetup.organizer"
              :place="meetup.place"
              :date="meetupDate"
            />
            <div class="meetup__aside-buttons" v-if="isAuthenticated">
              <primary-button
                block
                v-if="!meetup.attending && !meetup.organizing"
                @click="handleAttend"
                >Участвовать</primary-button
              >
              <secondary-button
                block
                v-if="meetup.attending && !meetup.organizing"
                @click="handleLeave"
                >Отменить участие</secondary-button
              >
              <primary-button
                v-if="meetup.organizing"
                tag="router-link"
                :to="{ name: 'meetup-edit', params: { meetup } }"
                block
              >
                Редактировать
              </primary-button>
              <danger-button
                block
                v-if="meetup.organizing"
                @click="handleDelete"
                >Удалить</danger-button
              >
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <h3>Loading...</h3>
    </template>
  </div>
</template>

<script>
import ContentTabs from "@/components/ui/ContentTabs";
import DangerButton from "@/components/ui/DangerButton.vue";
import SecondaryButton from "@/components/ui/SecondaryButton.vue";
import MeetupCover from "@/components/layouts/MeetupCover";
import MeetupInfo from "@/components/layouts/MeetupInfo";
import PrimaryButton from "@/components/ui/PrimaryButton";
import store from "@/store/index.js";
import { meetupsApi } from "@/api/meetupsApi";
import { ImageService } from "@/services/ImageService.js";

export default {
  name: "MeetupPage",

  components: {
    ContentTabs,
    MeetupCover,
    MeetupInfo,
    PrimaryButton,
    SecondaryButton,
    DangerButton,
  },

  props: {
    meetupId: {
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      tabs: [
        { to: { name: "meetup.description" }, text: "Описание" },
        { to: { name: "meetup.agenda" }, text: "Программа" },
      ],
    };
  },
  metaInfo() {
    return {
      title: this.meetup && this.meetup.title,
    };
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const meetup = await meetupsApi.fetchMeetup(to.params.meetupId);
      next((vm) => {
        vm.setMeetup(meetup);
      });
    } catch (error) {
      next((vm) => {
        vm.$toaster.error(error.body.message);
        vm.$router.push({ name: "index" });
      });
    }
  },

  async beforeRouteUpdate(to, from, next) {
    if (to.params.meetupId === from.params.meetupId) {
      next();
    } else {
      try {
        const meetup = await meetupsApi.fetchMeetup(to.params.meetupId);
        this.setMeetup(meetup);
        next();
      } catch (error) {
        next((vm) => {
          vm.$toaster.error(error.body.message);
          vm.$router.push({ name: "index" });
        });
      }
    }
  },
  computed: {
    meetupImagelink() {
      return this.meetup.imageId
        ? ImageService.getImageURL(this.meetup.imageId)
        : null;
    },
    meetupDate() {
      return new Date(this.meetup.date);
    },
    isAuthenticated() {
      return store.getters["auth/IS_AUTHENTICATED"];
    },
  },
  methods: {
    setMeetup(meetup) {
      this.meetup = meetup;
    },
    async handleAttend() {
      try {
        await meetupsApi.attend(this.meetupId);
        this.setMeetup({
          ...this.meetup,
          attending: true,
        });
        this.$toaster.success("Сохранено!");
      } catch (error) {
        this.$toaster.error(error);
      }
    },
    async handleLeave() {
      try {
        await meetupsApi.leave(this.meetupId);

        this.setMeetup({
          ...this.meetup,
          attending: false,
        });
        this.$toaster.success("Сохранено!");
      } catch (error) {
        this.$toaster.error(error);
      }
    },
    async handleDelete() {
      try {
        await meetupsApi.deleteMeetup(this.meetupId);
        this.$toaster.success("Сохранено!");
        this.$router.push({ name: "index" });
      } catch (error) {
        this.$toaster.error(error);
      }
    },
  },
};
</script>

<style scoped>
.meetup {
  display: flex;
  flex-direction: column;
  margin: 48px 0 0;
}

.meetup-description {
  padding-top: 33px;
}

.meetup__content p {
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 28px;
}

.meetup__aside {
  margin: 40px 0;
}

.meetup__aside-buttons {
  padding: 0 0 0 34px;
  margin-top: 16px;
}

.meetup__aside-buttons > .button {
  margin: 0 10px 10px 0;
}

@media all and (min-width: 992px) {
  .meetup {
    flex-direction: row;
  }

  .meetup__content {
    flex: 1 0 calc(100% - 350px);
  }

  .meetup__aside {
    flex: 1 0 350px;
    padding: 50px 0 0 44px;
    margin: 0;
  }

  .meetup__empty {
    height: 340px;
  }
}
</style>
