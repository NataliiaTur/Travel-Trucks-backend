import { CamperCollection } from '../db/models/camper.js';

export const getAllCampers = async () => {
  const campers = await CamperCollection.find();
  return campers;
};

export const getCamperById = async (camperId) => {
  const camper = await CamperCollection.findById(camperId);
  return camper;
};
