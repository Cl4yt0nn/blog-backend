const bcrypt = require('bcrypt');
const saltRounds = 10;

async function Hash(Password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(Password, salt);
    return hash;
  } catch (err) {
    throw err;
  }
}

async function unHash(Password, hash) {
  try {
    const result = await bcrypt.compare(Password, hash);
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = { Hash, unHash };