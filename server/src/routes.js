import { Router } from "express"
import planetController from "./controllers/planetsController.js";
import userController from "./controllers/userController.js";
import factsControler from "./controllers/factsController.js";
import quizController from "./controllers/quizController.js";

const routes = Router();

routes.use(planetController);
routes.use(userController);
routes.use(factsControler);
routes.use(quizController);

export default routes;