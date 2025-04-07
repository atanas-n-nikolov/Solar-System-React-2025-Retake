import { Router } from "express"
import planetController from "./controllers/planetsController.js";
import userController from "./controllers/userController.js";
import factsControler from "./controllers/factsController.js";
import quizController from "./controllers/quizController.js";
import commentsController from "./controllers/commentsController.js";

const routes = Router();

routes.use(commentsController);
routes.use(planetController);
routes.use(userController);
routes.use(factsControler);
routes.use(quizController);

export default routes;