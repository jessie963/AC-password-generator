/**
 * 路由設定:
 * 1. get /form (顯示表單)
 * 2. post /form-data (產生密碼)
 */

import express from 'express';
import expHBS from 'express-handlebars';
import getResult from './utils/getResult.js';

const app = express();
const port = 3000;
const hbs = expHBS.create();
// 註冊 helper function
hbs.handlebars.registerHelper('includeCharSet', function (charSets, charSet) {
  return charSets?.includes(charSet);
});

app.engine('.hbs', expHBS.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // 解析request 的 中介軟體body-parser

// 首頁顯示表單
app.get('/', (req, res) => {
  res.redirect('/form');
});

app.get('/form', (req, res) => {
  const resultDisplayState = 'd-none';
  res.render('form', { resultDisplayState });
});

// 產生密碼
app.post('/form-data', (req, res) => {
  const reqBody = req.body;
  const resultDisplayState = 'd-block';
  const { resultType, result } = getResult(reqBody);
  res.render('form', { reqBody, resultDisplayState, resultType, result });
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
