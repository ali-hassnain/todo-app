const mongoose = require("mongoose");
let todoSchema = require("./model");
const create = async (payload) => {
  try {
    const todo = await todoSchema.create(payload);
    return {
      success: true,
      payload: todo,
      message: "User created successfully",
      errors: null,
    };
  } catch (err) {
    return {
      success: false,
      payload: null,
      errors: err,
      message: "User could not be created",
    };
  }
};

const update = async (id, payload) => {
  try {
console.log("id ==> ", id)
    const todo = await todoSchema.findByIdAndUpdate(id, {
      title: payload.title, description: payload.description, status: payload.status
    },   {
      new: true
        }
    );


    console.log("todo ====> ", todo)

    return {
      success: true,
      payload: todo,
      message: "User updated successfully",
      errors: null,
    };
  } catch (err) {
    throw err
    return {
      success: false,
      payload: null,
      errors: "List could not be updated",
      message: "List could not be updated",
    };
  }
};

const remove = async (id) => {
  try {
    const todo = await todoSchema.findByIdAndRemove(id);
    return {
      // success: true,
      payload: todo,
      // message: "List removed successfully",
      // errors: null,
    };
  } catch (err) {
    return {
      success: false,
      payload: null,
      errors: "List could not be deleted",
      message: "List could not be deleted",
    };
  }
};

const findAll = async () => {
  try {
    const todo = await todoSchema.find();
    return {
      success: true,
      payload: todo,
      message: todo ? "Todo found successfully" : "Todo does not exist",
      errors: null,
    };
  } catch (err) {
    console.log("error", err);
    return {
      success: false,
      payload: null,
      errors: "Todo could not be found",
      message: "Todo could not be found",
    };
  }
};

const find = async (id) => {
  try {
    const todo = await todoSchema.findById(id);
    return {
      success: true,
      payload: todo,
      message: todo ? "Todo found successfully" : "Todo does not exist",
      errors: null,
    };
  } catch (err) {
    return {
      success: false,
      payload: null,
      errors: "Todo could not be found",
      message: "Todo could not be found",
    };
  }
};
module.exports = {
  find,
  create,
  remove,
  update,
  findAll,
};
