let $todoInput; // Miejsce gdzie uzytkownik wpisuje treść
let $alertInfo; //info o braku zadań / konieczność dodania tekstu
let $addBtn; // przycisk ADD - dodaje nowe elementy do listy
let $ulList; // nasza lista zadań, tagi <ul></ul>
let $newTask;
let $toolsPanel;

// Dodajemy zmienne do popuppu
let $popup;
let $popupInfo;
let $editedTodo;
let $popupInput;
let $addPopupBtn;
let $closeTodoBtn;
let $idNumber = 0;
let $allTasks;

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};


// Pobieramy nasze elementy
const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');

    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTasks = $ulList.getElementsByTagName('li');
};

// Funkcja dodaje nowe zadania.
const addNewTask = function () {
    if ($todoInput.value != '') {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.textContent = $todoInput.value;
        // Ponizej dodaje do nowego elementu id o nazwie todo-numer
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ulList.appendChild($newTask);
        $todoInput.value = '';
        $alertInfo.innerText = '';

        // Dodajemy narzędzia do LI
        createToolsArea();
    } else {
        $alertInfo.innerText = 'Wpisz treść zadania!';
    }
};

// Dodawanie za pomoca entera
const enterCheck = () => {
    if (event.keyCode === 13) {
        addNewTask();
    }
};

// Dodajemy narzedzia do li
const createToolsArea = () => {
    $toolsPanel = document.createElement('div');
    $toolsPanel.classList.add('tools')

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerText = 'EDIT';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

    $newTask.appendChild($toolsPanel);

    $toolsPanel.appendChild(completeBtn);
    $toolsPanel.appendChild(editBtn);
    $toolsPanel.appendChild(deleteBtn);
};

// Nadajemy nasłuchiwanie
const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', enterCheck);
};

// Ktory przycisk został kliknięty
const checkClick = (e) => {
    if (e.target.closest('button').classList.contains('complete')) { // event.target.classList.contains('complete') targetuje i działa tylko na button nie ikone.
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');
    } else if (e.target.closest('button').className === 'edit') {
        // Dodajemy funkcje edytowania
        editTask(e);
    } else if (e.target.closest('button').className === 'delete') {
        deleteTask(e);
    }
};

// funkcja do edytowania zadań
const editTask = (e) => {
    // zmienna bedzie targetowala najblizsze li zaraz kolo buttona
    const oldTodo = e.target.closest('li').id;
    // pobiera id ktore moment wczesniej stworzylismy
    $editedTodo = document.getElementById(oldTodo);
    // Przypisuje text z popupa do elementu li ktory edytujemy 
    $popupInput.value = $editedTodo.firstChild.textContent;

    $popup.style.display = 'flex';
};

// Funkcja sprawdza czy edytowany popup jest pusty
const changeTodo = () => {
    if ($popupInput.value !== '') {
        // Jezeli nie jest pusty to przypisujemy li tresc z popupu
        $editedTodo.firstChild.textContent = $popupInput.value;
        // Po zatwierdzeniu popup znika
        $popup.style.display = 'none';
        $popupInfo.innerHTML = '';
    } else {
        $popupInfo.innerHTML = 'Musisz podać jakąś treść!';
    }
};

// funkcja zamykania popup'u
const closePopup = () => {
    $popup.style.display = 'none';
    $popupInfo.innerHTML = '';
};

// Usuwanie zadań
const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();

    if ($allTasks === 0) {
        $alertInfo.innerText = 'Brak zadań na liście.';
    }
};

document.addEventListener('DOMContentLoaded', main);