const chartContainer = document.querySelector(".chart-container");
const confirmed = document.querySelector(".confirmed");
const deaths = document.querySelector(".deaths");
const recovered = document.querySelector(".recovered");
const critical = document.querySelector(".critical");
const asia = document.querySelector(".asia");
const americas = document.querySelector(".americas");
const africa = document.querySelector(".africa");
const europe = document.querySelector(".europe");
const world = document.querySelector(".world");
const select = document.querySelector("#select");
let region='';
let myChart='';
function metr() {
    addall('asia')
  confirmed.addEventListener("click", function () {
    addall(region,"confirmed");
    
  });
  deaths.addEventListener("click", function () {
    addall(region,"deaths");
  });
  recovered.addEventListener("click", function () {
    addall(region,"recovered");
  });
  critical.addEventListener("click", function () {
    addall(region,"critical");
  });
  asia.addEventListener("click", function () {
    addall('asia');
  });
  americas.addEventListener("click", function () {
    addall("americas");
  });
  africa.addEventListener("click", function () {
    addall("africa");
  });
  europe.addEventListener("click", function () {
    addall("europe");
  });
  world.addEventListener("click", function () {
    addall("world");
  });
}
async function getData() {
    const secondTaple = {
        asia: {},
        europe: {},
        americas: {},
        africa: {},
        world: {},
      };
    if (!localStorage.getItem("world")) {
        let data1 = await (await fetch('https://corona-api.com/countries')).json();
        let data2 = await (await fetch('https://api.allorigins.win/raw?url=https://restcountries.herokuapp.com/api/v1')).json();
data2.forEach(e => {
    data1.data.forEach(element => {
        secondTaple.world[e.cca2] = { country: e.name.common ,data: element.latest_data,today:{
          deaths:element.today.deaths,
          confirmed:element.today.confirmed
        }};
        if (e.region === "Asia" && element.code == e.cca2) {
            secondTaple.asia[e.cca2] = { country: e.name.common, data: element.latest_data,today:{
              deaths:element.today.deaths,
              confirmed:element.today.confirmed
            } };
        } else if (e.region === "Europe" && element.code == e.cca2) {
            secondTaple.europe[e.cca2] = { country: e.name.common, data: element.latest_data ,today:{
              deaths:element.today.deaths,
              confirmed:element.today.confirmed
            }};
        } else if (e.region === "Americas" && element.code == e.cca2) {
           secondTaple.americas[e.cca2] = { country: e.name.common, data: element.latest_data ,today:{
            deaths:element.today.deaths,
            confirmed:element.today.confirmed
          }}
        } else if (e.region === "Africa" && element.code == e.cca2) {
            secondTaple.africa[e.cca2] = { country: e.name.common, data: element.latest_data ,today:{
              deaths:element.today.deaths,
              confirmed:element.today.confirmed
            }};
        }   
    })
})

window.localStorage.setItem('asia',JSON.stringify(secondTaple.asia))
window.localStorage.setItem('europe',JSON.stringify(secondTaple.europe))
window.localStorage.setItem('americas',JSON.stringify(secondTaple.americas))
window.localStorage.setItem('africa',JSON.stringify(secondTaple.africa))
window.localStorage.setItem('world',JSON.stringify(secondTaple.world))
    }
}
getData()



function mat(data){
    const ctx = document.querySelector("#chart").getContext("2d");
   if(myChart){
       myChart.destroy();
   }
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.country,
            datasets: [{
                label: 'world',
                data: data.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        fontColor: "white",
        options: {
          plugins: {
            legend: {
                labels: {
                  fontColor: "black",
                    // This more specific font property overrides the global property
                    font: {
                        size: 50,weight:'700',
                    }
                }
            }
        },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function addall(reg,latest_data='confirmed'){
    region=reg;
 let  lest=[],num=[];
let add1=JSON.parse(localStorage.getItem(reg))
for (const key in add1) {
lest.push(add1[key].country)
num.push(add1[key].data[latest_data])
}
console.log(lest);
console.log(num);
addcountrynamestoselect(lest);
mat({data:num,country:lest})
}  
metr()

function addcountrynamestoselect(country){
let totalcase=document.querySelector('.total-cases')
let totaldeaths=document.querySelector('.total-deaths')
let recovered=document.querySelector('.total-recovered')
let newcase=document.querySelector('.new-cases')
let newdeaths=document.querySelector('.new-deaths')
let critical=document.querySelector('.critical')
let select=document.querySelector('#select')
let data=JSON.parse(localStorage.getItem(region));
let key=Object.keys(data);
let countryname="";
for(i=0;i<country.length;i++){
  countryname+=`<option id="${key[i]}" value="${key[i]}">${country[i]}</option>`
  console.log(key[i]);
}
console.log(data);
select.addEventListener('change', (event) => {
  let coviddata = data[event.target.value]
  totalcase.textContent = `${coviddata.data.confirmed}`;
  totaldeaths.textContent = `${coviddata.data.deaths}`;
  recovered.textContent = `${coviddata.data.recovered}`;
  newcase.textContent = `${coviddata.today.confirmed}`;
  newdeaths.textContent = `${coviddata.today.deaths}`;
  critical.textContent = `${coviddata.data.critical}`;

  // const result = document.querySelector('.result');
  // result.textContent = `${event.target.value}`;
  console.log(event.target.value)
});
select.innerHTML=countryname;
console.log(countryname);
}









