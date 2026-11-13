const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  { ignores: ['dist/*'] },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // tsc ya valida estos imports; estas reglas fallan por el parser de import
      'import/namespace': 'off',
      'import/no-unresolved': 'off',
    },
  },
]);