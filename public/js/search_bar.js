"use strict";function generateEditClientModal(n,t){return'\n    <div id="clientEdit'+t+'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade client">\n       <div class="modal-dialog" role="document">\n           <div class="modal-content">\n                <div class="modal-header">\n                    <h5 class="modal-title text-danger">Editar cliente\n                        <span class="ml-2 py-1">'+n._id+'</span>\n                    </h5>\n                    <span class="mx-2 text-success"><i class="fa fa-2x fa-fw fa-users"></i></span>\n                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">\n                        <span aria-hidden="true">&times;</span>\n                    </button>\n                </div>    \n                <div class="modal-body">\n                    <div class="container-fluid>\n                        <div class="row">\n                            <div class="col-12">\n                                <form class="editClient" action="/admin/clients/edit" method="POST">\n                                    <div class="card">\n                                        <div class="card-header">\n                                            <h2 class="text-center text-success">Datos generales</div>\n                                        </div>\n                                    </div>\n                                </form>\n                            </div> \n                        </div>\n                    </div>\n                </div> \n            </div>\n        </div> \n    </div>'}function generateInfoClientModal(n,t){return'\n     <div id="client'+t+'" tabindex="1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade client">\n        <div class="modal-dialog modal-lg" role="document">\n            <div class="modal-content">\n                <div class="modal-header">\n                    <h5 class="modal-title text-danger">'+n._id+'</h5>\n                    <span class="mx-2 text-success"><i class="fa fa-2x fa-fw fa-users"></i></span>\n                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">\n                        <span aria-hidden="true">&times;</span>\n                    </button>\n                </div>\n                <div class="modal-body">\n                    <div class="container-fluid>\n                        <div class="row">\n                            <div class="col-12">\n                                <div class="card">\n                                    <div class="card-header">\n                                        <h4 class="card-title text-warning text-center mb-2 py-1 px-2">'+n.personal.name+'</h4>\n                                        <div class="dropdown-divider"></div>\n                                        <h3 class="text-success mb-2 py-2 px-1">Datos generales</h3>\n                                        <div class="client-data d-flex flex-column">\n                                            <span class="alert alert-warning">\n                                                <strong class="mr-4">DNI</strong>\n                                                <h6 class="card-subtitle my-2 text-muted d-inline">'+n.personal.DNI+'</h6>\n                                            </span>\n                                            <span class="alert alert-warning">\n                                                <strong class="mr-4">LOCALIDAD</strong>\n                                                <h6 class="card-subtitle my-2 text-muted d-inline">'+n.personal.locality+'</h6>\n                                            </span>\n                                            <span class="alert alert-warning">\n                                                <strong class="mr-4">PROVINCIA</strong>\n                                                <h6 class="card-subtitle my-2 text-muted d-inline">'+n.personal.province+'</h6>\n                                            </span>\n                                            <span class="alert alert-warning">\n                                                <strong class="mr-4">DIRECCIÓN</strong>\n                                                <h6 class="card-subtitle my-2 text-muted d-inline">'+n.personal.address+'</h6>\n                                            </span>\n                                            <span class="alert alert-warning">\n                                                <strong class="mr-4">CÓDIGO POSTAL</strong>\n                                                <h6 class="card-subtitle my-2 text-muted d-inline">'+n.personal.postal_code+'</h6>\n                                            </span>\n                                            <span class="alert alert-warning">\n                                                <strong class="mr-4">FECHA NACIMIENTO</strong>\n                                                <h6 class="card-subtitle my-2 text-muted d-inline">'+new Date(n.personal.birthday).toLocaleDateString("en-Es")+'</h6>\n                                            </span>\n                                            <span class="alert alert-warning">\n                                                <strong class="mr-4">EDAD</strong>\n                                                <h6 class="card-subtitle my-2 text-muted d-inline">'+n.personal.age+'</h6>\n                                            </span>\n                                            <span class="alert alert-warning">\n                                                <strong class="mr-4">GÉNERO</strong>\n                                                <h6 class="card-subtitle my-2 text-muted d-inline">'+n.personal.gender+'</h6>\n                                            </span>\n                                        </div>\n                                    </div>\n                                    <div class="card-block client-card">\n                                        <div class="container">\n                                            <div class="row">\n                                                <div class="col-12 col-sm-8 offset-sm-2">\n                                                    <h2 class="text-center text-success">Datos de contacto</h2>\n                                                    <table class="table table-responsive table-hover tablesmall">\n                                                        <thead>\n                                                             <tr>\n                                                                 <th><i class="fa fa-fw fa-envelope"></i></th>\n                                                                 <th><i class="fa fa-2x fa-fw fa-mobile"></i></th>\n                                                                 <th><i class="fa fa-2x fa-fw fa-mobile"></i></th>\n                                                             </tr>\n                                                         </thead>\n                                                         <tbody>\n                                                               <tr>\n                                                                  <td><a href="mailto:'+n.contact.email+'">'+n.contact.email+'</a></td>\n                                                                  <td><a href="mailto:'+n.contact.phoneOne+'">'+n.contact.phoneOne+'</a></td>\n                                                                  <td><a href="mailto:'+n.contact.phoneTwo+'">'+n.contact.phoneTwo+'</a></td>  \n                                                             </tr>\n                                                         </tbody>\n                                                    </table>\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <h3 class="text-center py-2 px-1">Datos de interés</h3>\n                                        <div class="dropdown-divider"></div>\n                                        <p class="card-text">'+n.comment+'</p>\n                                        <div class="client-attitude py-2 px-1">\n                                            <span class="mr-3 font-weight-bold">Carácter:</span>\n                                                <mark class="font-weigth-normal font-italic">'+n.attitude.nature+'</mark>\n                                            <span class="ml-1 mr-3 font-weight-bold">Temperamento:</span>\n                                                <mark class="font-weigth-normal font-italic">'+n.attitude.temperament+'</mark>\n                                        </div>\n                                        <div class="dropdown-divider"></div>\n                                    <div class="card-footer d-flex justify-content-center align-items-center">\n                                        <form action="/admin/clients/remove" method="POST" class="delete">\n                                           <input type="hidden" value='+n._id+' name="clientID"/>\n                                           <button class="btn alone-buttons" type="submit"><i class="fa fa-2x fa-fw fa-trash text-danger"></i></button>\n                                        </form>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="modal-footer">\n                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cerrar</button>\n                </div>\n            </div>\n        </div>\n    </div>'}function generateClientDisplay(n,t){return'\n    <tr>\n        <td>\n           <button type="button" data-toggle="modal" data-target="#client'+t+'" class="alone-buttons">\n             <i class="fa fa-eye fa-fw text-success"></i>\n           </button>\n           <button type="button" data-toggle="modal" data-target="#clientEdit'+t+'" class="alone-buttons">\n              <i class="fa fa-pencil fa-fw text-warning"></i>\n           </button>\n           <button type="button" data-toggle="modal" data-target="#newPet'+n._id+'" class="alone-buttons">\n              <i class="fa fa-paw fa-fw text-danger"></i>\n           </button>\n        </td>\n        <td>'+n.personal.name+"</td>\n        <td>"+n.contact.phoneOne+" / "+n.contact.phoneTwo+"</td>\n        <td>"+n.contact.email+'</td>\n        <td class="petInfo">\n           <button type="button" title="Ver datos de mascota" class="alone-buttons petDisplay text-warning">\n               <i class="fa fa-2x fa-fw fa-arrow-down"></i>\n           </button>\n        </td>        \n    </tr>'}$(".search-bar").find('button[type="submit"]').on("click",function(n){n.preventDefault();var t=$(".table").find(" #clientData"),a=$(this).parent().find("input#clientSearch").val();t.append($("<div>",{class:"loader"})),$.post("/admin/clients/search",{clientData:a}).done(function(n){t.empty(),0===n.length?t.append($("<p>",{class:"text-center text-danger lead",text:"No se han encontrado resultados"})):($.each($("div.client"),function(n,t){$(t).remove()}),n.forEach(function(n,a){t.append(generateClientDisplay(n,a)),$(generateInfoClientModal(n,a)).insertBefore("#firstScript"),$(generateEditClientModal(n,a)).insertBefore("#firstScript")}),$("form.delete").on("submit",function(n){return confirm("¿Estás segura de que deseas borrarlo?")}))})});