import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export default [{
  ignores: ['dist/**'],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
  plugins: {
    '@typescript-eslint': typescriptPlugin
  },
  rules: {
    ...typescriptPlugin.configs.recommended.rules,
  }
}]; 