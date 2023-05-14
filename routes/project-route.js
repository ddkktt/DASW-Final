const router = require('express').Router();
const {validarBodyProyecto} = require('../middlewares/validar-datos.js');
//const {validarToken} = require('../middlewares/validar-datos.js');
const {Proyecto} = require('../db/Proyecto.js');
const {nanoid} = require('nanoid')

router.get('/', async(req,res) => {
    let filtro = {}
    let {title, description, available} = req.query;
    if(title){
        filtro.title = new RegExp(title, 'i');
    }
    if(description){
        filtro.description = new RegExp(descripcion, 'i');
    }
    if(available!=undefined){
        console.log("available" ,available);
        filtro.available = available== "true" ? true : false;
    }

    let projects = await Proyecto.getProjects(filtro);
    res.send(projects);
})

router.get('/:uid', async(req, res) => {
    let uid = req.params.uid;
    let project = await Proyecto.getProjectByID(uid);
    res.send(project);
})

router.post('/', validarBodyProyecto, async (req, res) => {
    let {title, description, creationDate, available, creator, difficulty, language, endDate} = req.body;
    //console.log(nanoid());
    let newDoc = await Proyecto.crearProyecto({uid: nanoid(), title, description, creationDate, available, creator, difficulty, language, endDate});
    res.status(201).send(newDoc);
})

router.put('/:uid', async (req, res) => {
    let uid = req.params.uid;
    let {title, description, creator, language, endDate, difficulty} = req.body;

    let projectDoc = await Proyecto.getProjectByID(uid);

    if(!projectDoc) {
        res.status(404).send({error: "Project not found"});
        return;
    }

    // req.body.email = req.params.email;


    let updateProject={}

    if(title){
        updateProject.title = title;
    }
    if(description){
        updateProject.description = description;
    }
    if(creator){
        updateProject.creator = creator;
    }
    if(language){
        updateProject.language = language;
    }
    if(endDate){
        updateProject.endDate = endDate;
    }
    if(difficulty){
        updateProject.difficulty = difficulty;
    }

    //projectDoc.actualizarProyecto(uid, updateProject);

    let changedUser = await Proyecto.actualizarProyecto(uid, updateProject);
        // fs.writeFileSync(path.join('data', 'users.json'), JSON.stringify(users));
    res.send(changedUser);


})

router.delete('/:uid', async(req, res) => {
    let uid = req.params.uid;
    let userDoc = await Proyecto.getProjectByID(uid);
    console.log(userDoc);

    if(!userDoc){
        res.status(404).send({error: "No existe proyecto"})
        return;
    }

    let deleted = await Proyecto.borrarProyecto(uid);
    res.send(deleted);
    console.log('Usuario borrado');
    console.log(deleted);

})

router.put('/:uid/notavailable', async(req,res) => {
    let uid = req.params.uid;
    let {available} = req.body;
    
    let projectDoc = await Proyecto.getProjectByID(uid);

    if(!projectDoc) {
        res.status(404).send({error: "Project not found"});
        return;
    }

    projectDoc.available = available;
    await projectDoc.save();

    res.status(200).send({success: "Project updated"});


    //setProyectStatus
})
router.put('/:uid/participants', async (req, res) => {
    let uid = req.params.uid;
    let participant = req.body.participant;

    let projectDoc = await Proyecto.getProjectByID(uid);

    if(!projectDoc) {
        res.status(404).send({error: "Project not found"});
        return;
    }
    console.log(participant);

    let updatedProject = await Proyecto.addParticipant(uid, participant);

    res.send(updatedProject);
});


module.exports = router;