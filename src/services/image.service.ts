import { post } from "../utils/axios";

const BASE_PATH = "/images";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  return await post(`${BASE_PATH}/upload`, formData);
};
