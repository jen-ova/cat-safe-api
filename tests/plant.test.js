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

        expect(response.status).to.equal(201);
        expect(response.body.plantName).to.equal('Rattlesnake Plant');
        expect(newPlantRecord.plantName).to.equal('Rattlesnake Plant');
        expect(newPlantRecord.scientificName).to.equal('Calathea lancifolia');
        expect(newPlantRecord.link).to.equal('../images/rattlesnake.jpeg');
      });
    });
  });

  describe('with records in the database', () => {
    let plants;

    beforeEach(async () => {
      plants = await Promise.all([
        Plant.create({
          plantName: 'Rattlesnake Plant',
          scientificName: 'Calathea lancifolia',
          link: '../images/rattlesnake.jpeg',
        }),
        Plant.create({
          plantName: 'Spider Plant',
          scientificName: 'Chlorophytum comosum',
          link: '../images/spider.jpeg',
        }),
        Plant.create({
          plantName: 'Parlour Palm',
          scientificName: 'Chamaedorea elegans',
          link: '../images/parlour.jpeg',
        }),
      ]);
    });

    describe('GET /plants', () => {
      it('gets all plants records', async () => {
        const response = await request(app).get('/plants');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((plant) => {
          const expected = plants.find((a) => a.id === plant.id);

          expect(plant.plantName).to.equal(expected.plantName);
          expect(plant.scientificName).to.equal(expected.scientificName);
          expect(plant.link).to.equal(expected.link);
        });
      });
    });

    describe('GET /plants/:id', () => {
      it('gets plants record by id', async () => {
        const plant = plants[0];
        const response = await request(app).get(`/plants/${plant.id}`);

        expect(response.status).to.equal(200);
        expect(plant.plantName).to.equal(plant.plantName);
        expect(plant.scientificName).to.equal(plant.scientificName);
        expect(plant.link).to.equal(plant.link);
      });

      it('returns a 404 if the reader does not exist', async () => {
        const response = await request(app).get('/plants/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The plant could not be found.');
      });
    });

    describe('PATCH /plants/:id', () => {
      it('updates plants email by id', async () => {
        const plant = plants[0];
        const response = await request(app)
          .patch(`/plants/${plant.id}`)
          .send({ plantName: 'Calathea Orbifolia' });
        const updatedPlantRecord = await Plant.findByPk(plant.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedPlantRecord.plantName).to.equal('Calathea Orbifolia');
      });

      it('returns a 404 if the reader does not exist', async () => {
        const response = await request(app)
          .patch('/plants/12345')
          .send({ plantName: 'random latin name' });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The plant could not be found.');
      });
    });

    describe('DELETE /plants/:id', () => {
      it('deletes plant record by id', async () => {
        const plant = plants[0];
        const response = await request(app).delete(`/plants/${plant.id}`);
        const deletedPlant = await Plant.findByPk(plant.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedPlant).to.equal(null);
      });

      it('returns a 404 if the plant does not exist', async () => {
        const response = await request(app).delete('/plants/12345');
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The plant could not be found.');
      });
    });
  });
});
