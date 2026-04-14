// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hey Its Anthony");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserByJob = (job) => {
  return users["users_list"].filter((user) => user["job"] === job);
}

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter((user) => user["name"] === name && user["job"] === job);
}

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

    if (name != undefined && job != undefined) { // Find user by name and job
    let result = findUserByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
  }
  else if (name != undefined) {              // Find user by name
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } 
    else if (job != undefined) {              // Find user by job
    let result = findUserByJob(job);
    result = { users_list: result };
    res.send(result);
  }
    else {                                  // No query parameters, return all users
    res.send(users);
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const generateUserId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const addUser = (user) => {
  const id = generateUserId();
  const userWithId = {
    id: id,
    name: user.name,
    job: user.job
  };
  users["users_list"].push(userWithId);
  return userWithId;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const newUser = addUser(userToAdd);
  res.status(201).send(newUser);
});

const delUser = (id) => {
    const index = users["users_list"].findIndex((user) => user["id"] === id); 
  if (index !== -1){            // User found
    users["users_list"].splice(index, 1);
    return true;
  }
  else {                  // User not found     
    return false;
  }
};

app.delete("/users/:id", (req, res) => {
  const userToDel = req.params.id;
  const deleted = delUser(userToDel);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send("Resource not found.");
  }
});

