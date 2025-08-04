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

  createUser(request, response) {
    const { body } = request;

    const lastUserId = users[users.length - 1].id;

    const newUser = {
      id: lastUserId + 1,
      name: body.name,
    };

    users.push(newUser);

    response.status(200).send(newUser);
  },

  updateUser(request, response) {
    let id = +request.params.id;
    const { name } = request.body;

    const userExists = users.find((user) => user.id === id);

    if (!userExists) {
      return response.status(400).send({
        error: "User not found",
      });
    }

    users[id - 1] = {
      ...users[id - 1],
      name,
    };

    response.status(200).send({
      id,
      name,
    });
  },

  deleteUser(request, response) {
    let id = +request.params.id;

    users.splice(id - 1, 1);

    response.status(200).send({ deleted: true });
  },
};

export default userController;
