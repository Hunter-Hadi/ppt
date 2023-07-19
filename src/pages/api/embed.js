// function fetchDataHtml() {
//   return fetch(
//     'https://3.145.201.147/chart_4B3A6006F3853B895FAFF277ED_comment_count.html',
//   )
//     .then((response) => response.text())
//     .then((text) => text);
// }

import fs from 'fs';

export default async function handler(_, res) {
  // 读取另一个 JavaScript 文件的内容
  const filePath = './embedMaxAI.js';
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  res.setHeader('Content-Type', 'application/javascript');

  res.status(200).send(fileContent);
}

// // pages/api/example.js
// export default (req, res) => {
//   const data = {
//     message: 'Hello, JavaScript!',
//   };

//   // 设置响应头为 JSON 格式
//   res.setHeader('Content-Type', 'application/json');

//   // 返回 JSON 数据
//   res.status(200).json(data);
// };
