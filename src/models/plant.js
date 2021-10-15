module.exports = (connection, DataTypes) => {
  const schema = {
    plantName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter a plant name',
        },
      },
    },
    scientificName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter a scientific plant name',
        },
      },
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter an image link',
        },
      },
    },
  };

  const PlantModel = connection.define('Plant', schema);
  return PlantModel;
};
