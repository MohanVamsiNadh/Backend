/*
 *This is the basic setup for deploying in vercel with mongoose
 * it have swagger docs , mongodb connect
 *
 */

require("dotenv").config();
const dbconnect = require("./dbconnect");
const express = require("express");
const path = require('path');
const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load(path.resolve(__dirname,'api-spec.yaml'));
global.__configurations = require(path.resolve(__dirname,'config.js'));
global.ROUTE_DIR = __dirname + "/routes/api";
global.CONTROLLER_DIR = __dirname + "/controllers";
global.UTIL_DIR = __dirname + "/utils";
global.DB_MODEL = __dirname + "/models";
app.use(express.json())
app.use((req, res, next) => {
  if (req.originalUrl == "/") {
    res.status(200).send();
  } else {
    console.debug(`Incoming request -> method: ${req.method},  query params: ${JSON.stringify(req.query)},param: ${JSON.stringify(req.params)},url: ${req.originalUrl}, body: ${JSON.stringify(req.body)}`);
    next();
  }
});
app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/health-check", async (req, res) => {
  await dbconnect();
  res.status(200).json({ message: "server is up" });
});
if (__configurations.ENVIRONMENT=='local'){
  app.listen(3000,()=>{

    console.log('app started on port 3000 in local environment')
  })
}


module.exports= app
