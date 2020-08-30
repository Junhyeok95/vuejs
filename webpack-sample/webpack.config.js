const path = require("path"); // 디렉토리

module.exports = {
  context: __dirname, // 베이스 디렉토리
  entry: "./src/app.js", // 개발할 코드의 시작점
  output: {
    // 결과물을 내보낼 위치
    path: path.resolve(__dirname, "js"),
    filename: "app.js",
  },
  // package.json -> scripts.test 삭제
  module: {},
};
