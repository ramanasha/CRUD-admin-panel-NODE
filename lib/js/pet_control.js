$('div.vaccine').find('button').on('click', function () {
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

$('form.newPet').on('submit', function (event) {
    let vaccinesGroup = JSON.stringify($(`.vaccineGroup input`).serializeArray());
    $('.vaccines').attr("value", vaccinesGroup)
    let diseasesGroup = JSON.stringify($(`.diseasesGroup input`).serializeArray());
    $('.diseases').attr("value", diseasesGroup)
})

$('div.diseases').find('button').on('click', function () {
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