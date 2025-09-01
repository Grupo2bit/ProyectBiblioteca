module.exports = {
  transform: {
    '^.+\\.js$': ['babel-jest', { presets: [['@babel/preset-env', { targets: { node: 'current' } }]] }],
  },
  testEnvironment: 'node',
  transformIgnorePatterns: ['/node_modules/(?!(supertest)/)'],
  moduleFileExtensions: ['js', 'json', 'node'],
};

