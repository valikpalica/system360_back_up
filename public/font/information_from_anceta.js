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
    create_last_info(obj);
    create_tables(obj);
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


const create_last_info = (obj) =>{
    let {opinion,pobaganja,comander,comander_mpz,comander_vch} = obj;
    let ul = document.getElementById('last_info');
    let li1 = document.createElement('li');
    li1.textContent = `Загальний висновок ${opinion}`;
    let li2 = document.createElement('li');
    li2.textContent = `Побажання щодо покращення підготовки офіцерів ${pobaganja}`;
    let li3 = document.createElement('li');
    li3.textContent = `Безпосередній командир ${comander}`;
    let li4 = document.createElement('li');
    li4.textContent = `Заступник командира військової частини з МПЗ ${comander_mpz}`;
    let li5 = document.createElement('li');
    li5.textContent = `Командир військової частини ${comander_vch}`;
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(li5);
};


const create_tables = ({obj}) =>{
    let {data_comanders,data_neighborhood,data_own,data_staff} = obj;   
    create_table(data_comanders,'tbody_comanders');
    create_table(data_neighborhood,'tbody_neighborhood');
    create_table(data_staff,'tbody_staff');
    create_table(data_own,'tbody_own');
}


const create_table = (data_comanders,id_table) =>{
    let table = document.getElementById(id_table);
    let {competence,quastion} = data_comanders;
    let tr_quastions = document.createElement('tr');
    tr_quastions.textContent = 'Загальна компетентність';
    tr_quastions.colSpan = 2;
    tr_quastions.style.fontSize  = '25px'
    table.appendChild(tr_quastions);
    quastion.forEach(item=>{
        let tr = document.createElement('tr');
        let td_quastions_name = document.createElement('td');
        let td_quastions_point = document.createElement('td');
        td_quastions_name.textContent = item.quastion;
        td_quastions_point.textContent = Math.round(+item.division);
        tr.appendChild(td_quastions_name);
        tr.appendChild(td_quastions_point);
        table.appendChild(tr);
    });
    tr_competences = document.createElement('tr');
    tr_competences.textContent = 'Фахова компетентність';
    tr_competences.colSpan = 2;
    tr_competences.style.fontSize  = '25px'
    table.appendChild(tr_competences);
    competence.forEach(item=>{
        let tr = document.createElement('tr');
        let td_competences_name  = document.createElement('td');
        let td_competences_point = document.createElement('td');
        td_competences_name.textContent = item.competence;
        td_competences_point.textContent = Math.round(+item.division);
        tr.appendChild(td_competences_name);
        tr.appendChild(td_competences_point);
        table.appendChild(tr);
    });
}

