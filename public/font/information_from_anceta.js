document.getElementById('findPerson').addEventListener('click',e=>{
    e.preventDefault();
    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let patronime = document.getElementById('patronime').value;
    fetch('/getInfo/information_for_person',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({name,surname,patronime})
    }).then(async data=>{
       let response = await data.json();
       console.log(response);
       createOpinion(response);
    }).catch(e=>{
        console.error(e);
    });
});



const createOpinion = (obj) =>{
    document.getElementById('main').hidden = true;
    document.getElementById('test_commander').hidden = false;
    createMainInfo(obj);
    create_table_comander_test(obj);
    
};
const createMainInfo = (obj) =>{
    let {Rank, surname, name,patronime, Position,facultet,institute,graduation,specialize,vidpovidnist,year_point,zaohochenja,stagnenja} = obj;

    let li1 = document.createElement('li');
    li1.textContent = `${Rank}  ${surname}  ${name}  ${patronime}`;
    let li2 = document.createElement('li');
    li2.textContent = `Закінчив ${institute} у ${graduation}`;
    
    let li3 = document.createElement('li');
    li3.textContent = `Факультет ${facultet}, за спеціальністью ${specialize}`;
    let li4 = document.createElement('li');
    li4.textContent = `Займає посаду ${Position}`;
    
    let li5 = document.createElement('li');
    li5.textContent = `Відповідність займаній посаді ${vidpovidnist}`;
    let li6 = document.createElement('li');
    li6.textContent = `Кількість стягнень ${stagnenja}`;
    
    let li7 = document.createElement('li');
    li7.textContent = `Кількість заохочень ${zaohochenja}`;
    let li8 = document.createElement('li');
    li8.textContent = `Загальна оцінка за рік ${year_point}`;


    let ul = document.getElementById('main_info');
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(li5);
    ul.appendChild(li6);
    ul.appendChild(li7);
    ul.appendChild(li8);
};


const create_table_comander_test = (obj) =>{
    let {dataCom} = obj;
    let tbody_data_com = document.getElementById('tbody_data_com');
    dataCom.forEach(element => {
        let tr = document.createElement('tr');
        let td__main_quastion = document.createElement('td');
        let td_main_point = document.createElement('td');
        td__main_quastion.textContent = element.name_main;
        td_main_point.textContent = element.main_point;
        tr.appendChild(td__main_quastion);
        tr.appendChild(td_main_point);
        tbody_data_com.appendChild(tr);
        element.array_second.forEach(item=>{
            let tr_second = document.createElement('tr');
            let td_second_quastion = document.createElement('td');
            td_second_quastion.textContent = item.second_name;
            let td_second_point = document.createElement('td');
            td_second_point.textContent = item.second_point;
            tr_second.appendChild(td_second_quastion);
            tr_second.appendChild(td_second_point);
            tbody_data_com.appendChild(tr_second);
        });
    });
};