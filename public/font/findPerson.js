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
        modal_error(['Данного користувача не існує'])
    }
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



const getValue = () =>{
    let tr = document.getElementsByTagName('tr');
    let array_quastion = [];
    let array_compatence = [];
    for(let i = 0; i<tr.length;i++){
            if(tr[i].id!=''){
                let input = tr[i].getElementsByTagName('input');
                let {status,value} = radio_value(input);
                if(status=='quastion'){
                    array_quastion.push({id:tr[i].id,value});
                }
                else if(status == 'compatence'){
                    array_compatence.push({id:tr[i].id,value});
                }
            }
        }
    return {array_quastion,array_compatence};
}


const radio_value  = (element) =>{
    let status;
    let value;
    for(let i = 0;i<element.length;i++){
        if(element[i].className=='quastion'){
            status = element[i].className;
            if(element[i].checked){
            value = element[i].value;
            return {status:'quastion',value};
            }
            
        }
        else if(element[i].className=='compatence'){
            status = element[i].className;
            if(element[i].checked){
            value = element[i].value;
            return {status:'compatence',value};
            }
            
        }
    }
    return {status,value};
};



const Myfetch = async (personInfo,array_quastion,array_compatence)=>{
    let type_anceta = getCookie();
    console.log(personInfo,array_quastion,array_compatence,type_anceta);
    let res = test(array_quastion,array_compatence);
    if(res){
        fetch('/getInfo/save',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({personInfo,array_quastion,array_compatence,type_anceta})
        }).then((data)=>{
            // //alert('Succsesful');
            // window.location.href = '/page/main'
            succsesful_modal();
        }).catch(err=>{
        alert('Error');
        console.log(err);
    })
    }
    else{
        alert('not correct data');
    }
};


const succsesful_modal = () =>{
    document.getElementById('succses_modal').style.display = 'block';
};


const test = (array1,array2) =>{
    let size = array1.length + array2.length;
    let count_element = document.getElementsByTagName('tr').length-3;
    if(size == count_element){
        return true
    }
    else{
        return false;
    }
}

const getCookie = () =>{
    let matches = document.cookie.match(/type_anceta=([1-5])/);
    return matches[1];
};


document.getElementById('save').addEventListener('mouseenter',()=>{
    let {array_quastion,array_compatence} = getValue();
    // console.log(array_quastion,array_compatence);
    let status_quastion = check_value_error(array_quastion);
    let status_compatence = check_value_error(array_compatence);
    if(status_quastion||status_compatence){
        document.getElementById('save').disabled = true;
        let modal = document.getElementById("myModal");
        let div = document.getElementById('list_error');
        let ul = document.createElement('ul');
        let li = document.createElement('li');
        li.textContent = 'Не пройденно усі тести';
        ul.appendChild(li);
        div.replaceChild(ul,div.childNodes[0]);
        modal.style.display = "block";
    } 
});


const check_value_error = (array) =>{
    for(let i=0;i<array.length;i++){
        if(array[i].value == undefined){
            return true;
        }
    };
    return false;
}



document.getElementById('close_modal').addEventListener('click',()=>{
    document.getElementById('save').disabled = false;
    let modal = document.getElementById('myModal');
    modal.style.display = "none";
});

document.getElementById('save').addEventListener('click',(event)=>{
    let {array_quastion,array_compatence} = getValue();
    Myfetch(obj,array_quastion,array_compatence);
});

