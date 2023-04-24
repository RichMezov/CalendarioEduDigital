const event_btn = document.querySelector(".events_btn")
const monthDays = document.querySelector(".days");
const current_month = document.querySelector(".date h1");
const current_fulldate = document.querySelector('.date p')
const daySelector = document.querySelector(".days")
const newEventButton = document.querySelector(".add")
var event_date;

const date = new Date();
const current_year = date.getFullYear()

const ocurrenceList = []

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
      days += `<div class="today">${i}</div>`;
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


class Event {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

class UI {
  static displayEvents(eventDate) { // verificado

    const events = Store.getEvents();
    const filterdates = events.filter(event => event.date == eventDate);
    const list = document.querySelector('#event-list');
    

    // o innerhtml da list, recebe iteraçao da filtered array que retorna o valor abaixo
    const currentEvents = filterdates.map(event => {
      return `</tr>
        <td>${event.date}</td>
        <td>${event.description}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        </tr>
      `;
  });

  list.innerHTML = currentEvents;  
  }

  // Deletes a targeted element(event)
  static deleteEvent(el) {
    // Check if element has the class "delete"
    if (el.classList.contains('delete')) {
      // Remove "parent el" of the "parent el" (2 levels up to get entire row)
      el.parentElement.parentElement.remove();
    }
  }

  // Alert
  static showAlert(message, className) {

    const div = document.createElement('div');

    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container'); // ainda não temos um container

    const form = document.querySelector('#event-form'); // ainda nao temos um event form

    container.insertBefore(div, form);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  // Clears fields after submission
  static clearFields() {
    document.querySelector('.descInfo').value = ''; // vamos mudar para agir sobre sobre um input que vai conter texto da ocorrencia
  }
}

class Store { // esta classe ja foi revisada por completo
  static getEvents() {
    let events

    if (localStorage.getItem("events") === null) {
      events = []
    } else {
      events = JSON.parse(localStorage.getItem("events"))
    }

    return events
  }

  static addEvent(event) {

    const events = Store.getEvents();

    events.push(event);

    localStorage.setItem('events', JSON.stringify(events));
  }


  static removeEvent(description) {

    const events = Store.getEvents();


    events.forEach((event, index) => {
      if (event.description === description) {
        events.splice(index, 1);
      }
    });

    localStorage.setItem('events', JSON.stringify(events));
  }
}

function saveOcurrence() {

  let dateInfo = document.querySelector(".dateInfo");

  daySelector.addEventListener("click", (e) => {
    const el = e.target.innerHTML;
    event_date = `${el}-${current_month.innerHTML}-${current_year}`;
    dateInfo.innerText = event_date;
    UI.displayEvents(event_date)
  })

  newEventButton.addEventListener("click", function () {
    let descInfo = document.querySelector(".descInfo").value
    const event = new Event(dateInfo.innerHTML, descInfo)

    if (event_date == undefined || descInfo == '') {
      alert("Por favor, Seleciona uma data e descriçao para a ocorrencia")
    } else {
      Store.addEvent(event) // adicionar a arrat de eventos na store
      UI.clearFields();
    }
  })
}

document.querySelector('#event-list').addEventListener('click', (e) => {


  UI.displayEvents(e.target);

 Store.removeEvent(e.target.parentElement.previousElementSibling.textContent);

  // UI.showAlert('Book Removed', 'success');
});

saveOcurrence()
