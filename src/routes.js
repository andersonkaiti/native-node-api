import userController from "./controllers/user-controller.js";

const routes = [
  {
    endpoint: "/users",
    method: "GET",
    handler: userController.listUsers,
  },
];

export default routes;
