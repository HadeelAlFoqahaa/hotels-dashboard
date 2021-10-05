const db = require('./database');

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});

test('create hotel', async () => {
    expect.assertions(1);
    const hotel = await db.Hotel.create({
        name: 'Grand Hayat',
    });
    expect(hotel.id).toEqual(1);
});

test('get hotel', async () => {
    expect.assertions(1);
    const hotel = await db.Hotel.findByPk(1);
    expect(hotel.name).toEqual('Grand Hayat');
});

test('delete hotel', async () => {
    expect.assertions(1);
    await db.Hotel.destroy({
        where: {
            id: 1
        }
    });
    const hotel = await db.Hotel.findByPk(1);
    expect(hotel).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});