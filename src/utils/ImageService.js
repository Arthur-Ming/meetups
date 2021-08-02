/** URL адрес API */

import { BASE_URL } from "@/api/httpClient"

export const ImageService = {
  /**
   * Возвращает ссылку на изображение по ID
   * @param id - ID изображения
   * @return {string} - ссылка на изображение
   */
  getImageURL(id) {
    return id !== null ? `${BASE_URL}/images/${id}` : null;
  },
};
