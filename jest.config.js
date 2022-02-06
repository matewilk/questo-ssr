module.exports = {
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "src", "src/client/utils"],
  // core-js (brings setImmediate to jsdom - for apollo test server)
  setupFiles: ["core-js"],
};
