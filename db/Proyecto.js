const {mongoose} = require('./connectdb');

const projectSchema = mongoose.Schema({
    uid: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creationDate: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true,
        required: true
    },
    creator: {
        type: String,
        required: true,
    },
    participants: {
        type: Array
    },
    endDate:{
        type: String,
    },
    difficulty: {
        type: String
    },
    language:{
        type: String
    }
})

projectSchema.statics.getProjects = async(filtros) =>{
    let docs = await Proyecto.find(filtros);
    console.log(docs);
    return docs;
}

projectSchema.statics.getProjectByID = async(uid) =>{
    let doc = await Proyecto.findOne({uid});
    console.log(doc);
    return doc;
}

projectSchema.statics.crearProyecto = async(datosProyecto) =>{
    let newProject = Proyecto(datosProyecto);
    console.log(newProject);
    
    return await newProject.save();
}

projectSchema.statics.actualizarProyecto = async(uid, datosProyecto) => {
    let updatedProject = await Proyecto.findOneAndUpdate({uid}, {$set: datosProyecto}, {new: true});
    return updatedProject;
}

projectSchema.statics.borrarProyecto = async(uid) => {
    console.log(`uid: ${uid}`);
    let doc = await Proyecto.findOneAndDelete({uid});
    console.log("Borrado");
    return doc;
}

projectSchema.statics.addParticipant = async(uid, participant) => {
    let updatedProject = await Proyecto.findOneAndUpdate(
        {uid}, 
        {$push: {participants: participant}}, 
        {new: true}
    );
    console.log(participant);
    return updatedProject;
}



const Proyecto = mongoose.model('Proyecto', projectSchema );

// Tarea.crearTarea({uid:"12345", titulo: "Practica redes inalambricas", descripcion: "Practica", fechaLimite: "20230424"})
//Proyecto.getProjects()
// Tarea.getTareaByID("12345")
// Tarea.borrarTarea("1234");

module.exports = {Proyecto}
