import  express, { Router, Request, Response, NextFunction } from 'express';
import { ApiControllers } from '../controllers/api-controllers';
import multer from 'multer';
import path from 'path';
const apiControllers = new ApiControllers;
//指定上传文件的存储空间
const storage = multer.diskStorage({
  //指定上传的目录
  destination: path.join(__dirname, '../public', 'uploads'),
  filename(_req: Request, file: Express.Multer.File, callback) {
    // callback 第二个参数是文件名 时间戳.jpg
    callback(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({storage})
export class ApiRouter {
  router: Router;
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', apiControllers.getHomePage);
    this.router.get('/articles', apiControllers.getArticlesPage);
    this.router.get('/about-me', apiControllers.getAboutPage);
    this.router.post('/upload',upload.single('file'),apiControllers.upload);
  }
}