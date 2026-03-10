document.getElementById('add-field').addEventListener('click', function() {
    const container = document.getElementById('extra-fields');
    const index = container.children.length;
    const labelName = document.createElement('label');

    labelName.textContent = 'Field name:';
    labelName.htmlFor = 'extra_name_' + index;

    const inputName = document.createElement('input');

    inputName.type = 'text';
    inputName.name = 'extra_name_' + index;
    inputName.id = 'extra_name_' + index;

    const labelValue = document.createElement('label');

    labelValue.textContent = 'Value:';
    labelValue.htmlFor = 'extra_value_' + index;

    const inputValue = document.createElement('input');

    inputValue.type = 'text';
    inputValue.name = 'extra_value_' + index;
    inputValue.id = 'extra_value_' + index;


    const inputsContainer = document.createElement('div')
    inputsContainer.className = "field-container"

    inputsContainer.appendChild(labelName);
    inputsContainer.appendChild(inputName);
    inputsContainer.appendChild(labelValue);
    inputsContainer.appendChild(inputValue);
    container.appendChild(inputsContainer)
});

const form = document.getElementById('stock-data')

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let customFields = document.getElementById('extra-fields')
    let inputs = customFields.querySelectorAll('input')

    for (let i = 0; i < inputs.length; i++) {
        if (i % 2 == 1) {
            inputs[i].remove()
            continue
        }
        inputs[i].name = inputs[i].value
        inputs[i].value = inputs[i + 1].value
    }
    form.submit()
});