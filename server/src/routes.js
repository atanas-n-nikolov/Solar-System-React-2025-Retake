import { Router } from "express"
import planetController from "./controllers/planetsController.js";
import userController from "./controllers/userController.js";

const routes = Router();

routes.use(planetController);
routes.use(userController);

export default routes;