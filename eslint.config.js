module.exports = {
  overrides: [
    {
      files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        browser: true, // Supondo que 'globals.browser' seja um objeto de configuração válido
      },
      extends: [
        'plugin:@eslint/js/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'eslint-config-prettier',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
