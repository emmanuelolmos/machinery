<!-- Modal -->
<div class="modal fade" id="editUserModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="editUserModalLabel">Editar usuario</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

            <form id="formEditUserModal">
                <div id="divIdEditUser">
                    <!--Id oculto-->
                </div>
                <div id="errorMessageEditUser" class="text-center">
                    <!--Mensaje de error-->
                </div>
                <div id="divNameEditUser">
                    <label class="form-label" for="name">Nombre:</label>
                    <!--Nombre del usuario-->
                </div>
                <div id="divPhoneEditUser" class="mt-3">
                    <label class="form-label" for="phone">Teléfono:</label>
                    <!--Teléfono del usuario-->
                </div>
                <div id="divPasswordEditUser" class="mt-3">
                    <label class="form-label" for="password">Contraseña:</label>
                    <!--Contraseña-->
                </div>
                <div id="divRoleEditUser" class="mt-3">
                    <label class="form-label" for="role">Cargo:</label>
                    <!--Roles-->
                </div>
                <div id="divCompanyEditUser" class="mt-3">
                    <label class="form-label" for="role">Empresa:</label>
                    <!--Roles-->
                </div>
                <div class="text-center mt-4">
                    <button type="submit" class="btn btn-primary">Editar</button>
                </div>
            </form>

        </div>
        
        </div>
    </div>
</div>