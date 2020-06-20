class Location1 {
  name = "";
  city = "";
  ZIP_code = "";
  address = "";
  image = "";

  constructor(name, city, ZIP_code, address, image, date) {
    this.name = name;
    this.city = city;
    this.ZIP_code = ZIP_code;
    this.address = address;
    this.image = image;
    this.date = date;
  }
  display() {
    let id_name = this.address.slice(0,5);
    $("#wrapper").append(`
      <div class="col mb-4 card-deck">
        <div class = "card text-white bg-info">
          <img class = "card-img-top d-none d-md-block" src = ${this.image}>
          <div class = "card-body"  id = "card_${id_name}">
            <h4 id = "name_${id_name}" class = "h4"> 
              ${this.name}
            </h4>
            <p class = "card-text" id = "info_${id_name}"> 
              ${this.address}, ${this.ZIP_code} ${this.city}
            </p>
            <p class = "card-text m-2 date" id = "date_${id_name}">Created: ${this.date}</p>
          </div>
        </div>
       </div>
      `);
  }

}

class Restaurant extends Location1 {
  telephone = "";
  type = "";
  web_address = "";

  constructor(name, city, ZIP_code, address, image, date, telephone, type, web_address){
    super(name, city, ZIP_code, address, image, date);
    this.telephone = telephone;
    this.type = type;
    this.web_address = web_address;
  }

  display(){
    let id_name = this.address.slice(0,5);
    super.display()
    $(`#info_${id_name}`).append(`, ${this.telephone}`);
    $(`#date_${id_name}`).before(`<p class = "card-text"> ${this.type} </p>
      <a href="${this.web_address}" class="btn btn-light"> ${this.web_address} </a>`);
  }
}

class Event1 extends Location1 {
  web_address = "";
  event_date = "";
  event_time = "";
  ticket_price = "";

  constructor(name, city, ZIP_code, address, image, date,  web_address, event_date, event_time, ticket_price){
    super(name, city, ZIP_code, address, image, date);
    this.web_address = web_address;
    this.event_date = event_date;
    this.event_time = event_time;
    this.ticket_price = ticket_price;
  }

  display(){
    let id_name = this.address.slice(0,5);
    super.display()
    $(`#date_${id_name}`).before(`<p class = "card-text"> ${this.ticket_price} </p><a href="${this.web_address}" class="btn btn-light"> ${this.web_address} </a>`);
    $(`#name_${id_name}`).after(`<p class = "card-text"> ${this.event_date} </p><p class = "card-text"> ${this.event_time} </p>`);
  }
}



let charles = new Location1("St. Charles Church", "Vienna", "1010", "Karlsplatz 1", "img/charles.jpg", "24.05.2020 12:45");
let park = new Location1("Schönbrunn Park, Vienna", "Wien", "1130", "Maxingstraße 13b", "img/park.jpg", "25.04.2020 13:45");
let on = new Restaurant("On Restaurant", "Vienna", "1050", "Wehrgasse 8", "img/on.jpeg", "12.06.2020 02:30", "+43(1)5854900", "Chinese", "http://www.restaurant-on.at/");
let bio = new Restaurant("BioFrische", "Wien", "1150", "Stutterheimstraße 6", "img/bio.jpg", "04.02.2019 18:15",  "+43(1) 9529215", "Indian", "http://biofrische.wien");
let cats = new Event1("Cats - the musical", "Vienna", "1010", "Ronacher-Seilerstätte 9", "img/cats.jpg", "23.06.2018 10:45", "http://catsmusical.at", "Fr., 15.12.2020.", "20:00", "€ 120,00");
let guns = new Event1("Guns 'n Roses", "Wien", "1020", "Ernst-Happel Stadion, Meiereistraße 7", "img/guns.jpg", "28.10.2019 09:17", "https://www.gunsnroses.com/", "Sat, 09.06.2020", "19:30", "€ 95,50");

let places = [charles, park, on, bio, cats, guns];


for (let place of places) {
  place.display();
}


function reorderDate(oneDate){
  let date_array = [oneDate.slice(9,11), oneDate.slice(12,14), oneDate.slice(15,19), oneDate.slice(20,22), oneDate.slice(23,25)]
  let order_date = [date_array[2], date_array[1], date_array[0], date_array[3], date_array[4]]
  let order_date_string = order_date.join(".")
  return order_date_string
}


$("button").on("click", function(event){
    event.preventDefault()

    // Gets ID of the button
    let button_id = $(this).attr("id")
    

    if (button_id == "desc"){
        let order = $(".card-deck").sort(function (a, b){
          let date_a = $(a).find(".date").text()
          let date_b = $(b).find(".date").text()

          return reorderDate(date_a) > reorderDate(date_b) ? -1:1
        })

    } else if (button_id == "asc"){
        let order = $(".card-deck").sort(function (a, b){
          let date_a = $(a).find(".date").text()
          let date_b = $(b).find(".date").text()

          return reorderDate(date_a) < reorderDate(date_b) ? -1:1
        })
      }

      $("#wrapper").html(order)
    }
  })