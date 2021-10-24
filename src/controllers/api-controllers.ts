import { Request, Response, NextFunction } from 'express';

export class ApiControllers {
  getHomePage(request: Request, response: Response, next: NextFunction) {
    response.type('text/plain');
    response.send('Homepage');
  }

  getArticlesPage(request: Request, response: Response, next: NextFunction) {
    response.type('text/plain');
    response.send('All articles are here!');
  }

  getAboutPage(request: Request, response: Response, next: NextFunction) {
    response.type('text/plain');
    response.send('My name is Jimmy.');
  }
  
  upload(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body;
      console.log("上传成功！");
      console.log(req.body);
      
      res.json({
        success: true,
        data: 'avatar'
      });
    } catch (error) {
      next(error);
    }
  }
}