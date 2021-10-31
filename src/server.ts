import express, { Express, Request, Response, NextFunction } from 'express';
import { ApiRouter } from './routes/api-routes';
import { json, urlencoded } from "body-parser";
import mysql from 'mysql';
const port = 5000;

const app: Express = express();
const apiRouter = new ApiRouter;
const jsonParser = json();
const urlencodedParser = urlencoded({ extended: false, limit: 1024 * 1024 * 5 });
 // 连接数据库
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "PACS"
});
app.use((request: Request, response: Response, next: NextFunction) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use(jsonParser);
app.use(urlencodedParser);
app.use('', apiRouter.router)

app.use((request: Request, response: Response) => {
  response.type('text/plain');
  response.status(404)
  response.send('Page is not found.');
})

db.connect(err => {
  if (err) throw err;
  console.log("数据库连接成功");
});
app.listen(port, () => {
  console.log(`server is running on http://localhost:5000`)}
);