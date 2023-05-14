const {mongoose} = require('./connectdb');


const taskSchema = mongoose.Schema({
    uid: {
      type: String,
      unique: true,
      required: true,
    },
    projectId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    encargado: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
  });
  
  taskSchema.statics.createTask = async function(uid, projectId, title, status = "todo") {
    let encargado = null
    const task = new this({
      uid,
      projectId,
      title,
      encargado,
      status,
    });
    const newTask = await task.save();
    return newTask;
  };
  

  taskSchema.statics.getTasksByProject = async (projectId) => {
    let tasks = await Task.find({ projectId });
    return tasks;
  };
  
  taskSchema.statics.getTaskByID = async (uid) => {
    let task = await Task.findOne({ uid });
    return task;
  };

  taskSchema.statics.updateTaskStatus = async function(uid, newStatus, Nuser) {
    const task = await this.findOne({ uid });
    if (!task) {
      throw new Error("Task not found");
    }
    task.encargado = Nuser;
    task.status = newStatus;
    const updatedTask = await task.save();
    return updatedTask;
  };
  
  taskSchema.statics.deleteTask = async(uid) => {
    let t = await Task.findOneAndDelete({uid});
    console.log("Borrado");
    return t;
}
  
  
const Task = mongoose.model("Task", taskSchema);

module.exports = { Task };
