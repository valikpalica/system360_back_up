
document.addEventListener('DOMContentLoaded',()=>{
    let button = document.getElementById('registration');
    button.onmouseover = check_info;
});

function main(){ 
    document.getElementById('registration').disabled = true;
    console.log('model');
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    let span = document.getElementById("close_modal");
    span.onclick = function() {
        document.getElementById('registration').disabled = false;
        modal.style.display = "none";
    }
};

const check_info = () =>{
    let array = push_array();
    let personal_info =  check_personal_info(array);

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
        _all_error.push(check_value_on_null_or_undefiend(item.value,item.text));
    });
    _all_error.length == 0 ? false : _all_error;
};

const check_password  = (password,repeated_password) => {
    console.log(`password ${password} repeated_password ${repeated_password}`)
    if(password!=repeated_password){
        return {status:false,text:'Паролі не співпадають'};
    }
};


const check_value_on_null_or_undefiend = (value,name) =>{
        console.log(`value ${value} name ${name}`);
        if(value==null || value==undefined){
            return {status:false,text:`Не заповнене значення:${name}`};
        }   
};

const check_N_S_P = (name,surname,patronime) => {
    //fetch for server
};


 