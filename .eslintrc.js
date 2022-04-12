module.exports = {
  root: true,
  extends: ['universe/node', 'universe/shared/typescript-analysis'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'spaced-comment': ['warn', 'always', { block: { balanced: true } }],
    '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'warn',
          { selector: 'typeLike', format: ['PascalCase'] },
          { selector: 'enumMember', format: ['UPPER_CASE'] },
        ],
      },
    },
  ],
};
