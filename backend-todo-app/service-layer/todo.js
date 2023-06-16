const {
  create,
  find,
  remove,
  update,
  findAll,
} = require("../data-access-layer/todo/todo");

const createTodo = async (req, res) => {
  const user = await create(req.body);
  return res.json(user);
};

const getTodo = async (req, res) => {
  const todoId = Number(req.params?.id);
  const todo = await find(todoId);
  return res.json(todo);
};

const getTodos = async (req, res) => {
  const todo = await findAll();
  return res.json(todo);
};

const updateTodo = async (req, res) => {
  const todo = await update(req.body.id, req.body);
  return res.json(todo);
};

const deleteTodo = async (req, res) => {
  const todo = await remove(req.query.id);
  return res.json(todo);
};
module.exports = {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  getTodo,
};
