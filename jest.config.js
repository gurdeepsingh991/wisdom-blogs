// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1', // For alias like @/components
    },
    transform: {
      '^.+\\.(ts|tsx)$': 'babel-jest', // ✅ Supports TSX
      '^.+\\.(js|jsx)$': 'babel-jest', // ✅ Supports JSX
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/']
  };
  