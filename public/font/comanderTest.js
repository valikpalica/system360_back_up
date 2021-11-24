
document.getElementById('next').addEventListener('click',(event)=>{
    console.log('page 1');
    if(check_quastion()){
        document.getElementById('test').hidden = true;
        document.getElementById('test1').hidden = false;
    }
    else{
        console.log('the number of answers is not equal to the questions');
        modal_error(['Не заповнені усі відповіді']);
    }
})
const check_info = () =>{
    let info = getInfo();
    let status = true;
    for(let property in info){
        if(info[property] == ''){
            status = false
        }
    }
    return status;
};

document.getElementById('close_modal').addEventListener('click',()=>{
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
});

const modal_error = (array_error)=>{
    document.getElementById('myModal').style.display = 'block';
    let div = document.getElementById('list_error');
    let ul = document.createElement('ul');
    array_error.forEach(element => {
        let li = document.createElement('li');
        li.textContent = element;
        ul.appendChild(li);
    });
    div.replaceChild(ul,div.childNodes[0]);
}


let obj = {};
document.getElementById('findPerson').addEventListener('click',async (event)=>{
    console.log('findPerson');
    event.preventDefault();
    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let patronime = document.getElementById('patronime').value;
    let data = await fetch('/getInfo/getPersonInfo',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({surname,name,patronime})
    });
    let json = await data.json();
    if(json.answer.length!= 0){
        obj = json.answer[0];
        let test = document.getElementById('test');
        test.hidden = false;
        let main  = document.getElementById('main');
        main.hidden = true;
    }
    else{
        modal_error(['Данної особи не існує']);
    }
});


document.getElementById('save').addEventListener('click',(event)=>{
    if(check_info()){
        let array = getQuastion();
        let info = getInfo();
        Myfetch(obj,array,info);
    }
    else{
        modal_error(['Не заповнена вся інформація']);
    }
});



const check_quastion = () =>{
    let tr = document.getElementsByClassName('main_quastion');
    let index_search = 0;
    let quastions = document.getElementsByClassName('quastion');
    for(let i =0;i<quastions.length;i++){
        if(quastions[i].checked){
            index_search++;
        }
    }
    if(index_search==tr.length){
        return true
    }
    else{
        return false;
    }
};


const getQuastion  = () =>{
    let tr = document.getElementsByClassName('main_quastion')
    let array = [];
    let index = 0;
    for(let i=0;i<tr.length;i++){
        let main_id = tr[i].getAttribute('main_quastion_id');
        let obj = {};
        if(index!=main_id){
            obj['main'] = main_id;
            obj['array'] = [];
            index = main_id;
            for(let j=0;j<tr.length;j++){
                let main_id_j = tr[j].getAttribute('main_quastion_id');
                if(main_id == main_id_j){
                    let inputs = tr[j].getElementsByTagName('input');
                    obj['array'].push(getValue(inputs));
                }
            };
            obj['midle'] = midlePoint(obj['array']);
            array.push(obj);
        }
    };
    return array;
};


const getValue = (array) =>{
    let obj = {};
    for(let i=0;i<array.length;i++){
        if(array[i].checked){
            obj['id'] = array[i].getAttribute('id_second');
            obj['value'] = array[i].value
        }
    }
    return obj;
}
const midlePoint = (array) =>{
    let midle = 0;
    for(let i=0;i<array.length;i++){
        midle += +array[i].value
    }
    return Math.round(midle/array.length);
}



const getInfo = () =>{
    let obj = {};
    let info_div  = document.getElementById('test1');
    let inputs = info_div.getElementsByTagName('input');
    let opinion = document.getElementById('opinion').value;
    obj[`opinion`] = opinion;
    obj[`vidpovidnist`] = document.getElementById('vidpovidnist').value;
    for (let index = 0; index < inputs.length; index++) {
        obj[`${inputs[index].id}`] = inputs[index].value;    
    }
    return obj;
}


const Myfetch = async(personInfo,array,info) =>{
    let type_anceta = getCookie();
    console.log({personInfo,array,info,type_anceta});
    fetch('/getInfo/saveComanderTest',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({personInfo,array,info,type_anceta})
    }).then(data=>{
        //window.location.href = '/page/main';
        succsesful_modal();
    }).catch(err=>{
        alert('Error')
        console.error(err);
    })
};

const succsesful_modal = () =>{
    document.getElementById('succses_modal').style.display = 'block';
};
const getCookie = () =>{
    let matches = document.cookie.match(/type_anceta=([1-5])/);
    return matches[1];
};