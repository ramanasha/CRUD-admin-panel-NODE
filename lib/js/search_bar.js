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
                $(generateNewPetModal(client)).insertBefore('#firstScript')


            })

            $('form.delete').on('submit', function (event) {
                return confirm("¿Estás segura de que deseas borrarlo?")
            })

        }
    })

})



function generateNewPetModal(client) {
    return `
        <div id="newPet${client._id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade client">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-danger">Añadir nueva mascota</h5>
                        <span class="mx-2 text-success"><i class="fa fa-fw fa-2x fa-paw"></i></span>
                    <button type="button" data-dismiss="modal" aria-label="close">
                                <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-12">
                                    <form action="/admin/new/pet" method="POST" class="newPet">
                                        <div class="card">
                                            <div class="card-header">
                                                <h2 class="text-center text-success">Datos generales</h2>
                                                <input type="hidden" name="client_id" value=${client._id}/>
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
                                            <h2 class="text-center text-success">Datos generales</h2>
                                            <input type="hidden" name="client_id" value="${client._id}" />
                                            <div class="form-group">
                                                <input class="form-control" type="text" name="clientName" value="${client.personal.name}" placeholder="Nombre Completo"/>
                                            </div>
                                            <div class="form-group">
                                                <input class="form-control" type="text" name="clientDNI" value="${client.personal.DNI}" placeholder="DNI"/>
                                            </div>
                                            <div class="form-group">
                                                <input class="form-control" type="text" name="clientAddress" value="${client.personal.address}" placeholder="Dirección"/>
                                            </div>
                                            <div class="form-group">
                                                <input class="form-control" type="text" name="clientLocality" value="${client.personal.locality}" placeholder="Localidad"/>
                                            </div>
                                            <div class="form-group">
                                                ${generateProvinces()}
                                            </div>
                                            <div class="form-group">
                                                <input class="form-control" type="text" name="client_postal_code" value="${client.personal.postal_code}" placeholder="Código postal"/>
                                            </div>
                                            <div class="form-group">
                                                 <input class="form-control" type="date" name="client_birthday" value="1991-06-13" placeholder="Fecha de nacimiento"/>
                                            </div>
                                            <div class="form-group text-center">
                                                 <legend>Carácter</legend>
                                                 <div class="form-check">
                                                    <label class="form-check-label"> 
                                                         <input class="form-check-input mr-3" type="radio" name="client_nature" value="Colaborativo" checked/>
                                                         Colaborativo
                                                    </label>
                                                 </div>
                                                 <div class="form-check">
                                                    <label class="form-check-label">
                                                         <input class="form-check-input mr-3" type="radio" name="client_nature" value="No Colaborativo" />
                                                         No Colaborativo
                                                    </label>
                                                 </div>
                                            </div>
                                            <div class="dropdown-divider"></div>
                                            <div class="form-group text-center">
                                                <legend>Temperamento</legend>
                                                <div class="form-check">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input mr-3" type="radio" name="client_temperament" value="Fuerte" checked />
                                                        Fuerte
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input mr-3" type="radio" name="client_temperament" value="Medio"/>
                                                        Medio
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input mr-3" type="radio" name="client_temperament" value="Débil"/>
                                                        Débil
                                                    </label>
                                                </div>
                                                <div class="dropdown-divider"></div>
                                                <fieldset>
                                                    <legend class="text-warning font-weight-bold">Sexo
                                                        <div class="form-check form-check-inline">
                                                            <label class="form-check-label">
                                                                <input class="form-check-input ml-1 mr-2" type="radio" name="client_gender" value="Hombre" checked/>
                                                                Hombre
                                                            </label>
                                                            <label class="form-check-label">
                                                                <input class="form-check-input ml-1 mr-2" type="radio" name="client_gender" value="Mujer"/>
                                                                Mujer
                                                            </label>
                                                        </div>
                                                    </legend>             
                                                </fieldset>
                                            </div>
                                            <div class="form-group text-center">
                                               <label for="clientAge${index}"> Edad
                                               <input class="form-control" type="number" id="clientAge${index}" name="client_age" min="1" max="100" value="${client.personal.age}" />
                                            </div>
                                        </div>
                                        <div class="card-block client-card">
                                            <h3 class="text-center py-2 px-1">Datos de contacto</h3>
                                            <div class="dropdown-divider"></div>
                                            <div class="form-group">
                                                <input type="text" name="client_email" placeholder="Email cliente" value="${client.contact.email}" class="form-control"/>
                                            </div>
                                            <div class="form-group">
                                                <input type="text" name="client_phone1" placeholder="Teléfono cliente principal" value="${client.contact.phoneOne}" class="form-control"/>
                                            </div>
                                            <div class="form-group">
                                                <input type="text" name="client_phone2" placeholder="Teléfono cliente secundario" value="${client.contact.phoneTwo}" class="form-control"/>
                                            </div>
                                            <div class="dropdown-divider"></div>
                                            <div class="form-group">
                                                <h3 class="text-center py-2 px-1">Datos relevantes</h3>
                                                <textarea id="comment" class="form-control" name="client_comment" rows="4">${client.comment}</textarea>
                                            </div>
                                        </div>
                                        <div class="card-footer d-flex justify-content-center align-items-center">
                                            <button type="submit" class="btn alone-buttons">
                                                <i class="fa fa-2x fa-fw fa-check-square-o text-success"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div> 
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal"l>Cerrar</button>
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

function generateProvinces() {
    return `
    <select class="form-control" name="client_province">
    <option value='alava'>Álava</option>
    <option value='albacete'>Albacete</option>
    <option value='alicante'>Alicante/Alacant</option>
    <option value='almeria'>Almería</option>
    <option value='asturias'>Asturias</option>
    <option value='avila'>Ávila</option>
    <option value='badajoz'>Badajoz</option>
    <option value='barcelona'>Barcelona</option>
    <option value='burgos'>Burgos</option>
    <option value='caceres'>Cáceres</option>
    <option value='cadiz'>Cádiz</option>
    <option value='cantabria'>Cantabria</option>
    <option value='castellon'>Castellón/Castelló</option>
    <option value='ceuta'>Ceuta</option>
    <option value='ciudadreal'>Ciudad Real</option>
    <option value='cordoba'>Córdoba</option>
    <option value='cuenca'>Cuenca</option>
    <option value='girona'>Girona</option>
    <option value='laspalmas'>Las Palmas</option>
    <option value='granada'>Granada</option>
    <option value='guadalajara'>Guadalajara</option>
    <option value='guipuzcoa'>Guipúzcoa</option>
    <option value='huelva'>Huelva</option>
    <option value='huesca'>Huesca</option>
    <option value='illesbalears'>Illes Balears</option>
    <option value='jaen'>Jaén</option>
    <option value='acoruña'>A Coruña</option>
    <option value='larioja'>La Rioja</option>
    <option value='leon'>León</option>
    <option value='lleida'>Lleida</option>
    <option value='lugo'>Lugo</option>
    <option value='madrid'>Madrid</option>
    <option value='malaga'>Málaga</option>
    <option value='melilla'>Melilla</option>
    <option value='murcia'>Murcia</option>
    <option value='navarra'>Navarra</option>
    <option value='ourense'>Ourense</option>
    <option value='palencia'>Palencia</option>
    <option value='pontevedra'>Pontevedra</option>
    <option value='salamanca'>Salamanca</option>
    <option value='segovia'>Segovia</option>
    <option value='sevilla'>Sevilla</option>
    <option value='soria'>Soria</option>
    <option value='tarragona'>Tarragona</option>
    <option value='santacruztenerife'>Santa Cruz de Tenerife</option>
    <option value='teruel'>Teruel</option>
    <option selected value='toledo'>Toledo</option>
    <option value='valencia'>Valencia/Valéncia</option>
    <option value='valladolid'>Valladolid</option>
    <option value='vizcaya'>Vizcaya</option>
    <option value='zamora'>Zamora</option>
    <option value='zaragoza'>Zaragoza</option>
</select> `
}
