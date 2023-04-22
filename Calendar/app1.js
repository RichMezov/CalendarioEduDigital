// pegar as data(dia/mes/ano)
const event_btn = document.querySelector(".events_btn")
const monthDays = document.querySelector(".days");
const current_month = document.querySelector(".date h1");
const current_fulldate = document.querySelector('.date p')
const daySelector = document.querySelector(".days")
const newEventButton = document.querySelector(".add")
var event_date;

const date = new Date();
const current_year = date.getFullYear()

const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",

];

const arr_events = []
// Inicio  da funçao que adiciona os dias do mess
const renderCalendar = () => {

    //pegar dias do mes
    let firstDayIndex = new Date(current_year, date.getMonth(), 1).getDay();
    lastDayMonth = new Date(current_year, date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(current_year, date.getMonth(), 0).getDate();
    const lastDayIndex = new Date(current_year, date.getMonth() + 1, 0).getDay();
    const nextDays = 7 - lastDayIndex - 1;
    current_month.innerHTML = months[date.getMonth()];
    current_fulldate.innerHTML = new Date().toDateString();

    let days = "";

    // retorna Dias do mes anterior
    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date">
            ${prevLastDay - x}
            </div>`
    }
    //iteraçao que retorna Dias do mes atual
    for (let i = 1; i <= lastDayMonth; i++) {
        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            days += `<div class="today">
                ${i}
                </div>`;
        }
        else
            days += `<div>${i}</div>`;
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
    }
    monthDays.innerHTML = days;
}

// inicio de slider entre os meses um slider entre os meses
document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
})

document.querySelector(".next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
})
// Fim de slider entre os meses um slider entre os meses
renderCalendar();

event_btn.addEventListener("click", function () {
    const event_info = document.getElementById("info")
    event_info.classList.toggle("hide") // no click, se tiver event_info tiver a classe hide, essa classe sera removida... se event_info nao tiver a classe hide ela será adicionada
})

class Ocurrence {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}

function saveOcurrence() {

    let dateInfo = document.querySelector(".dateInfo");

    daySelector.addEventListener("click", (e) => {
        const el = e.target.innerHTML;
        event_date = `${el} ${current_month.innerHTML} ${current_year}`;
        dateInfo.innerText = event_date;
    })

    newEventButton.addEventListener("click", function () {
        const splitEvent_date = event_date.replaceAll(' ','-')
        let descInfo = document.querySelector(".descInfo").value
        const ocurrence = new Ocurrence(splitEvent_date, descInfo.split()) // arranjar forma de validar as datas, se elas ja existem vamos apenas adicionar novas descriçoes
        arr_events.push(ocurrence);
        descInfo = document.querySelector(".descInfo").value = ""
        console.log(arr_events)
    })
}
saveOcurrence()
// Agora o object ocurrence é salvo, e na decriçao temos uma array, vai facilitar em caso de 2 ou mais ocorrencias

 function displayOcurrences(ocurrenceDate) {
// por cada item na array de eventos vamos criar uma div que contem o titulo h2 que recebe a data e alguma tag para adicionar a descriçao ao UI

 }
