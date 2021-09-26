document.addEventListener("DOMContentLoaded", async function(event) {
        event.preventDefault();
        let specialize =  await get_specialize();

});


const create_selector = (array) =>{
    let select = document.getElementById('specialize');
    array.forEach(element => {
        let option = document.createElement('option');
        option.value = element.value;
        option.textContent = element.value;
        select.append(option);
    });
};

const get_specialize = async () =>{
    let res = await fetch('/getInfo/specialize');
    let specialize = await res.json();
    return specialize;
}