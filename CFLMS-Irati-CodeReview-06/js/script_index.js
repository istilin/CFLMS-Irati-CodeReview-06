var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Location1 = /** @class */ (function () {
    function Location1(name, city, ZIP_code, address, image, date) {
        this.name = "";
        this.city = "";
        this.ZIP_code = "";
        this.address = "";
        this.image = "";
        this.name = name;
        this.city = city;
        this.ZIP_code = ZIP_code;
        this.address = address;
        this.image = image;
        this.date = date;
    }
    Location1.prototype.display = function () {
        var id_name = this.address.slice(0, 5);
        $("#wrapper").append("\n      <div class=\"col mb-4 card-deck\">\n        <div class = \"card text-white bg-info\">\n          <img class = \"card-img-top d-none d-md-block\" src = " + this.image + ">\n          <div class = \"card-body\"  id = \"card_" + id_name + "\">\n            <h4 id = \"name_" + id_name + "\" class = \"h4\"> \n              " + this.name + "\n            </h4>\n            <p class = \"card-text\" id = \"info_" + id_name + "\"> \n              " + this.address + ", " + this.ZIP_code + " " + this.city + "\n            </p>\n            <p class = \"card-text m-2 date\" id = \"date_" + id_name + "\">Created: " + this.date + "</p>\n          </div>\n        </div>\n       </div>\n      ");
    };
    return Location1;
}());
var Restaurant = /** @class */ (function (_super) {
    __extends(Restaurant, _super);
    function Restaurant(name, city, ZIP_code, address, image, date, telephone, type, web_address) {
        var _this = _super.call(this, name, city, ZIP_code, address, image, date) || this;
        _this.telephone = "";
        _this.type = "";
        _this.web_address = "";
        _this.telephone = telephone;
        _this.type = type;
        _this.web_address = web_address;
        return _this;
    }
    Restaurant.prototype.display = function () {
        var id_name = this.address.slice(0, 5);
        _super.prototype.display.call(this);
        $("#info_" + id_name).append(", " + this.telephone);
        $("#date_" + id_name).before("<p class = \"card-text\"> " + this.type + " </p>\n      <a href=\"" + this.web_address + "\" class=\"btn btn-light\"> " + this.web_address + " </a>");
    };
    return Restaurant;
}(Location1));
var Event1 = /** @class */ (function (_super) {
    __extends(Event1, _super);
    function Event1(name, city, ZIP_code, address, image, date, web_address, event_date, event_time, ticket_price) {
        var _this = _super.call(this, name, city, ZIP_code, address, image, date) || this;
        _this.web_address = "";
        _this.event_date = "";
        _this.event_time = "";
        _this.ticket_price = "";
        _this.web_address = web_address;
        _this.event_date = event_date;
        _this.event_time = event_time;
        _this.ticket_price = ticket_price;
        return _this;
    }
    Event1.prototype.display = function () {
        var id_name = this.address.slice(0, 5);
        _super.prototype.display.call(this);
        $("#date_" + id_name).before("<p class = \"card-text\"> " + this.ticket_price + " </p><a href=\"" + this.web_address + "\" class=\"btn btn-light\"> " + this.web_address + " </a>");
        $("#name_" + id_name).after("<p class = \"card-text\"> " + this.event_date + " </p><p class = \"card-text\"> " + this.event_time + " </p>");
    };
    return Event1;
}(Location1));
var charles = new Location1("St. Charles Church", "Vienna", "1010", "Karlsplatz 1", "img/charles.jpg", "24.05.2020 12:45");
var park = new Location1("Schönbrunn Park, Vienna", "Wien", "1130", "Maxingstraße 13b", "img/park.jpg", "25.04.2020 13:45");
var on = new Restaurant("On Restaurant", "Vienna", "1050", "Wehrgasse 8", "img/on.jpeg", "12.06.2020 02:30", "+43(1)5854900", "Chinese", "http://www.restaurant-on.at/");
var bio = new Restaurant("BioFrische", "Wien", "1150", "Stutterheimstraße 6", "img/bio.jpg", "04.02.2019 18:15", "+43(1) 9529215", "Indian", "http://biofrische.wien");
var cats = new Event1("Cats - the musical", "Vienna", "1010", "Ronacher-Seilerstätte 9", "img/cats.jpg", "23.06.2018 10:45", "http://catsmusical.at", "Fr., 15.12.2020.", "20:00", "€ 120,00");
var guns = new Event1("Guns 'n Roses", "Wien", "1020", "Ernst-Happel Stadion, Meiereistraße 7", "img/guns.jpg", "28.10.2019 09:17", "https://www.gunsnroses.com/", "Sat, 09.06.2020", "19:30", "€ 95,50");
var places = [charles, park, on, bio, cats, guns];
for (var _i = 0, places_1 = places; _i < places_1.length; _i++) {
    var place = places_1[_i];
    place.display();
}
function reorderDate(oneDate) {
    var date_array = [oneDate.slice(9, 11), oneDate.slice(12, 14), oneDate.slice(15, 19), oneDate.slice(20, 22), oneDate.slice(23, 25)];
    var order_date = [date_array[2], date_array[1], date_array[0], date_array[3], date_array[4]];
    var order_date_string = order_date.join(".");
    return order_date_string;
}
$("button").on("click", function (event) {
    event.preventDefault();
    // Gets ID of the button
    var button_id = $(this).attr("id");
    if (button_id == "desc") {
        var order = $(".card-deck").sort(function (a, b) {
            var date_a = $(a).find(".date").text();
            var date_b = $(b).find(".date").text();
            return reorderDate(date_a) > reorderDate(date_b) ? -1 : 1;
        });
    }
    else if (button_id == "asc") {
        var order = $(".card-deck").sort(function (a, b) {
            var date_a = $(a).find(".date").text();
            var date_b = $(b).find(".date").text();
            return reorderDate(date_a) < reorderDate(date_b) ? -1 : 1;
        });
    }
    $("#wrapper").html(order);
});
