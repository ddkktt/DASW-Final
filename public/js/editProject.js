const params = new URLSearchParams(window.location.search);
const globalUid = params.get('uid');
console.log(globalUid);

async function getProjects(uid) {
    let url = 'http://localhost:3001/api/projects';
    
    if (uid) {
        url += `/${uid}`;
    }
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'x-expediente': '732931'      
        }
    });

    const data = await response.json();
    return data;
}

async function getProjectInfo(uid){
    const data = await getProjects(uid);
    let title = document.getElementById('title');
    let language = document.getElementById('language');
    let description = document.getElementById('description');
    let endDate = document.getElementById('endDate');
    let difficulty = document.getElementById('difficulty');

    title.value = data.title;
    language.value = data.language;
    description.value = data.description;
    endDate.value = data.endDate;
    difficulty.value = data.difficulty;

}

getProjectInfo(globalUid)

async function editProject(uid) {
    let title = document.getElementById('title').value;
    let language = document.getElementById('language').value;
    let description = document.getElementById('description').value;
    let endDate = document.getElementById('endDate').value;
    let difficulty = document.getElementById('difficulty').value;

    console.log(`endDate: ${endDate}`);

    let editedProject = { title, language, description, endDate, difficulty };
    console.log(editedProject);

    try {
        let resp = await fetch(`http://localhost:3001/api/projects/${uid}`, {
            method: 'PUT',
            body: JSON.stringify(editedProject),
            headers: {
                "Content-type": "application/json",
            },
        });

        if (resp.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Proyecto editado!',
                text: 'Proyecto editado correctamente!',
            }).then(() => {
                window.location.href = "../html/manage_projects.html";
            })

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Error al editar el proyecto",
            })        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
        })

    }
}
  
function submitForm(event) {
    event.preventDefault(); // Evita el envío automático del formulario
  
    // Obtén los valores de los campos del formulario
    let title = document.getElementById('title').value;
    let language = document.getElementById('language').value;
    let description = document.getElementById('description').value;
    let endDate = document.getElementById('endDate').value;
    let difficulty = document.getElementById('difficulty').value;
  
    // Realiza el procesamiento y redirección
    editProject(globalUid, title, language, description, endDate, difficulty);
  }
  