<!-- Modal -->
<div class="modal fade" id="addUserModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="addUserModalLabel">Nuevo usuario</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

            <form id="formAddUserModal">
                <div id="errorMessageAddUser" class="text-center">
                    <!--Mensaje de error-->
                </div>
                <div class="text-center">
                    <label for="nameAddUser">Nombre:</label>
                    <input id="nameAddUser" name="nameAddUser" type="text" placeholder="Ingresa el nombre" style="margin-left: 8px; width: 250px;">
                </div>
                <div class="text-center mt-4">
                    <label for="phoneAddUser">Teléfono:</label>
                    <input id="phoneAddUser" name="phoneAddUser" type="text" placeholder="Ingresa el número teléfonico" style="margin-left: 8px; width: 250px;">
                </div>
                <div class="text-center mt-4">
                    <label for="passwordAddUser">Contraseña:</label>
                    <input id="passwordAddUser" name="passwordAddUser" type="text" placeholder="Ingresa la contraseña" style="margin-left: 8px; width: 250px;">
                </div>
                <div class="text-center mt-4">
                    <label for="roleAddUser">Cargo:</label>
                    <select name="roleAddUser" id="roleAddUser" style="margin-left: 8px; width: 250px;">
                        <option value="1">SUPERADMIN</option>
                        <option value="2">ADMIN</option>
                        <option value="3">TECHNICAL</option>
                    </select>
                </div>
                <div id="divCompanyAddUser" class="text-center mt-4">
                    <label for="companyAddUser">Empresa:</label>
                    <!--<select name="selectCompanyAddUser" id="companyAddUser" style="margin-left: 8px; width: 250px;">
                    Lista de empresas
                    </select>-->
                </div>
                <div class="text-center mt-4">
                    <button type="submit" class="btn btn-primary">Registrar</button>
                </div>
            </form>

        </div>
        
        </div>
    </div>
</div>