const { createProxyMiddleware } = require("http-proxy-middleware");
const CONTROLLER_URL = process.env.CONTROLLER_URL || "http://localhost:8080";
const API_PREFIX = "/api";
module.exports = function (app) {
  app.use(createProxyMiddleware(API_PREFIX, { target: CONTROLLER_URL }));
  app.use(createProxyMiddleware("/*.tar.gz", { target: CONTROLLER_URL }));
  app.use(createProxyMiddleware("/*.bin", { target: CONTROLLER_URL }));
  app.use(createProxyMiddleware("/websocket", { target: CONTROLLER_URL.replace("http", "ws"), ws: true }));
};
