import { Ad, IAds } from "../models/IAds";
import { get, post, put, remove } from "../utils/axios";

const BASE_PATH = "/ads";

export const getAds = async (): Promise<any> => 
    get(`${BASE_PATH}`);

export const getAd = async (id: number): Promise<any> =>
    get(`${BASE_PATH}/${id}`);

export const createAd = async (values: Ad): Promise<any> =>
    post(`${BASE_PATH}`, values);

export const updateAd = async (id: number, values: IAds): Promise<any> =>
    put(`${BASE_PATH}/${id}`, values);

export const deleteAd = async (id: number): Promise<any> =>
    remove(`${BASE_PATH}/${id}`);


