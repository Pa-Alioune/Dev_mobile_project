function ajouterTache() {
    const taskField = document.getElementById('taskField');
    const taskList = document.getElementById("taskList");
    const taskListDone = document.getElementById("taskListDone");

    if (taskField.value){
        let newItem = document.createElement('li');
        newItem.innerHTML = taskField.value;
        taskList.appendChild(newItem);
        /* taskList.innerHTML += <li>${taskField.value}</li>; */

        $(newItem).on('swiperight', function(e){
            console.log(newItem.parentNode.id === "taskList");
            if(newItem.parentNode.id === 'taskList'){
                taskListDone.appendChild(newItem);
            }
            else if(newItem.parentNode.id === 'taskListDone'){
                console.log(newItem.parentNode.id === "taskListDone");
                taskList.appendChild(newItem);
            }
        })

        $(newItem).on('swipeleft', function(e){
            $(this).remove();
        })

        $(taskList).listview('refresh');
        $(taskListDone).listview('refresh');
        taskField.select();
    }

}



function reinitialiserListe(params) {
    const taskField = document.getElementById('taskField');
    const taskList = document.getElementById("taskList");
    const taskListDone = document.getElementById("taskListDone");
    taskField.value=''
    taskList.innerHTML = '';
    taskListDone.innerHTML = '';
    taskField.focus();
}