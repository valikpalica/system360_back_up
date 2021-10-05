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
        alert('system hasn`t this person in DataBase');
    }
});

document.getElementById('save').addEventListener('click',(event)=>{
    let {array_quastion,array_compatence} = getValue();
    Myfetch(obj,array_quastion,array_compatence);
});


const getValue = () =>{
    let tr = document.getElementsByTagName('tr');
    let array_quastion = [];
    let array_compatence = [];
    for(let i = 0; i<tr.length;i++){
            if(tr[i].id!=''){
                let input = tr[i].getElementsByTagName('input');
                for(let j=0;j<input.length;j++){
                    if(input[j].checked){
                        if(input[j].className=='quastion'){
                            array_quastion.push({id:tr[i].id,value:input[j].value})
                        }
                        else if(input[j].className=='compatence'){
                            array_compatence.push({id:tr[i].id,value:input[j].value})
                        }
                        else{
                            console.log('not class name')
                        }
                    }
                }
            }
        }
    return {array_quastion,array_compatence};
}



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
            alert('Succsesful');
            window.location.href = '/page/main'
        }).catch(err=>{
        alert('Error');
        console.log(err);
    })
    }
    else{
        alert('not correct data');
    }
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
