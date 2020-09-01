# webpack install

```
npm i -D path
npm i -D webpack webpack-cli
npm i -D webpack-dev-server
npm i -D css-loader style-loader
```

# webpack test

```
"dev": "webpack --mode=development",
"prod": "webpack --mode=production"

npm run dev -> app.js 실행
npm run prod // Minify(압축), Uglify(난독화), Tree Shaking(안쓰는 코드 제거)
```
