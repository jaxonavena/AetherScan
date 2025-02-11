// CONFIG:

const knex = require('knex');
const knexfile = require('../knexfile');

const db = knex(knexfile.test);

beforeAll(async () => {
  await db.migrate.latest(); // make sure migrations are run before tests
});

afterAll(async () => {
  // cleanup after tests
  await db.destroy(); // close the db connection
});

beforeEach(async () => {
  // clear the user table before each test to avoid data pollution
  await db('users').truncate();
});


// TESTS:

describe('User model', () => {
  it('should insert a new user', async () => {
    const user = { name: 'jaxon', email: 'jaxon@example.com', password: "123" };

    const [newUser] = await db('users').insert(user).returning('*');

    expect(newUser).toHaveProperty('id');
    expect(newUser.name).toBe(user.name);
    expect(newUser.email).toBe(user.email);
  });

  it('should retrieve a user by email', async () => {
    const user = { name: 'jaxon', email: 'jaxon@example.com', password: "123" };

    const [newUser] = await db('users').insert(user).returning('*');

    const retrievedUser = await db('users').where({ email: 'jaxon@example.com' }).first();

    expect(retrievedUser).toEqual(expect.objectContaining({ id: newUser.id, name: user.name, email: user.email }));
  });

  it('should throw an error when email is not unique', async () => {
    const user = { name: 'jaxon', email: 'jaxon@example.com', password: "123" };
    const [newUser] = await db('users').insert(user).returning('*');

    const otherUser = { name: 'achraf', email: 'jaxon@example.com', password: "321" };

    await expect(
      db('users').insert(otherUser).returning('*')
    ).rejects.toThrowError(new RegExp('UNIQUE constraint failed'));
  });

  it('should update a user', async () => {
    const user = { name: 'jaxon', email: 'jaxon@example.com', password: "123"  };

    const [newUser] = await db('users').insert(user).returning('*');

    const updatedUser = await db('users')
      .where({ id: newUser.id })
      .update({ name: 'jaxon_a' })
      .returning('*');

    expect(updatedUser[0].name).toBe('jaxon_a');
  });

  it('should delete a user', async () => {
    const user = { name: 'jaxon', email: 'jaxon@example.com', password: "123"  };

    const [newUser] = await db('users').insert(user).returning('*');

    await db('users').where({ id: newUser.id }).del();

    const deletedUser = await db('users').where({ id: newUser.id }).first();

    expect(deletedUser).toBeUndefined();
  });
});



