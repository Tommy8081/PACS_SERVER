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
}