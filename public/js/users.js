
async function login() {
  let email = document.getElementById("inputEmail-l").value;
  let password = document.getElementById("inputPassword-l").value;

  let user = {
      email: email,
      password: password
  };
  console.log(user);

  let response = await fetch('/api/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
  });

  if (response.ok) {
      let responseBody = await response.json();
      let token = responseBody.token;

      sessionStorage.setItem('user_token', token);
      sessionStorage.setItem('user_email', user.email)
      alert("Usuario logeado correctamente");
  } else {
      let error = await response.json();
      alert("Error: " + error.error);
  }
}




  async function Registro() {

        let Nombres = document.getElementById("inputFirstName").value;
        let Apellidos = document.getElementById("inputLastName").value;
        let username = document.getElementById("inputUser").value;
        let email = document.getElementById("inputEmail").value;
        let password = document.getElementById("inputPassword").value;
        let confirmedPass = document.getElementById("inputPassword2").value;
   
        let body = {
          "Nombres": Nombres,
          "Apellidos": Apellidos,
          "username": username,
          "email": email,
          "password": password
        };
        console.log(body)
    
      
if (password == confirmedPass) {
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (response.status == 201 || response.status == 200) {
        alert("Usuario registrado exitosamente");
      } else {
        response.text().then(text => {
          alert("Error: " + text);
        });
      }
    })
    .catch(error => {
      alert("Error: " + error.message);
    });
  } else {
    alert("Las contraseñas no coinciden!");
  }
}

async function renderProfile(){
  let token = sessionStorage.getItem('user_token')
  let email = sessionStorage.getItem('user_email')
  let resp = await fetch(`/api/users/${email}`, {
      method: 'GET'
    });
  
  let user = await resp.json()
  console.log("here",user);
  let profile = document.getElementById('userData');
  profile.innerHTML = 
  `
  <div class="form-group mt-5">
                  <label for="">Nombre</label>
                  <input type="text" name="" id="InputNombre" class="form-control fc-edit-profile" value="${user.Nombres}" aria-describedby="helpId required">
                </div>

                <div class="form-group">
                    <label for="">Apellido</label>
                    <input type="text" name="" id="InputApellido" class="form-control fc-edit-profile" value="${user.Apellidos}" aria-describedby="helpId" required>
                </div>

                <div class="form-group">
                <label for="">Email</label>
                <input type="text" name="" id="InputEmail" class="form-control fc-edit-profile" value="${user.email}" aria-describedby="helpId" required>
            </div>


                <button type="submit"  onclick="editarUsuario('${user.email}')" value="Submit" class="form-control fc-edit-profile" > Submit</button>

`

}
  
// En la función editarUsuario
async function editarUsuario(id) {
  const email = document.getElementById("InputEmail").value;
  const fName = document.getElementById("InputNombre").value;
  const lName = document.getElementById("InputApellido").value;
  let token = sessionStorage.getItem('user_token');

  let response = await fetch('/api/users/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({"email":email,"password":null,"Nombre":fName,"Apellidos":lName, })
  });
  if(email){
    sessionStorage.setItem('user_email', email)
  }

  const usuarioActualizado = await response.json();
  console.log('Usuario actualizado:', usuarioActualizado);
  alert('Cambio realizado exitosamente');
  return usuarioActualizado;

}

function borrarLogin(){
  let login = document.getElementById('Login')
  let logeado = sessionStorage.getItem('user_email')
  if (logeado){
      login.innerHTML = ''
  }
}
renderProfile()