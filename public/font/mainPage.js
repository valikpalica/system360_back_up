document.addEventListener("DOMContentLoaded", async ()=>{
    let response = await fetch('/getInfo/alltypeAnceta');
    let type_anceta = await response.json();
    console.log(type_anceta.answer);
    create_selector(type_anceta.answer)
});

const create_selector = (array) =>{
    let div  = document.getElementById('type_anceta');
    let label  = document.createElement('label');
    label.textContent = 'Вибіріть тип анкети для оцінювання';
    div.appendChild(label);
    let selector = document.createElement('select');
    selector.name = 'type_anceta';
    selector.className = 'browser-default';
    array.forEach(element => {
        let option = document.createElement('option');
        option.value = element.id_type_anceta;
        option.textContent = element.type_anceta;
        selector.appendChild(option);
    });
    div.appendChild(selector);
}