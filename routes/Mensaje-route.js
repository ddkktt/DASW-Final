const express = require('express');

const {validarMensaje} = require('../middlewares/validar-datos.js');

const router = express.Router();
const { Message } = require('../db/Mensaje.js');

router.post('/',validarMensaje, async (req, res) => {
    const { sender, projectId, content } = req.body;
    
    const newMessage = await Message.create({ sender, projectId, content });

    res.status(201).send(newMessage);
});

router.get('/:projectId', async (req, res) => {
  try{
    const projectId = req.params.projectId;
    const messages = await Message.find({ projectId });
    res.send(messages);
  }
  catch(err){
    console.log("error con los mensajes");
  }
    
});

router.delete('/:projectId', async (req, res) => {
    const projectId = req.params.projectId;
    try {
      const result = await Message.deleteMessagesByProjectId(projectId);
      res.send({ message: 'Messages deleted successfully'});
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'An error occurred while deleting messages.' });
    }
  });
  


module.exports = router;















