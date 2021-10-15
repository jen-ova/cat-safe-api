module.exports = (connection, DataTypes) => {
  const schema = {
    plantName: DataTypes.STRING,
    scientificName: DataTypes.STRING,
    link: DataTypes.STRING,
  };

  const PlantModel = connection.define('Plant', schema);
  return PlantModel;
};
