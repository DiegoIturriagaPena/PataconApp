const application = require('./dist');
require('../backend/src/providers/parser_teltonika/index');
require('../backend/src/providers/gps_parser/indexGPS');
module.exports = application;

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT || 4000),
      host: process.env.HOST,
      openApiSpec: {
        // useful when used with OASGraph to locate your application
        setServersFromRequest: false,
      },
      apiExplorer: {
        disabled: true,
      },
    },
  };
  application.main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
