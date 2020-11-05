//Node.jsのrequireスタイルでインポート
const bodyParser = require('body-parser')

//Expressアプリケーションインスタンスを受け取る関数をエクスポート
module.exports = app => {
    //HTTPリクエストのbodyの内容をJSONとして解析するようにミドルウェアをインストール
    app.use(bodyParser.json())
}