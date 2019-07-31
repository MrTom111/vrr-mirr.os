const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'http://openservice-test.vrr.de/companion-vrr/XML_DM_REQUEST?outputFormat=JSON&coordOutputFormat=WGS84&type_dm=stop&name_dm=20018251&itdDate=20190731&itdTime=220000&useRealtime=1&mode=direct&limit=10', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.departureList.forEach(departure => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = departure.servingLing.number;

      const p = document.createElement('p');
      p.textContent = departure.servingLine.direction;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();