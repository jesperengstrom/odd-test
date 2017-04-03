"use strict";

var getGigs = "https://rest.bandsintown.com/artists/Oddjob/events?app_id=oddjob_test";
//for bypassing API while dev
//getGigs = "saved-events.json";

fetch(getGigs).then(function (response) {
    return response.json();
}).then(function (gigs) {
    printGigs(gigs);
});

function printGigs(gigs) {
    console.log(gigs);
    var tbody = document.querySelector("#gigbody");
    for (var i in gigs) {
        var date = gigs[i].datetime.substring(0, 10) || "TBA";
        var bitLink = gigs[i].url;
        var venue = gigs[i].venue.name || "TBA";
        var city = gigs[i].venue.city || "TBA";
        var country = gigs[i].venue.country || "TBA";
        var tickets = ticketBtn(gigs[i].offers) || "";

        tbody.innerHTML += "<tr>\n                                <td>" + date + "</td>\n                                <td><a href=\"" + bitLink + "\" target=\"_blank\">" + venue + "</a></td>\n                                <td>" + city + "</td>\n                                <td>" + country + "</td>\n                                <td>" + tickets + "</td>\n                            <tr>";
    }
}

function ticketBtn(gig) {
    var btn = "";
    for (var i in gig) {
        btn += "<a href=\"" + gig[i].url + "\" target=\"_blank\"><button class=\"btn btn-info\">" + gig[i].type + "</button></a>";
    }
    return btn;
}