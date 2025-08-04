import { users } from "../mocks/users.js";

const userController = {
  listUsers(request, response) {
    const { order } = request.query;

    const sortedUsers = users.sort((a, b) => {
      if (order === "desc") {
        return a.id < b.id ? 1 : -1;
      }

      return a.id > b.id ? 1 : -1;
    });

    response.status(200).send(sortedUsers);
  },

  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === +id);

    if (!user) {
      return response.status(400).send({ error: "User not found" });
    }

    response.status(200).send(user);
  },
};

export default userController;
