/** URL адрес API */
const BASE_URL = process.env.VUE_APP_API_URL;

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
