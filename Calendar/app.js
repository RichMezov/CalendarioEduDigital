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


class Store {
    static getEvents() {
        let arr_events; // Onde os objectos eventos sao armazenados
      //verificar se há um objeto event dentro do local storage, se não tiver trás 1 array vazia
      if (localStorage.getItem("events") === null ) {
        arr_events = [];
      } else {
        arr_events = JSON.parse(localStorage.getItem('arr_events'));
      }
  
      return arr_events;
    }
  
    static addEvents(event) {
      // pegar eventos armazenados
      const arr_events = Store.getEvents();
  
      // Iterar sobre a array events com o forEach, com os parametros event e index
      arr_events.forEach((event, index) => {
  
        if( event.description === description) {
          // dividir o iterado atual da array pelo seu index
          arr_events.splice(index, 1);
        }
      });
  
      localStorage.setItem('arr_events', JSON.stringify(arr_events)); // Atualizar items no local storage apos a adiçao
    }
  
    static removeEvent(description) {
      // conseguir os livros armazenados
      const arr_events = Store.getEvents();
  
      // iterar sobre a array de livros armazenados
      arr_events.forEach((event, index) => {
        if(event.description === description) {
        // a funçao splice pode ser usada para subistiruir, ou apagar certo item splice os metodos são (start, deleteCount, item1)  
          arr_events.splice(index,1)
        }
      });
      //local storage, recebe um item, com a key events, valor events(versao string)
      localStorage.setItem("arr_events", JSON.stringify(arr_events)) // Atualizar items no local storage apos a adiçao
    }
  }

const arr_events = Store.getEvents();//acessar eventos na classe store
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
        event_date = `${el}-${current_month.innerHTML}-${current_year}`;
        dateInfo.innerText = event_date;
        displayOcurrences(event_date) 
    })

    newEventButton.addEventListener("click", function () {
        let descInfo = document.querySelector(".descInfo").value
        const ocurrence = new Ocurrence(event_date, descInfo.split()) 
        
        if ( event_date == undefined || descInfo == '') {
            alert("Por favor, Seleciona uma data e descriçao para a ocorrencia")
        } else {
            Store.addEvents(ocurrence);
            descInfo = document.querySelector(".descInfo").value = ""
        }
    })
}
saveOcurrence()

 function displayOcurrences(ocurrenceDate) {
    const filterdates = arr_events.filter(events => events.date == ocurrenceDate)// Receber apenas a descriçao das datas desejadas
    const ocurrence_container = document.querySelector(".ocurrence_container");
    // iterar a const filterdates forEach, vamos trazer uma tmplate string com date e descreiption
    const renderOcurrences = filterdates.map(ocurrenceElement => {
        return `<tr>
                    <th scope="row">${ocurrenceElement.date}</th>
                    <td>${ocurrenceElement.description}</td>
                </tr>`;
    });
    ocurrence_container.innerHTML = renderOcurrences;

    console.log(filterdates)
 }
