import httpClient from '@/api/httpClient';
export const API_URL = 'https://course-vue.javascript.ru/api'
export default {

  uploadImage(file) {
    return httpClient.imagePost('/images/upload', file);
  },

}

