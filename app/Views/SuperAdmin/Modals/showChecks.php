<!-- Modal -->
<div class="modal fade" id="showChecksModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="showChecksModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="showChecksModalLabel">Checks</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <div class="table-responsive">
                    <table class="text-center" style="width:100%;">
                        <thead>
                            <tr>
                                <th class="col-8 p-2 bg-black text-white" scope="col">CHECK</th>
                                <th class="col-4 p-2 bg-black text-white" scope="col">AGREGAR</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td style="padding: 10px;">Limpiar con trapo</td>
                                <td class="text-center" style="padding: 10px;">
                                    <button class="btn btn-success" onclick="loadDataUser()" data-bs-toggle="modal" data-bs-target="#editUserModal">
                                        <i class="bi bi-plus-square"></i>
                                    </button>
                                </td>
                                            
                            </tr>

                            <tr>
                                <td style="padding: 10px;">Cambiar cartuchos</td>
                                <td class="text-center" style="padding: 10px;">
                                    <button class="btn btn-success" onclick="loadDataUser()" data-bs-toggle="modal" data-bs-target="#editUserModal">
                                        <i class="bi bi-plus-square"></i>
                                    </button>
                                </td>
                                            
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
</div>