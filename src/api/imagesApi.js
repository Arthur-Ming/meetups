import httpClient from "@/api/httpClient";

export default {
  uploadImage(imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile);

    return httpClient.imagePost({
      url: "/images/upload",
      payload: formData,
    });
  },
};
