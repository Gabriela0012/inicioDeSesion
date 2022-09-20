Hola Carlos
Ruta http://localhost:8080    se muestra el formulario para poder registrarse.
Si quiere registrarse sin algun dato el formulario no se lo permite. Si se registra dos veces
lo manda a la ruta http://localhost:8080/registerfail que le informa que no se pudo resgistrar y tiene el boton para volver.
Si esta todo bien lo manda directamente al formulario para que ingrese

Ruta http://localhost:8080/login   se muestra la vista para el ingreso del usuario
registrado, haciendo clic en el boton "ingresar" lo manda a la ruta:
http://localhost:8080/welcome  si ingreso bien los datos lo saluda con su nombre. Si no se registro o pone mal sus datos
lo manda a la ruta http://localhost:8080/loginfail.

Haciendo click en el boton "cerrar sesion" cierra la sesion y lo manda de nuevo para registrarse a la ruta
http://localhost:8080/ 


 
