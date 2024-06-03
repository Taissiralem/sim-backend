// sendinblue.js

const SibApiV3Sdk = require("sib-api-v3-sdk");

SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
  process.env.API_KEY_EMAIL;

module.exports = SibApiV3Sdk;
