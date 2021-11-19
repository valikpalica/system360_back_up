
document.getElementById('next').addEventListener('click',(event)=>{
    console.log('page 1');
    document.getElementById('test').hidden = true;
    document.getElementById('test1').hidden = false;
})
document.getElementById('finish').addEventListener('click',(event)=>{
    document.getElementById('test1').hidden = true;
    document.getElementById('last').hidden = false;
})

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
    //console.log(json.answer);
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
    let table = document.getElementsByTagName('table');
    let input = table[0].getElementsByTagName('input');
    let array = [];
    let index = 0;
    for(let i=0;i<input.length;i++){
        //console.log(input[i].name,input[i].id,input[i].value);
        if(index!=input[i].name){
            let obj = {};
            obj['main'] = input[i].name;
            obj['array'] = [];
            index++;
            for(let j=0;j<input.length;j++){
                if(input[i].name==input[j].name){
                    obj['array'].push({id:input[j].id,value:input[j].value});
                }
            }
            obj['midle'] = midlePoint(obj['array']);
            array.push(obj);
        }
    }
    let info = getInfo();
    Myfetch(obj,array,info);
});

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

const midlePoint = (array) =>{
    let midle = 0;
    for(let i=0;i<array.length;i++){
        midle += +array[i].value
    }
    return Math.round(midle/array.length);
}

const Myfetch = async(personInfo,array,info) =>{
    console.log({personInfo,array,info});
    let type_anceta = getCookie();
    fetch('/getInfo/saveComanderTest',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({personInfo,array,info,type_anceta})
    }).then(data=>{
        window.location.href = '/page/main'
    }).catch(err=>{
        alert('Error')
        console.error(err);
    })
};
const getCookie = () =>{
    let matches = document.cookie.match(/type_anceta=([1-5])/);
    return matches[1];
};