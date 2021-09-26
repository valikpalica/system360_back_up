document.addEventListener("DOMContentLoaded", async ()=>{
        createSlider();
        let specialize =  await get_specialize();
        create_selector(specialize.array);
});


const create_selector = (array) =>{
    let select = document.getElementById('specialize');
    console.log(array);
    array.forEach(element => {
        let option = document.createElement('option');
        option.value = element.specialize;
        option.textContent = element.specialize;
        select.append(option);
    });
};
function createSlider() {
    const date = new Date;
    document.getElementById('slider').max = date.getFullYear();
    document.getElementById('slider').min = 2000;
}


const get_specialize = async () =>{
    let res = await fetch('/getInfo/specialize');
    let specialize = await res.json();
    return specialize;
}