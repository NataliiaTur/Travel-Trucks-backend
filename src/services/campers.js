import { CamperCollection } from '../db/models/camper.js';

export const getAllCampers = async (filters) => {
  const { location, bodyType, features, page = 1, limit = 10 } = filters;

  const query = {};

  // 🔹 location (частковий пошук, не чутливий до регістру)
  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }

  // 🔹 bodyType (у схемі це поле form)
  if (bodyType) {
    query.form = bodyType;
  }

  // 🔹 features (наприклад AC, kitchen, TV тощо)
  if (features) {
    const featureList = Array.isArray(features) ? features : [features];
    featureList.forEach((feature) => {
      query[feature] = true;
    });
  }

  // 🔹 пагінація
  const skip = (page - 1) * limit;

  // Загальна кількість документів для поточного фільтра
  const totalCount = await CamperCollection.countDocuments(query);

  // Вибірка з урахуванням пагінації
  const campers = await CamperCollection.find(query)
    .skip(skip)
    .limit(Number(limit));

  return {
    campers,
    totalCount,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(totalCount / limit),
  };
};

export const getCamperById = async (camperId) => {
  const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(camperId);

  if (isValidObjectId) {
    return await CamperCollection.findById(camperId);
  } else {
    return await CamperCollection.findOne({ id: camperId });
  }
};
