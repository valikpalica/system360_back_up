
document.addEventListener('DOMContentLoaded',()=>{
    let button = document.getElementById('registration');
    button.onmouseover = check_info;
});

function check_info(){ 
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




 