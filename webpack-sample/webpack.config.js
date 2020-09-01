const path = require("path"); // 디렉토리

module.exports = {
  context: __dirname, // 베이스 디렉토리
  entry: "./src/app.js", // 개발할 코드의 시작점
  output: {
    // 결과물을 내보낼 위치
    path: path.resolve(__dirname, "js"),
    publicPath: "/js/", // 번들링 한 결과물을 웹서버에서 배포할 기본 경로
    filename: "app.js",
  },
  // package.json -> scripts.test 삭제
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    // devServer에서 제공하는 자체 스크립트를 포함하고 메모리 상에 저장하고 자체 서버로 실행함
    contentBase: path.resolve(__dirname, "html"), // 웹서버가 사용할 디렉토리
    port: 9000,
  },
};
