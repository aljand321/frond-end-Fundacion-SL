$(document).ready(function() {
  $("#clave2").keyup(function() {
    var clave = $('#clave').val();
    var clave2 = $('#clave2').val();

    if (clave == clave2) {
      $('#error2').text("Las contraseñas coinciden!").css("color","green");
    }
    else{
      $('#error2').text("Las contraseñas no Coinciden!").css("color","red");
    }

  });
  $("#clave").keyup(function() {
    var clave = $('#clave').val();
    var clave2 = $('#clave2').val();

    if (clave == clave2) {
      $('#error2').text("Las contraseñas coinciden!").css("color","green");
    }
    else{
      $('#error2').text("Las contraseñas no Coinciden!").css("color","red");
    }

  });
  $("#email").keyup(function() {
    var email = $('#email').val();
    if(email == ""){
      $('#error3').text("La dirección de correo electrónico es obligatoria.").css("color","red");
    }else{
      fetch('http://localhost:4000/listaUser')
        .then(res => res.json())
        .then(data =>{
          const resultado = data.find( traer => traer.email === email );
          console.log(resultado);
          if(resultado != null){
            $('#error3').text("Ese email ya esta en uso. Prueba con otro").css("color","red");
          }else{
            $('#error3').text("puede continuar").css("color","green");
          }
      })
    }

  });

});


function validar() {
  var celular;
  celular = document.getElementById("celular").value;

  if (celular === ""){
    alert("Introduzca un numero de celular ");
    return false;
  }else if(celular.length <7){
      alert("Por favor introduzca un numero de celular válido");
      return false;

  }
  else if(isNaN(celular)){
      alert("introduzca un numero de celular válido");
      return false;
  }

}
