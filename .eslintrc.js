module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [1, 2, { "SwitchCase": 1, "VariableDeclarator": 2 }],
    "quotes": [1, "single"],
    "semi": [1,"always"],
    "react/jsx-uses-vars": 2,
    "react/jsx-uses-react": 2
  }
};