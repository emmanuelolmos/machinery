<!-- Modal -->
<div class="modal fade" id="showChecksModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="showChecksModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="showChecksModalLabel">Checks</h1>
                <button class="btn btn-dark ms-2 mt-1" type="button" data-bs-toggle="modal" data-bs-target="#addCheckModal"><i class="bi bi-plus-circle"></i></button>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <div class="table-responsive">
                    <table id="tableChecksModal" class="text-center" style="width:100%;">
                        <thead>
                            <tr>
                                <th class="col-8 p-2 bg-black text-white" scope="col">CHECK</th>
                                <th class="col-4 p-2 bg-black text-white" scope="col">AGREGAR</th>
                            </tr>
                        </thead>

                        <tbody id="tbodyChecksModal">

                            <!-- Registros de checks -->        

                        </tbody>
                    </table>

                    <div id="divMessageTableChecksModal" class="mt-2 text-center text-danger">
                            <!-- Mensaje de error -->
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>