$(document).ready(function () {
  $.getJSON("https://api.covid19india.org/data.json", function (data) {
    var states = [];
    var confirmed = [];
    var recovered = [];
    var deaths = [];
    var total_active;
    var total_confirmed;
    var total_recovered;
    var total_deaths;
    total_active = data.statewise[0].active;
    total_confirmed = data.statewise[0].confirmed;
    total_recovered = data.statewise[0].recovered;
    total_deaths = data.statewise[0].deaths;
    $.each(data.statewise, function (id, obj) {
      states.push(obj.state);
      confirmed.push(obj.confirmed);
      recovered.push(obj.recovered);
      deaths.push(obj.deaths);
    });
    states.shift();
    confirmed.shift();
    recovered.shift();
    deaths.shift();
    $("#confirmed").append(total_confirmed);
    $("#active").append(total_active);
    $("#recovered").append(total_recovered);
    $("#deaths").append(total_deaths);
    var myChart = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(myChart, {
      type: "bar",
      data: {
        labels: states.slice(0, 15),
        datasets: [
          {
            label: "Confirmed Cases",
            data: confirmed.slice(0, 15),
            backgroundColor: "#f1c40f",
            minBarLength: 1,
          },
          {
            label: "Recovered",
            data: recovered.slice(0, 15),
            backgroundColor: "#2ecc71",
            minBarLength: 1,
          },
          {
            label: "Deceased",
            data: deaths.slice(0, 15),
            backgroundColor: "#e74c3c",
            minBarLength: 1,
          },
        ],
      },
      option: {},
    });
  });
});
