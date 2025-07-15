things to install:
 - latest npm
 - latest node


command to run:
 - npx json-server db.json --middlewares delay-middleware.js middleware.js --port 8080



deploy to render.com

 - under settings put to start command: npx json-server db.json --middlewares delay-middleware.js middleware.js --host 0.0.0.0 --port 8080