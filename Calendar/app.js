const date = new Date();

const renderCalendar = () => {
const monthDays = document.querySelector(".days");


const lastDay = new Date(date.getFullYear(),date.getMonth() + 1,0).getDate();


const prevLastDay = new Date(date.getFullYear(),date.getMonth(),0).getDate();

const firstDayIndex = date.getDay();

const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
).getDay();

const nextDays = 7 - lastDayIndex - 1;

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

document.querySelector(".date h1").innerHTML
= months[date.getMonth()];

document.querySelector('.date p').innerHTML
=new Date().toDateString();

let days = "";

for(let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`
}
/* _____________________*/

/*_____________________________________ */
for (let i = 1; i <= lastDay; i++) {
    if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
        days += `<div class="today">${i}</div>`;
    }
    else
    days += `<div>${i}</div>`;
}

for(let j = 1; j<=nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
}
}

document.querySelector(".prev").addEventListener("click", () =>{
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
})

document.querySelector(".next").addEventListener("click", () =>{
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
})



renderCalendar();

//New changes
const info = document.querySelector(".info");
const infoContainer = document.querySelector(".infoDisplay");
let counter = 0;

const diaTest = document.querySelector(".divTest")
let events = "";
let isOpen = false;

function openInfo() {
    if(counter <= 5) {
        
        events += `<div class="event"><h3>tile of event</h3>
        <p>descricao do evento pode ser grande</p></div>`
        infoContainer.innerHTML = events
        counter++;
    };
}

function openEvents() {
    

    if(isOpen === false) {
        info.style.display = "block";
        isOpen = true;
        console.log(isOpen)
    }
    else if(isOpen === true) {
        info.style.display = "none";
        isOpen = false;
    }
}


