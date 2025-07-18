import { Logistic } from "../models/Logistic.js";

export const getAllLogistics = async (req, res) => {
  try {
    const logistics = await Logistic.find();
    res.json(logistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createLogistic = async (req, res) => {
  try {
    const { parcelService, branch } = req.body;
    const logistic = new Logistic({ parcelService: parcelService, branch: branch});
    const savedLogistic = await logistic.save();
    res.status(201).json(savedLogistic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};