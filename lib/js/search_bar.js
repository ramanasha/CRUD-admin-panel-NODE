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
            clients.forEach((client, index) => {
                $tableBody.append(generateClientDisplay(client, index));
            })
        }
    })

})

function generateClientDisplay(client, index) {
    return `
      <tr>
         <td>
         <button type="button" data-toggle="modal" data-target="#client${index}" class="alone-buttons">
           <i class="fa fa-eye fa-fw text-success"></i>
         </button>
         <td>
      </tr>
    `
}
/*
tr
td
    button.btn(type='button', data-toggle='modal', data-target='#client' + index).alone-buttons
        i.fa.fa-eye.fa-fw.text-success
    button.btn(type='button' , data-toggle='modal', data-target='#clientEdit' + index).alone-buttons
        i.fa.fa-pencil.fa-fw.text-warning
    button(type="button" title="Añadir nueva mascota" data-toggle='modal', data-target="#newPet" + client._id).alone-buttons
        i.fa.fa-fw.fa-paw.text-danger
*/