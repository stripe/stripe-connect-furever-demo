const path = require('path');

module.exports = {
  entry: '/public/javascripts/_connect.js',
  output: {
    path: path.resolve(__dirname, 'public/javascripts/'),
    filename: 'connect.js',
  },
  mode: 'production',
};
