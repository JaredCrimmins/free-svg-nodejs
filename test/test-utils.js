'use-strict';

const dotenv = require('dotenv');

function loadEnvFile() {
  const result = dotenv.config({
    encoding: 'UTF-8',
    path: __dirname + '/../.env',
  });

  if (result.error) {
    throw result.error;
  }

  return result.parsed;
}

module.exports = {loadEnvFile};
