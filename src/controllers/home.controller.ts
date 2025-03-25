import { Response, Request } from "express";

import getIndexPage from "../templates/indexTemplate";

class homeController {
  public static async serve(req: Request, res: Response) {
    const uuid: string = crypto.randomUUID();
    req.session.uuid = uuid;

    const html = getIndexPage();
    res.send(html);
  }
}

export default homeController;
