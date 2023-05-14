const router = require("express").Router();
const { nanoid } = require("nanoid");
const { Task } = require("../db/task.js");

router.get("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  const tasks = await Task.getTasksByProject(projectId);
  res.send(tasks);
});

router.post("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  const { title, encargado } = req.body;
  const newTask = await Task.createTask(nanoid(), projectId, title, encargado);

  res.status(201).send(newTask);
});

router.put("/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const { status ,encargado } = req.body;
console.log(encargado);
  const updatedTask = await Task.updateTaskStatus(taskId, status, encargado);
  res.send(updatedTask);
});


router.delete("/:uid", async (req, res) => {
  const { uid } = req.params;
  const deletedTask = await Task.deleteTask(uid);
  if (!deletedTask) {
    res.status(404).send({ error: "Task not found" });
    return;
  }
  res.send(deletedTask);
});

module.exports = router;
