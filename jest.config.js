module.exports = {
  verbose: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/templates/',
    '/server/',
    '/client/src/test/__mocks__',
    '/client/src/test/testSetup.js',
    '/client/src/js/index.jsx',
    '/coverage'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    // '<rootDir>/js/tests',
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  rootDir: 'client',
  roots: ['<rootDir>/src'],
  setupFiles: [
    '<rootDir>/src/test/testSetup.js',
    '<rootDir>/src/test/__mocks__/localStorageMock.js',

  ],
  moduleFileExtensions: [
    'js',
    'jsx'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
          '<rootDir>/src/test/__mocks__/fileMock.js',
    '\\.(scss|css)$': 'identity-obj-proxy',
  },
  snapshotSerializers: ['enzyme-to-json/serializer']
};
