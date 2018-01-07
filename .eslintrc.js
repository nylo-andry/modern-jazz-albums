const path = require('path');

module.exports = {
  extends: 'airbnb-base',
  plugins: ['import'],
  rules: {
    "import/no-extraneous-dependencies": "off"
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'config/webpack.config.base.js'
      }
    }
  }
};