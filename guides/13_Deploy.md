# Deploy

## Automated Deploy
Install
+  [Surge](https://surge.sh)

```
npm install surge --save-dev
```

Add script to `package.json
```
scripts: {
  ...
  "deploy": "surge ./build"
}`
```

#### My first attempt was saved in [http://upbeat-rake.surge.sh/](http://upbeat-rake.surge.sh/)
```
Surge - surge.sh

              email: ricproenca@gmail.com
              token: *****************
       project path: ./build
               size: 25 files, 3.0 MB
             domain: upbeat-rake.surge.sh
             upload: [====================] 100%, eta: 0.0s
   propagate on CDN: [====================] 100%
               plan: Free
              users: ricproenca@gmail.com
         IP Address: 45.55.110.124

    Success! Project is published and running at upbeat-rake.surge.sh
```
