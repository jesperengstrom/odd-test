var getGigs = "https://rest.bandsintown.com/artists/Oddjob/events?app_id=oddjob_test";
//for bypassing API while dev
//getGigs = "saved-events.json";

fetch(getGigs).
then((response) => {
    return response.json();
}).then((gigs) => {
    printGigs(gigs);
});

function printGigs(gigs) {
    console.log(gigs);
    let tbody = document.querySelector("#gigbody");
    for (let i in gigs) {
        let date = gigs[i].datetime.substring(0, 10) || "TBA";
        let bitLink = gigs[i].url;
        let venue = gigs[i].venue.name || "TBA";
        let city = gigs[i].venue.city || "TBA";
        let country = gigs[i].venue.country || "TBA";
        let tickets = ticketBtn(gigs[i].offers) || "";

        tbody.innerHTML += `<tr>
                                <td>${date}</td>
                                <td><a href="${bitLink}" target="_blank">${venue}</a></td>
                                <td>${city}</td>
                                <td>${country}</td>
                                <td>${tickets}</td>
                            <tr>`;
    }
}

function ticketBtn(gig) {
    let btn = ``;
    for (let i in gig) {
        btn += `<a href="${gig[i].url}" target="_blank"><button class="btn btn-info">${gig[i].type}</button></a>`;
    }
    return btn;

}