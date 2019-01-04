module.exports = function(env) {
  return {
    clientAllowedKeys: ['PERCY_TOKEN'],
    // Fail build when there is missing any of clientAllowedKeys environment variables.
    // By default false.
    failOnMissingKey: false, 
  };
};
