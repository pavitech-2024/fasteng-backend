module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
  
    // Mapeia o alias 'modules/*' para 'src/modules/*' com base na baseUrl do tsconfig
    moduleNameMapper: {
      '^modules/(.*)$': '<rootDir>/src/modules/$1',
    },
  };
  