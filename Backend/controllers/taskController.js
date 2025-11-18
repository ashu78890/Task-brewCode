import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ owner: req.user._id });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title) return res.status(400).json({ message: "Title required" });

  const task = await Task.create({
    title,
    description,
    dueDate,
    owner: req.user._id
  });

  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

  if (!task) return res.status(404).json({ message: "Task not found" });

  Object.assign(task, req.body);
  await task.save();

  res.json(task);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id
  });

  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json({ message: "Task deleted" });
};
