const { expect } = require('chai');
const request = require('supertest');
const { Plant } = require('../src/models');
const app = require('../src/app');

describe('/plants', () => {
  before(async () => Plant.sequelize.sync());

  beforeEach(async () => {
    await Plant.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST /plants', () => {
      it('creates a new plant in the database', async () => {
        const response = await request(app).post('/plants').send({
          plantName: 'Rattlesnake Plant',
          scientificName: 'Calathea lancifolia',
          link: '../images/rattlesnake.jpeg',
        });

        const newPlantRecord = await Plant.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.body.plantName).to.equal('Rattlesnake Plant');
        expect(newPlantRecord.plantName).to.equal('Rattlesnake Plant');
        expect(newPlantRecord.scientificName).to.equal('Calathea lancifolia');
        expect(newPlantRecord.link).to.equal('../images/rattlesnake.jpeg');

        expect(response.status).to.equal(201);
      });
    });
  });
});
