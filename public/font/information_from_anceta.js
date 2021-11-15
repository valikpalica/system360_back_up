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
    }).catch(e=>{
        console.error(e);
    });
});


