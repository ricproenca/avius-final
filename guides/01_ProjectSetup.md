### Start a project with [npm](https://www.npmjs.com/)
```
npm init -y
```

### Install [https://www.npmjs.com/package/npm-run-all](https://www.npmjs.com/package/npm-run-all)) to run multiple npm-scripts in parallel or sequential.
```
npm install npm-run-all --save-dev
```

### Setup [Security Scanning](https://github.com/nodesecurity/nsp) to check npm dependencies for known vulnerabilities.
```
npm install --g nsp
```

Run it for the first time:
```
nsp check
```

### Install vendors
```
npm install jquery --save
npm install moment --save
npm install font-awesome --save
```
#### read: [Open source checking security tools](https://softwaresecured.com/13-tools-for-checking-the-security-risk-of-open-source-dependencies/)
