import { users } from "../mocks/users.js";

const userController = {
  listUsers(_request, response) {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(users));
  },
};

export default userController;
