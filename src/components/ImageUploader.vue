<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': isLoading }"
      :style="cover"
      @click="removeImage($event)"
    >
      <span>{{ title }}</span>

      <input
        ref="input"
        type="file"
        accept="image/*"
        class="form-control-file"
        @change="uploadImage($event)"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from "../ImageService";

const LOADING_TEXT = "Загрузка...";
const EMPTY_TEXT = "Загрузить изображение";
const DELETE_TEXT = "Удалить изображение";

export default {
  name: "ImageUploader",

  model: {
    prop: "value",
    event: "change",
  },

  props: {
    value: {
      default: null,
    },
  },

  data() {
    return {
      isLoading: false,
    };
  },

  computed: {
    title() {
      if (this.isLoading) return LOADING_TEXT;
      else if (this.value === null) return EMPTY_TEXT;
      return DELETE_TEXT;
    },

    cover() {
      return this.value
        ? `--bg-image: url('${ImageService.getImageURL(this.value)}')`
        : "";
    },
  },

  methods: {
    removeImage(e) {
      if (this.value) {
        e.preventDefault();
        this.$emit("change", null);
        this.$refs.input.value = null;
      }
    },

    async uploadImage(e) {
      this.isLoading = true;

      await ImageService.uploadImage(e.target.files["0"]).then((res) => {
        this.$emit("change", res["id"]);
      });

      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
