$(document).ready(function() {
  $("#clave2").keyup(function() {
    var clave = $('#clave').val();
    var clave2 = $('#clave2').val();

    if (clave == clave2) {
      $('#error2').text("Las contraceñas coinciden!").css("color","green");
    }
    else{
      $('#error2').text("Las contraceñas no Coinciden!").css("color","red");

    }

  });
  $("#email").keyup(function() {
    var email = $('#email').val();
        fetch('http://localhost:4000/listaUser')
          .then(res => res.json())
          .then(data =>{
            const resultado = data.find( traer => traer.email === email );
            console.log(resultado);
            if(resultado != null){
              $('#error3').text("ya Existe!").css("color","red");
            }else{
              $('#error3').text("puede continuar").css("color","green");
            }
        })
  });

});


function validar() {
  var celular;
  celular = document.getElementById("celular").value;

  if (celular === ""){
    alert("Introdusca un numero de celular ");
    return false;
  }else if(celular.length < 8  ){
      alert("Por favor introdusca un numero de celular valido mas de 7");
      return false;

  }else if(isNaN(celular)){
      alert("introdusca un numero de celular valido");
      return false;

  }

}
