(function() {
    var getGigs = "https://rest.bandsintown.com/artists/Oddjob/events?app_id=oddjob_test";
    //for bypassing API while dev
    getGigs = "saved-events.json";

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
})();

(function() {
    var playlist = [
        { title: "Somethin", album: "Foreevernevermore", year: 2000, src: "audio/656591004.mp3" },
        { title: "Somethin else", album: "Foreevernevermore", year: 2000, src: "audio/900257259.mp3" },
        { title: "yeee", album: "Foreevernevermore", year: 2000, src: "/audio/2206372333.mp3" }
    ];

    var nowPlaying = 0;

    var oddPlayer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'green',
        hideScrollbar: true,
        height: 50,
        barWidth: 3,
        cursorColor: "orange",
        cursorWidth: 3,
        progressColor: 'grey'
    });

    document.addEventListener("DOMContentLoaded", function() {
        loadNew.call(playlist[nowPlaying]);
    });

    const playBtn = document.querySelector("#play-pause-btn");
    playBtn.addEventListener("click", playPause);

    const stopBtn = document.querySelector("#stop-btn");
    stopBtn.addEventListener("click", stop);

    const nextBtn = document.querySelector("#next-btn");
    nextBtn.addEventListener("click", next);

    const prevBtn = document.querySelector("#prev-btn");
    prevBtn.addEventListener("click", prev);


    function loadNew() {
        let progress = "";
        oddPlayer.on('loading', function(percents) {
            progress = document.querySelector("#progress");
            progress.value = percents;
        });
        oddPlayer.on('ready', function() {
            progress.style.display = "none";
        });

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