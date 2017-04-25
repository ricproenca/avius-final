# Continuous Integration

## Travis CI [Linux]

1. Sign up [https://travis-ci.org](https://travis-ci.org) using github account
  + Add a new repository
  + Configure settings (default is just fine)

2. Create `.travis.yml` file
```yml
language: node_js
node_js:
  - "6"
  ```
3. Commit changes
4. Access [https://travis-ci.org](https://travis-ci.org) and start a new build.

## Appveyor [Windows]

1. Sign up [https://appveyor.com](https://appveyor.com) using github account
  + Add a new repository
  + Add new build

2. Create `.appveyor.yml` file
```yml
# Test against this version of Node.js
environment:
  matrix:
  # node.js
  - nodejs_version: "6"

# Install scripts. (runs after repo cloning)
install:
  # Get the latest stable version of Node.js or io.js
  - ps: Install-Product node $env:nodejs_version
  # install modules
  - npm install

# Post-install test scripts.
test_script:
  # Output useful info for debugging.
  - node --version
  - npm --version
  # run tests
  - npm test

# Don't actually build.
build: off
```
3. Commit changes
4. Access [https://appveyor.com](https://appveyor.com) and start a new build.
