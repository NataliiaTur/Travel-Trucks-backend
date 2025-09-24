import { getAllCampers, getCamperById } from '../services/campers.js';

export const getCampersController = async (req, res, next) => {
  try {
    const campers = await getAllCampers();
    res.status(200).json({
      message: 'Successfully found campers!',
      data: campers,
    });
  } catch (error) {
    next(error);
  }
};

export const getCamperByIdController = async (req, res, next) => {
  try {
    const { camperId } = req.params;
    const camper = await getCamperById(camperId);

    if (!camper) {
      return res.status(404).json({ message: 'Camper not found' });
    }

    res.status(200).json({
      message: `Successfully found camper with id ${camperId}!`,
      data: camper,
    });
  } catch (error) {
    next(error);
  }
};
