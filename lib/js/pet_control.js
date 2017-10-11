$(document).on('click', 'button.newVaccine', function () {
    let liPosition = $(this).parent().next('.list-group').children().length;
    let $list_item = $('<li>', { class: "list-group-item" }),
        $input_item = $('<input />',
            {
                class: "form-control",
                type: "text",
                placeholder: "Nueva vacuna",
                name: `vaccine${liPosition}`
            });

    $list_item.append($input_item)
    let $list_group = $(this).parent().next('.list-group')
    $list_item.appendTo($list_group)
    $(this).parent().find('#vaccines').attr("value", liPosition + 1)
})

$(document).on('submit', 'form.newPet', function (event) {
    let $vaccineGroupElement = $(this).find('.vaccineGroup input'),
        $diseaseGroupElement = $(this).find('.diseasesGroup input');

    let vaccinesGroup = JSON.stringify($vaccineGroupElement.serializeArray());
    $('.vaccines').attr("value", vaccinesGroup)
    let diseasesGroup = JSON.stringify($diseaseGroupElement.serializeArray());
    $('.diseases').attr("value", diseasesGroup)
})

$(document).on('click', 'button.newDisease', function () {
    let liPosition = $(this).parent().next('.list-group').children().length;
    let $list_item = $('<li>', { class: "list-group-item" }),
        $input_item = $('<input />',
            {
                class: "form-control",
                type: "text",
                placeholder: "Nueva Enfermedad",
                name: `disease${liPosition}`
            });

    $list_item.append($input_item)
    let $list_group = $(this).parent().next('.list-group')
    $list_item.appendTo($list_group)
    $(this).parent().find('.diseases').attr("value", liPosition + 1)

})