
module.exports = {
  verbose: true,
  coverageReporters: [
    'json',
    'html',
    'text',
  ],
  moduleFileExtensions: [
    'js',
  ],
  testPathIgnorePatterns: [
      '/node_modules/',
    ],
  collectCoverageFrom: [
    '**/*/*.js',
    '**/*.js',
    '!**/node_modules/**',
  ],
};
