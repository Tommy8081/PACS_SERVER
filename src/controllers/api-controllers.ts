import { Request, Response, NextFunction } from 'express';
import query  from '../db/query';
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}
const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}
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
      console.log(req.files);

      res.json({
        code:20000,
        data: {
          uuid: Date.now(),
        }
      });
    } catch (error) {
      next(error);
    }
  }

  
  async getUser(req: Request, res: Response, next: NextFunction){
    let queryUserSql = "select * from pacs.user t";
    console.log("执行SQL:"+queryUserSql);
    try {
      let result = await query(queryUserSql);
      result.forEach((i:any) => {
        i.key = i.id;      
      });
      res.json(
          {
            'code': 20000,
            'data': result
          }
        )
    } catch (e:any) {
      res.json(
        {
          'code': 10000,
          'data': e.toString()
        }
      )
    }
  }

  getJson(req: Request, res: Response, next: NextFunction){
    var data = require('../public/mock/test.json')
    console.log("执行getJson！");
    res.json(
      {
        'code': 20000,
        'data': data
      }
    )
  }

  userLogin(req: Request, res: Response, next: NextFunction){
    res.json(
      {
        'code': 20000,
        'data': {"token":"admin-token"}
      }
    )
  }

  userInfo(req: Request, res: Response, next: NextFunction){
    res.json(
      {
        'code': 20000,
        'data': {
          roles: ['admin'],
          introduction: 'I am a super administrator',
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          name: 'Super Admin'
        },
      }
    )
  }
}