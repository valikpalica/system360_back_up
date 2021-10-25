
document.addEventListener('DOMContentLoaded',()=>{
    let button = document.getElementById('registration');
    button.onmouseover = check_info;
});

document.getElementById('close_modal').addEventListener('click',()=>{
    let modal = document.getElementById("myModal");
    document.getElementById('registration').disabled = false;
    modal.style.display = "none";
});

function main(array_error){ 
    document.getElementById('registration').disabled = true;
    create_list_error(array_error);
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
};


const create_list_error = (array_error) => {
    let div = document.getElementById('list_error');
    let ul = document.createElement('ul');
    array_error.forEach(item=>{
        let li = document.createElement('li');
        li.textContent = item.text;
        ul.appendChild(li);
    })
    div.replaceChild(ul,div.childNodes[0]);
};


const check_info = () =>{
    let array = push_array();
    let personal_info =  check_personal_info(array);
    //console.log(personal_info);
    if(personal_info){
        main(personal_info);
    }
};

const push_array = ()=>{
    let array = [];
    let name = document.getElementById('name').value;
    array.push({value:name,text:'Ім\'я',id:'name'});

    let surname = document.getElementById('surname').value;
    array.push({value:surname,text:'Прізвище',id:'surname'});

    let patronime = document.getElementById('patronime').value;
    array.push({value:patronime,text:'По-батькові',id:'patronime'});

    let position = document.getElementById('position').value;
    array.push({value:position,text:'Посада',id:'position'});

    let rank = document.getElementById('rank').value;
    array.push({value:rank,text:'Віськове звання',id:'rank'});

    let staff = document.getElementById('staff').value;
    array.push({value:staff,text:'Військова частина',id:'staff'});

    let institute = document.getElementById('institute').value;
    array.push({value:institute,text:'Закінчив інститут',id:'institute'});

    let facultet = document.getElementById('facultet').value;
    array.push({value:facultet,text:'Факультет',id:'facultet'});

    let specialize = document.getElementById('specialize').value;
    array.push({value:specialize,text:'За спеціальністю',id:'specialize'});

    let graduation = document.getElementById('graduation').value;
    array.push({value:graduation,text:'Рік випуску',id:'graduation'});

    let login = document.getElementById('login').value;
    array.push({value:login,text:'Логін',id:'login'});

    let password = document.getElementById('password').value;
    array.push({value:password,text:'Пароль',id:'password'});

    let repeated_password = document.getElementById('repeated_password').value;
    array.push({value:repeated_password,text:'Пітвердження пароля',id:'repeated_password'});

    return array;
};

const check_personal_info = (array) =>{ 
    let _all_error = [];
    array.forEach(item =>{
        let obj_status = check_value_on_null_or_undefiend(item.value,item.text);
        obj_status?_all_error.push(obj_status):undefined;
    });
    if (_all_error.length > 0) {
        return _all_error;
    } else {
        let password = array.find(item=>{
            if(item.id == 'password'){
                return item;
            }
        });
        let repeated_password = array.find(item=>{
            if(item.id == 'repeated_password'){
                return item;
            }
        });
        let password_status = check_password(password.value,repeated_password.value);
        password_status!=undefined?_all_error.push(password_status):false;
    };
    //console.log(_all_error);
    return _all_error.length == 0 ? false : _all_error;
};

const check_password  = (password,repeated_password) => {
    //console.log(`password ${password} repeated_password ${repeated_password}`);
    if(password!=repeated_password){
        return {status:false,text:'Паролі не співпадають'};
    }
};


const check_value_on_null_or_undefiend = (value,name) =>{
        if(value==''){
            //console.log(`Не заповнене значення:${name}`);
            return {status:false,text:`Не заповнене значення:${name}`};
        }   
};

const check_N_S_P = (name,surname,patronime) => {
    //fetch for server
};


 