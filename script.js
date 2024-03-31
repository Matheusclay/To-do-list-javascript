let taskIdCounter = 0;

function addTask() {
    var input = document.getElementById('input-new-task');
    var taskText = input.value.trim();

    if (taskText) {
        var taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.setAttribute('draggable', 'true');
        taskDiv.id = 'task-' + taskIdCounter++; // Adiciona um ID único
        taskDiv.ondragstart = dragStart;

        var taskContent = document.createElement('span');
        taskContent.textContent = taskText;
        taskDiv.appendChild(taskContent);

        // Botão de Editar
        var editBtn = document.createElement('button');
        editBtn.innerHTML = '<img src="icons/Editar.svg.png" alt="Editar">';
        editBtn.onclick = function () { editTask(taskDiv.id); };

        // Botão de Excluir
        var deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<img src="icons/Excluir.png" alt="Excluir">';
        deleteBtn.onclick = function () { deleteTask(taskDiv.id); };



        var buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('task-buttons');
        buttonsDiv.appendChild(editBtn);
        buttonsDiv.appendChild(deleteBtn);
        taskDiv.appendChild(buttonsDiv);


        document.querySelector('.coluna.Pendente').appendChild(taskDiv);
        input.value = '';
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('btn-add-task').addEventListener('click', addTask);
});

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData('text/plain');
    var task = document.getElementById(data);
    if (event.target.classList.contains('coluna')) {
        event.target.appendChild(task);
    } else {
        event.target.closest('.coluna').appendChild(task);
    }
}

function editTask(taskId) {
    var taskDiv = document.getElementById(taskId);
    var taskContent = taskDiv.querySelector('span');
    var novoTexto = prompt("Edite sua tarefa:", taskContent.textContent);
    if (novoTexto !== null) {
        taskContent.textContent = novoTexto;
    }
}

function deleteTask(taskId) {
    var taskDiv = document.getElementById(taskId);
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
        taskDiv.remove();
    }
}


