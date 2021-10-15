const { Plant } = require('../models');

exports.create = async (req, res) => {
  const newPlant = await Plant.create(req.body);
  res.status(201).json(newPlant);
};
