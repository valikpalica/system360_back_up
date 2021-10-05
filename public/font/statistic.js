document.addEventListener("DOMContentLoaded", async ()=>{
        createSlider();
        // let specialize =  await get_specialize();
        // create_selector(specialize.array);

});
document.getElementById('find').addEventListener('click',async()=>{
    let year = document.getElementById('slider').value;
    // let year = new Date(date).getFullYear();
    // console.log(year);
    let res = await fetch('/getInfo/getYearStatistic',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({year}),
    });
    let data = await res.json();
    create_table(data.answer);
});

const create_table  = (obj) =>{
    console.log(obj);
    clear_tbody();
    let tbody = document.getElementById('tbody');
    tbody.className = 'tbody';
    let tr1 = document.createElement('tr');
    let td1 = document.createElement('td');
    td1.colSpan = '2';
    td1.textContent = 'Загальна компетентність';
    td1.style = 'text-align:center';
    tr1.appendChild(td1);
    tbody.appendChild(tr1);
    obj.competnce.forEach(item=>{
        let tr_array = document.createElement('tr');
        let td_array1 = document.createElement('td');
        let td_array2 = document.createElement('td');
        td_array1.textContent = item.competence;
        td_array2.textContent = item.division.split('.')[0];
        tr_array.appendChild(td_array1);
        tr_array.appendChild(td_array2);
        tbody.appendChild(tr_array);
    });
    let tr2 = document.createElement('tr');
    let td2 = document.createElement('td');
    td2.colSpan = '2';
    td2.textContent = 'Фахова компетентність';
    td2.style = 'text-align:center';
    tr2.appendChild(td2);
    tbody.appendChild(tr2);
    obj.quastion.forEach(item=>{
        let tr_array = document.createElement('tr');
        let td_array1 = document.createElement('td');
        let td_array2 = document.createElement('td');
        td_array1.textContent = item.quastion;
        td_array2.textContent = item.division.split('.')[0];
        tr_array.appendChild(td_array1);
        tr_array.appendChild(td_array2);
        tbody.appendChild(tr_array);
    });
    document.getElementById('statistic').hidden = false;
};
const clear_tbody = () =>{
    let tr = document.getElementById('tbody');
    tr.innerHTML = '';
}
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
    document.getElementById('slider').value = 2000;
}


const get_specialize = async () =>{
    let res = await fetch('/getInfo/specialize');
    let specialize = await res.json();
    return specialize;
}