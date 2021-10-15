const { Plant } = require('../models');

exports.create = async (req, res) => {
  const newPlant = await Plant.create(req.body);
  res.status(201).json(newPlant);
};

exports.findAll = async (req, res) => {
  const plants = await Plant.findAll();
  res.status(200).json(plants);
};

exports.findByPk = async (req, res) => {
  const thisPlant = await Plant.findByPk(req.params.id);
  if (!thisPlant) {
    return res.status(404).send({ error: 'The plant could not be found.' });
  }
  res.status(200).json(thisPlant);
};

exports.update = async (req, res) => {
  const thisPlant = await Plant.findByPk(req.params.id);
  if (!thisPlant) {
    return res.status(404).send({ error: 'The plant could not be found.' });
  }
  await Plant.update(req.body, { where: { id: req.params.id } });
  res.status(200).json(thisPlant);
};

exports.delete = async (req, res) => {
  const thisPlant = await Plant.findByPk(req.params.id);
  if (!thisPlant) {
    return res.status(404).send({ error: 'The plant could not be found.' });
  }
  await Plant.destroy({ where: { id: req.params.id } });
  res.status(204).json(thisPlant);
};
