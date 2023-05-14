const express = require('express');
const path = require('path');
const port = process.env.PORT || 3001;

//const authRouter = require('./routes/auth-route.js')
//const taskRouter = require('./routes/tasks-route.js');
const projectRouter = require('./routes/project-route.js')
const userRouter = require('./routes/users_route.js')
const messageRouter = require ('./routes/Mensaje-route.js')
const taskRouter = require ('./routes/task-route.js')
const cors = require('cors');
const authRouter = require('./routes/auth-route.js')


const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(cors({
    origin: 'http://127.0.0.1:5500'
  }));

//app.use('/api/tasks', taskRouter)
app.use('/api/login', authRouter)
app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/messages' , messageRouter)
app.use('/api/task' , taskRouter)



app.listen(port, ()=> console.log("Running on port "+ port))

