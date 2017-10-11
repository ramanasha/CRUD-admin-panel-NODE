$('tbody').attr('id', 'clientData')
$(document).on('click', 'button.petDisplay', function () {
    let $parentTd = $(this).parent(),
        petIDS = $parentTd.children('span.d-none')
    $parentTd.children('button.petDisplay').remove()
    $parentTd.append($('<div>', { class: "loader" }))

    if (petIDS.length === 0) {
        $parentTd.append($('<p>', { class: "text-danger", text: "No tiene mascotas aun" }));
        $parentTd.children('div.loader').remove();
    } else {
        petIDS.each(function () {
            $.post('/admin/pet/info', { pet_id: $(this).text() }).done(function (pet) {
                let $linkPet = $('<a>', { href: `/admin/pet/control/${pet._id}`, target: "_blank" }),
                    $petName = $('<mark>', { class: "mt-1 d-block font-weight-bold", text: pet.personal.name })
                $linkPet.append($petName)
                $parentTd.append($linkPet)
                $parentTd.children('div.loader').remove()
            })
        })
    }
})

$(document).on('submit', 'form.delete', function (event) {
    return confirm("¿Estás segura de que deseas borrarlo?")
})