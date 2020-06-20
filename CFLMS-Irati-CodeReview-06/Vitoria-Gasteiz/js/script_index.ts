// Creates class Location (1 because that name is taken for something else)
class Location1 {
  name = "";
  city = "";
  ZIP_code = "";
  address = "";
  image = "";
  date = "";

  // Builds constructor
  constructor(name, city, ZIP_code, address, image, date) {
    this.name = name;
    this.city = city;
    this.ZIP_code = ZIP_code;
    this.address = address;
    this.image = image;
    this.date = date;
  }

  // Method that appends the information to the wrapper on cards
  display() {

    // this helps us have to create a unique id for each element, it fails for same streets
    let id_name = this.address.slice(0,5);
    $("#wrapper").append(`
      <div class="col mb-4 card-deck mx-auto">
        <div class = "card m-0 text-white bg-info">
          <img class = "card-img-top d-none d-md-block" src = ${this.image}>
          <div class = "card-body" id = "card_${id_name}">
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

// Extend class Location to create Restaurant class
class Restaurant extends Location1 {
  telephone = "";
  type = "";
  web_address = "";

  // Contructor with the elements from Location + new ones
  constructor(name, city, ZIP_code, address, image, date, telephone, type, web_address){
    super(name, city, ZIP_code, address, image, date);
    this.telephone = telephone;
    this.type = type;
    this.web_address = web_address;
  }

  // Displays the same as on Location and adds new information to the cards
  display(){
    let id_name = this.address.slice(0,5);
    super.display()
    $(`#info_${id_name}`).append(`, ${this.telephone}`);
    $(`#date_${id_name}`).before(`<p class = "card-text"> ${this.type} </p>
      <a href="${this.web_address}" class="btn btn-light" style = "font-size: 1vw"> ${this.web_address} </a>`);
  }
}

// Extend class Location to create Restaurant class (1 because that name is taken for something else)
class Event1 extends Location1 {
  web_address = "";
  event_date = "";
  event_time = "";
  ticket_price = "";

  // Contructor with the elements from Location + new ones
  constructor(name, city, ZIP_code, address, image, date,  web_address, event_date, event_time, ticket_price){
    super(name, city, ZIP_code, address, image, date);
    this.web_address = web_address;
    this.event_date = event_date;
    this.event_time = event_time;
    this.ticket_price = ticket_price;
  }

  // Displays the same as on Location and adds new information to the cards
  display(){
    let id_name = this.address.slice(0,5);
    super.display()
    $(`#date_${id_name}`).before(`<p class = "card-text"> ${this.ticket_price} </p><a href="${this.web_address}" class="btn btn-light" style = "font-size: 1vw"> ${this.web_address} </a>`);
    $(`#name_${id_name}`).after(`<p class = "card-text"> ${this.event_date} </p><p class = "card-text"> ${this.event_time} </p>`);
  }
}

// Creates class instances
let maria = new Location1("Santa Maria Cathedral", "Vitoria-Gasteiz", "01001", "Santa Maria Plaza, 3", "img/catedral.jpg", "24.05.2020 12:45");
let naipes = new Location1("Museum of Fournier de Naipes", "Vitoria-Gasteiz", "01001", "Cuchilleria, 54", "img/naipes.jpg", "25.04.2020 13:45");
let mural = new Location1("Murales of Vitoria-Gasteiz", "Vitoria-Gasteiz", "-", "All around the city", "img/mural.jpg", "02.07.2017 15:04")
let armentegi = new Restaurant("Sidredía Armentegi", "Vitoria-Gasteiz", "01007", "Armentiabo Bidea, 6", "img/armentegi.jpg", "12.06.2020 02:30", "+34 945132101", "Cider House, Basque", "http://sidreriaarmentegi.com");
let oishi = new Restaurant("Sushi Oishi", "Vitoria-Gasteiz", "01002", "Francia 14", "img/oishi.jpg", "04.02.2019 18:15",  "+34 945212582", "Japanese", "https://sushioishi.es/");
let sukalki = new Restaurant("Sukalki", "Vitoria-Gasteiz", "01005", "Florida 37", "img/sukalki.jpg", "20.06.2020 16:59", "+34 945279654", "Basque, Modern", "http://sukalki.com/")
let arf = new Event1("Azkena Rock Festival", "Vitoria-Gasteiz", "01007", "Portal de Zabala", "img/arf.jpeg", "23.06.2018 10:45", "https://www.azkenarockfestival.com/", "17/18/19.06.2021.", "16:00", "€ 169,00");
let guns = new Event1("Jazzaldi de Vitoria-Gasteiz", "Vitoria-Gasteiz", "01007", "Amadeo Garcia de Salazar Plaza, 1", "img/jazz.jpeg", "28.10.2019 09:17", "https://www.jazzvitoria.com/", "13-18.07.2020 - Cancelled", "17:30", "€ 100,00");

// Adds them to array
let places = [maria, naipes, mural, armentegi, oishi, sukalki, arf, guns];

// Calls display method to display all cards
for (let place of places) {
  place.display();
}

// Function to change the date in a way that we can order it alphabetically
function reorderDate(oneDate){
  let date_array = [oneDate.slice(9,11), oneDate.slice(12,14), oneDate.slice(15,19), oneDate.slice(20,22), oneDate.slice(23,25)]
  let order_date = [date_array[2], date_array[1], date_array[0], date_array[3], date_array[4]]
  let order_date_string = order_date.join(".")
  return order_date_string
}

// Sorting function button
$("button").on("click", function(event){
    event.preventDefault()

    // Gets ID of the button
    let button_id = $(this).attr("id")
    
    // Orders them in descending order using the sorting function
    if (button_id == "desc"){
        var order = $(".card-deck").sort(function (a, b){
          let date_a = $(a).find(".date").text()
          let date_b = $(b).find(".date").text()

          // Uses the reordering function to compare the dates
          return reorderDate(date_a) > reorderDate(date_b) ? -1:1
        })

    // Orders them in ascending order using the sorting function
    } else if (button_id == "asc"){
        var order = $(".card-deck").sort(function (a, b){
          let date_a = $(a).find(".date").text()
          let date_b = $(b).find(".date").text()

          // Uses the reordering function to compare the dates
          return reorderDate(date_a) < reorderDate(date_b) ? -1:1
        })
      }
    // Reorders the elements in the wrapper according to the order given
    $("#wrapper").html(order)
})