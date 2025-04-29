module.exports = {
  env: {
    node: true, // This tells ESLint that it's Node.js
  },
  extends: [
    'eslint:recommended',
  ],
  rules: {
    'no-undef': 'off', // Turn off the no-undef rule for CommonJS
  },
};
