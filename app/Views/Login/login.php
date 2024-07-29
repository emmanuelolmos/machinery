<?php
    session_start();

    //Se verifica que el usuario haya iniciado sesión
    if(isset($_SESSION['id_user'])){
        header('Location: ../../../');
    }
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="../../../assets/css/bootstrap/bootstrap.css">
</head>
<body class="bg-primary">
    
    <div class="bg-white card mx-auto mt-5" style="width: 400px;">
        <br>
        <div id='titleLogin'>
            <h1 class="text-center mt-3 fs-2 fw-bold">INICIO DE SESIÓN</h1>
            <h2 class="text-center mt-1 fs-6">Ingresa tu teléfono y contraseña</h2>
        </div>

        <form id="formLogin">
            <div id="groupPhone" class="mt-4 text-center row">
                <label for="inputPhoneLogin">Número telefónico</label>
                <input id="inputPhoneLogin" name="inputPhoneLogin" class="mx-auto mt-2 border rounded" style="width: 300px;" type="tel" placeholder="Ingresa tú número teléfonico">
            </div>

            <div class="mt-3 text-center row">
                <label for="inputPasswordLogin">Contraseña</label>
                <input id="inputPasswordLogin" name="inputPasswordLogin" class="mx-auto mt-2 border rounded" style="width: 300px;" type="password" placeholder="Ingresa tú contraseña">
            </div>

            <div class="form form-switch text-center mt-3">
                <input class="form-check-input" type="checkbox" role="switch" id="togglePassword">
                <label class="form-check-label" for="mostrarPassword">Mostrar Contraseña</label>
            </div>

            <div class="text-center mt-5 mb-5">
                <button class="btn btn-primary">Iniciar sesión</button>
            </div>
        </form>
    </div>

    <!-- Scripts --> 
    <script src="../../../assets/js/jquery/jquery.min.js"></script>
    <script src="../../../assets/js/login/login.js"></script>
</body>
</html>