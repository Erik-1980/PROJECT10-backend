const { Users } = require('./db');

const createUser = async ( firstname, lastname, email, password, country, region, city, address, phone, gender) => { // +
  try {
    const newUser = await Users.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      country: country,
      region: region,
      city: city,
      address: address,
      phone: phone,
      gender: gender
    });
    return newUser;
  } catch (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
};

const getUserByUsername = async (email) => { // +
  try {
    const user = await Users.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw new Error(`Failed to get user by email: ${error.message}`);
  }
};

const getUserByPhone = async (phone) => { // +
  try {
    const user = await Users.findOne({ where: { phone } });
    return user;
  } catch (error) {
    throw new Error(`Failed to get user by email: ${error.message}`);
  }
};

const findAllUsers = async () => {// +
  try {
    const users = await Users.findAll({ attributes: ['id', 'firstname', 'lastname', 'email', 'password', 'country', 'region', 'city', 'address', 'phone', 'gender', 'createdAt', 'updatedAt'] });
    return users;
  } catch (error) {
    throw new Error(`Failed to get all users: ${error.message}`);
  }
};

const findById = async (id) => {// +
  try {
    const user = await Users.findOne({ attributes: ['id', 'name', 'lastname', 'email', 'address', 'phone', 'verification', 'createdAt', 'updatedAt'], where: { id } });
    return user;
  } catch (error) {
    throw new Error(`Failed to get user by id: ${error.message}`);
  }
};

const deleteUserById = async (id) => {// +
  try {
    const deletedUser = await Users.destroy({ where: { id } });
    return deletedUser;
  } catch (error) {
    throw new Error(`Failed to delete user by id: ${error.message}`);
  }
};

module.exports = {
  createUser,
  getUserByUsername,
  getUserByPhone,
  findAllUsers,
  findById,
  deleteUserById,
};