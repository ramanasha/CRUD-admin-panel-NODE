$('.search-bar').find('button[type="submit"]').on('click', function (event) {
    event.preventDefault();
    let $tableBody = $('.table').find(' #clientData'),
        $inputValue = $(this).parent().find('input#clientSearch').val();

    $tableBody.append($('<div>', { class: 'loader' }));

    $.post('/admin/clients/search', { clientData: $inputValue }).done(function (clients) {

        $tableBody.empty();
        if (clients.length === 0) {
            $tableBody.append($('<p>',
                {
                    class: "text-center text-danger lead",
                    text: "No se han encontrado resultados"
                }))
        } else {

            $.each($('div.client'), function (index, modal) {
                $(modal).remove();
            })

            clients.forEach((client, index) => {
                $tableBody.append(generateClientDisplay(client, index));
                $(generateInfoClientModal(client, index)).insertBefore('#firstScript')
                $(generateEditClientModal(client, index)).insertBefore('#firstScript')

            })

            $('form.delete').on('submit', function (event) {
                return confirm("¿Estás segura de que deseas borrarlo?")
            })

        }
    })

})

function generateEditClientModal(client, index) {
    return `
    <div id="clientEdit${index}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade client">
       <div class="modal-dialog" role="document">
           <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-danger">Editar cliente
                        <span class="ml-2 py-1">${client._id}</span>
                    </h5>
                    <span class="mx-2 text-success"><i class="fa fa-2x fa-fw fa-users"></i></span>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>    
                <div class="modal-body">
                    <div class="container-fluid>
                        <div class="row">
                            <div class="col-12">
                                <form class="editClient" action="/admin/clients/edit" method="POST">
                                    <div class="card">
                                        <div class="card-header">
                                            <h2 class="text-center text-success">Datos generales</div>
                                        </div>
                                    </div>
                                </form>
                            </div> 
                        </div>
                    </div>
                </div> 
            </div>
        </div> 
    </div>`
}


function generateInfoClientModal(client, index) {
    return `
     <div id="client${index}" tabindex="1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade client">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-danger">${client._id}</h5>
                    <span class="mx-2 text-success"><i class="fa fa-2x fa-fw fa-users"></i></span>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid>
                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title text-warning text-center mb-2 py-1 px-2">${client.personal.name}</h4>
                                        <div class="dropdown-divider"></div>
                                        <h3 class="text-success mb-2 py-2 px-1">Datos generales</h3>
                                        <div class="client-data d-flex flex-column">
                                            <span class="alert alert-warning">
                                                <strong class="mr-4">DNI</strong>
                                                <h6 class="card-subtitle my-2 text-muted d-inline">${client.personal.DNI}</h6>
                                            </span>
                                            <span class="alert alert-warning">
                                                <strong class="mr-4">LOCALIDAD</strong>
                                                <h6 class="card-subtitle my-2 text-muted d-inline">${client.personal.locality}</h6>
                                            </span>
                                            <span class="alert alert-warning">
                                                <strong class="mr-4">PROVINCIA</strong>
                                                <h6 class="card-subtitle my-2 text-muted d-inline">${client.personal.province}</h6>
                                            </span>
                                            <span class="alert alert-warning">
                                                <strong class="mr-4">DIRECCIÓN</strong>
                                                <h6 class="card-subtitle my-2 text-muted d-inline">${client.personal.address}</h6>
                                            </span>
                                            <span class="alert alert-warning">
                                                <strong class="mr-4">CÓDIGO POSTAL</strong>
                                                <h6 class="card-subtitle my-2 text-muted d-inline">${client.personal.postal_code}</h6>
                                            </span>
                                            <span class="alert alert-warning">
                                                <strong class="mr-4">FECHA NACIMIENTO</strong>
                                                <h6 class="card-subtitle my-2 text-muted d-inline">${new Date(client.personal.birthday).toLocaleDateString("en-Es")}</h6>
                                            </span>
                                            <span class="alert alert-warning">
                                                <strong class="mr-4">EDAD</strong>
                                                <h6 class="card-subtitle my-2 text-muted d-inline">${client.personal.age}</h6>
                                            </span>
                                            <span class="alert alert-warning">
                                                <strong class="mr-4">GÉNERO</strong>
                                                <h6 class="card-subtitle my-2 text-muted d-inline">${client.personal.gender}</h6>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="card-block client-card">
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-12 col-sm-8 offset-sm-2">
                                                    <h2 class="text-center text-success">Datos de contacto</h2>
                                                    <table class="table table-responsive table-hover tablesmall">
                                                        <thead>
                                                             <tr>
                                                                 <th><i class="fa fa-fw fa-envelope"></i></th>
                                                                 <th><i class="fa fa-2x fa-fw fa-mobile"></i></th>
                                                                 <th><i class="fa fa-2x fa-fw fa-mobile"></i></th>
                                                             </tr>
                                                         </thead>
                                                         <tbody>
                                                               <tr>
                                                                  <td><a href="mailto:${client.contact.email}">${client.contact.email}</a></td>
                                                                  <td><a href="mailto:${client.contact.phoneOne}">${client.contact.phoneOne}</a></td>
                                                                  <td><a href="mailto:${client.contact.phoneTwo}">${client.contact.phoneTwo}</a></td>  
                                                             </tr>
                                                         </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <h3 class="text-center py-2 px-1">Datos de interés</h3>
                                        <div class="dropdown-divider"></div>
                                        <p class="card-text">${client.comment}</p>
                                        <div class="client-attitude py-2 px-1">
                                            <span class="mr-3 font-weight-bold">Carácter:</span>
                                                <mark class="font-weigth-normal font-italic">${client.attitude.nature}</mark>
                                            <span class="ml-1 mr-3 font-weight-bold">Temperamento:</span>
                                                <mark class="font-weigth-normal font-italic">${client.attitude.temperament}</mark>
                                        </div>
                                        <div class="dropdown-divider"></div>
                                    <div class="card-footer d-flex justify-content-center align-items-center">
                                        <form action="/admin/clients/remove" method="POST" class="delete">
                                           <input type="hidden" value=${client._id} name="clientID"/>
                                           <button class="btn alone-buttons" type="submit"><i class="fa fa-2x fa-fw fa-trash text-danger"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>`
}

function generateClientDisplay(client, index) {
    return `
    <tr>
        <td>
           <button type="button" data-toggle="modal" data-target="#client${index}" class="alone-buttons">
             <i class="fa fa-eye fa-fw text-success"></i>
           </button>
           <button type="button" data-toggle="modal" data-target="#clientEdit${index}" class="alone-buttons">
              <i class="fa fa-pencil fa-fw text-warning"></i>
           </button>
           <button type="button" data-toggle="modal" data-target="#newPet${client._id}" class="alone-buttons">
              <i class="fa fa-paw fa-fw text-danger"></i>
           </button>
        </td>
        <td>${client.personal.name}</td>
        <td>${client.contact.phoneOne} / ${client.contact.phoneTwo}</td>
        <td>${client.contact.email}</td>
        <td class="petInfo">
           <button type="button" title="Ver datos de mascota" class="alone-buttons petDisplay text-warning">
               <i class="fa fa-2x fa-fw fa-arrow-down"></i>
           </button>
        </td>        
    </tr>`
}


