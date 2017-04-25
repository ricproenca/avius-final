# Sharing Work In Progress

* [localtunnel](https://localtunnel.github.io/www/): to **easily** share work on your local machine
* [ngrok](https://ngrok.com/) to use a **secure** tunnel to your local machine

## Local Tunnel
Install globally:
```
npm install localtunnel -g
```

Add scripts to `package.json`
```json
"scripts": {
  ...
  "localtunnel": "lt --local-host localhost --port 8080 --subdomain eneardev",
  "share:localtunnel": "npm-run-all --parallel start localtunnel"
},
```
Access [https://eneardev.localtunnel.me/](https://enear.localtunnel.me/)

## Ngrok
Install globally:
```
npm install ngrok -g
```

Add scripts to `package.json`
```json
"scripts": {
  ...
  "ngrok": "ngrok http -host-header=localhost 8080",
  "share:ngrok": "npm-run-all --parallel start ngrok",
},
```
Open the web interface at [http://localhost:4040](http://localhost:4040) to inspect and replay requests.

#### If you want to set an auth token and an IP whitelist you should log in to ngrok site and follow the guide
