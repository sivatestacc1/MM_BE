import { Logistic } from "../models/Logistic.js";

export const getAllLogistics = async (req, res) => {
  try {
    const logistics = await Logistic.find();
    res.json(logistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};