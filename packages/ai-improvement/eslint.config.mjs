import baseConfig from '@repo/config/eslint/base.mjs';

export default [
  ...baseConfig,
  {
    ignores: ['dist/**', 'node_modules/**']
  },
  {
    files: ['**/*.md', '**/*.yml', '**/*.yaml'],
    plugins: {
      markdown: await import('eslint-plugin-markdown'),
      yaml: await import('eslint-plugin-yaml')
    }
  }
]; 