process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
  extends: '@antfu',
  ignorePatterns: [
    'dist'
  ],
  rules: {
    'no-console': 'warn'
  }
}
