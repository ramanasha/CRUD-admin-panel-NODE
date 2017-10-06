$('.search-bar').find('button[type="submit"]').on('click', function (event) {
    event.preventDefault();
    console.log(event.target)
    //$.post('/admin/pet/search')


})


function generateClientTemplate(client, index) {
    return `
     <tr>
        <td>
          <button type="button" class="alone-buttons data-toggle='modal' data-target='#client' + ${index}>
             <i class="fa fa-eye fa-fw text-success"></i> 
          </button>

          <button type="button" class="alone-buttons data-toggle='modal' data-target='#clientEdit' + ${index}>
          <i class="fa fa-pencil fa-fw text-warning"></i> 
          </button>

          <button type="button" class="alone-buttons data-toggle='modal' data-target='#newPet' + ${client._id}>
               <i class="fa fa-paw fa-fw text-danger"></i> 
          </button>
        </td>
        <td>
           ${client.personal.name}
        </td>
        <td>
          ${client.contact.phoneOne} / ${client.contact.phoneTwo}
       </td>
       <td>
         ${client.contact.email}
      </td>
    </tr>
    
`
        `
                    button.btn(type='button' , data-toggle='modal', data-target='#clientEdit' + ${index}).alone-buttons
                        i.fa.fa-pencil.fa-fw.text-warning
                    button(type="button" title="Añadir nueva mascota" data-toggle='modal', data-target="#newPet" + ${client._id}).alone-buttons
                        i.fa.fa-fw.fa-paw.text-danger
                td= ${client.personal.name}
                td#phones= client.contact.phoneOne + "/" + client.contact.phoneTwo        
                td= client.contact.email`

}