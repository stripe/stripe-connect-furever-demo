const path = require('path');

module.exports = {
  entry: '/public/javascripts/connect.js',
  output: {
    path: path.resolve(__dirname, 'public/javascripts/'),
    filename: 'compiled.js',
  },
  mode: 'production',
};
