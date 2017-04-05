"use strict";

(function () {
    var getGigs = "https://rest.bandsintown.com/artists/Oddjob/events?app_id=oddjob_test";
    //for bypassing API while dev
    getGigs = "saved-events.json";

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
})();

(function () {
    var playlist = [{ title: "boom", album: "boom-shak", year: 2008, src: "audio/boom.wav" }, { title: "clap", album: "clap-shak", year: 2001, src: "audio/clap.wav" }, { title: "openhat", album: "openhat-shak", year: 1999, src: "audio/openhat.wav" }];

    var nowPlaying = 0;

    var oddPlayer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'white',
        barWidth: 5,
        cursorColor: "orange",
        cursorWidth: 3,
        progressColor: 'grey'
    });

    document.addEventListener("DOMContentLoaded", function () {
        loadNew.call(playlist[nowPlaying]);
    });

    var playBtn = document.querySelector("#play-pause-btn");
    playBtn.addEventListener("click", playPause);

    var stopBtn = document.querySelector("#stop-btn");
    stopBtn.addEventListener("click", stop);

    var nextBtn = document.querySelector("#next-btn");
    nextBtn.addEventListener("click", next);

    var prevBtn = document.querySelector("#prev-btn");
    prevBtn.addEventListener("click", prev);

    function loadNew() {
        oddPlayer.load(this.src);
        printMeta.call(this);
    }

    function playPause() {
        oddPlayer.playPause();
    }

    function play() {
        oddPlayer.play();
    }

    function stop() {
        oddPlayer.stop();
    }

    function next() {
        nowPlaying++;
        if (nowPlaying > playlist.length - 1) nowPlaying = 0;
        loadNew.call(playlist[nowPlaying]);
        oddPlayer.on('ready', play);
    }

    function prev() {
        nowPlaying--;
        if (nowPlaying < 0) nowPlaying = playlist.length - 1;
        loadNew.call(playlist[nowPlaying]);
        oddPlayer.on('ready', play);
    }

    function printMeta() {
        document.querySelector("#track-title").innerText = this.title;
        document.querySelector("#track-album").innerText = this.album;
        document.querySelector("#track-year").innerText = this.year;
    }
})();