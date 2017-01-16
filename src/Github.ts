import {Router, Request, Response, NextFunction} from 'express';

import * as request from 'request';

export class Github {
  router: Router

  /**
   * Initialize the GithubRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Repos.
   */
  public getMyRepos(req: Request, res: Response, next: NextFunction) {
    request
        .get({
	        	url:'https://api.github.com/users/merlosy/repos',
	        	headers: {
        			'User-Agent':'merlosy'
        		}
        	}, function (error, response, body) {
      		// body is the decompressed response body
      		res.writeHead(response.statusCode, response.headers);
      		res.end(body);
      	});
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getMyRepos);
  }

}

// Create the GithubRouter, and export its configured Express.Router
const githubRoutes = new Github();
githubRoutes.init();

export default githubRoutes.router;