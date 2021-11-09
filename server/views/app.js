//Client ID c04e4c250c59419fab4964ce7ce5ff75 Cezary95 nBsv7f2nizCpTcTowfdzH2MJYv5PdCqQ
var wow = {
    Secret: "nBsv7f2nizCpTcTowfdzH2MJYv5PdCqQ",
    ClientID: "c04e4c250c59419fab4964ce7ce5ff75",
    client: "Cezary95"
};
var nick = playerData.playerNick.toLowerCase();
var server = playerData.playerServer.toLowerCase();
server = server.replace(' ', '-');
var player = {
    playerNick: nick,
    playerServer: server
};
//fetch do nicku i server nama
fetch('https://eu.battle.net/oauth/token', {
    method: 'POST', body: "grant_type=client_credentials&client_id=" + wow.ClientID + "&client_secret=" + wow.Secret, headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then(function (dane) { return dane.json(); }).then(function (dane) {
    //Specka
    fetch("https://eu.api.blizzard.com/profile/wow/character/" + server + "/" + nick + "/specializations?namespace=profile-eu&locale=en_GB&access_token=" + dane.access_token, {}).then(function (dane) { return dane.json(); }).then(function (dane) {
        if (404 === dane.code) {
            window.location.replace("/");
        }
    });
    // raid progress mythic
    fetch("https://eu.api.blizzard.com/profile/wow/character/" + server + "/" + nick + "/encounters/raids?namespace=profile-eu&locale=en_GB&access_token=" + dane.access_token, {}).then(function (dane) { return dane.json(); }).then(function (dane) {
        //Dostep do danych o raidzie 
        console.log(dane);
        var isShadow = false;
        for (var j = 0; j < dane.expansions.length; j++) {
            if (dane.expansions[j].expansion.name === "Shadowlands") {
                isShadow = true;
            }
        }
        if (isShadow === false) {
            updateMythic(0);
            var hold = document.getElementById("myNumber");
            var para = document.createElement("p");
            var node = document.createTextNode("0/10");
            para.appendChild(node);
            hold.appendChild(para);
        }
        var expansion = dane.expansions[dane.expansions.length - 1];
        //szukanie istancji po name sactum of domination
        var instances = expansion.instances;
        var instances_index = -1;
        for (var i = 0; i < instances.length; i++) {
            if (instances[i].instance.name === "Sanctum of Domination") {
                instances_index = i;
            }
        }
        //Sprawdzenia czy postac grała mythica
        var indexJ = -1;
        var mode = instances[instances_index].modes;
        for (var j = 0; j < mode.length; j++) {
            if (mode[j].difficulty.type === "MYTHIC") {
                indexJ = j;
            }
        }
        if (indexJ != -1) {
            updateMythic((mode[indexJ].progress.completed_count) * 10);
            var hold = document.getElementById("myNumber");
            var para = document.createElement("p");
            var node = document.createTextNode(mode[indexJ].progress.completed_count + "/10");
            para.appendChild(node);
            hold.appendChild(para);
        }
        else {
            updateMythic(0);
            var hold = document.getElementById("myNumber");
            var para = document.createElement("p");
            var node = document.createTextNode("0/10");
            para.appendChild(node);
            hold.appendChild(para);
        }
    });
    // raid progress HC
    fetch("https://eu.api.blizzard.com/profile/wow/character/" + server + "/" + nick + "/encounters/raids?namespace=profile-eu&locale=en_GB&access_token=" + dane.access_token, {}).then(function (dane) { return dane.json(); }).then(function (dane) {
        //Dostep do danych o raidzie 
        //dane na temat expansi
        var expansion = dane.expansions[dane.expansions.length - 1];
        //szukanie istancji po name sactum of domination
        var instances = expansion.instances;
        var instances_index = -1;
        var isShadow = false;
        for (var j = 0; j < dane.expansions.length; j++) {
            if (dane.expansions[j].expansion.name === "Shadowlands") {
                isShadow = true;
            }
        }
        if (isShadow === false) {
            updateHc(0);
            var hold = document.getElementById("hcNumber");
            var para = document.createElement("p");
            var node = document.createTextNode("0/10");
            para.appendChild(node);
            hold.appendChild(para);
        }
        for (var i = 0; i < instances.length; i++) {
            if (instances[i].instance.name === "Sanctum of Domination") {
                instances_index = i;
            }
        }
        //Sprawdzenia czy postac grała mythica
        var indexJ = -1;
        var mode = instances[instances_index].modes;
        for (var j = 0; j < mode.length; j++) {
            if (mode[j].difficulty.type === "HEROIC") {
                indexJ = j;
            }
        }
        if (indexJ != -1) {
            updateHc((mode[indexJ].progress.completed_count) * 10);
            var hold = document.getElementById("hcNumber");
            var para = document.createElement("p");
            var node = document.createTextNode(mode[indexJ].progress.completed_count + "/10");
            para.appendChild(node);
            hold.appendChild(para);
        }
        else {
            updateHc(0);
            var hold = document.getElementById("hcNumber");
            var para = document.createElement("p");
            var node = document.createTextNode("0/10");
            para.appendChild(node);
            hold.appendChild(para);
        }
    });
    fetch("https://eu.api.blizzard.com/profile/wow/character/" + server + "/" + nick + "/encounters/raids?namespace=profile-eu&locale=en_GB&access_token=" + dane.access_token, {}).then(function (dane) { return dane.json(); }).then(function (dane) { return console.log(dane); });
    //dungeon score 
    fetch("https://eu.api.blizzard.com/profile/wow/character/" + server + "/" + nick + "/mythic-keystone-profile?namespace=profile-eu&locale=en_GB&access_token=" + dane.access_token, {}).then(function (dane) { return dane.json(); }).then(function (dane) {
        var score = dane.current_mythic_rating.rating;
        var hold = document.getElementById("score");
        var para = document.createElement("p");
        var node = document.createTextNode("Dungeon score: " + score.toFixed(0));
        para.appendChild(node);
        hold.appendChild(para);
    });
    //Avatar postaci
    fetch("https://eu.api.blizzard.com/profile/wow/character/" + server + "/" + nick + "/character-media?namespace=profile-eu&locale=en_GB&access_token=" + dane.access_token, {}).then(function (dane) { return dane.json(); }).then(function (dane) {
        console.log(dane.assets[3].value);
        var avatarID = document.getElementById('avatar');
        var img = document.createElement("img");
        img.src = dane.assets[3].value;
        img.id = "avatarID";
        avatarID.appendChild(img);
    });
    //PVP 2vs2
    fetch("https://eu.api.blizzard.com/profile/wow/character/" + server + "/" + nick + "/pvp-bracket/2v2?namespace=profile-eu&locale=en_GB&access_token=" + dane.access_token, {}).then(function (dane) { return dane.json(); }).then(function (dane) {
        console.log(dane);
        var img2vs2 = document.getElementById("img2vs2");
        var p2vs2 = document.getElementById("p2vs2");
        var para1 = document.createElement("p");
        var er = 404;
        if (er === dane.code) {
            img2vs2.src = 'Foto/RJ6XE5WS8D6G1528483047503.png';
            var text2vs2 = document.createTextNode("2v2 Arena raitng: 0");
            para1.appendChild(text2vs2);
            p2vs2.appendChild(para1);
        }
        var season = dane.season.id;
        var rating = dane.rating;
        var text1 = document.createTextNode("2v2 Arena raitng: " + rating);
        if (season != 31) {
            img2vs2.src = 'Foto/RJ6XE5WS8D6G1528483047503.png';
            var text2vs2 = document.createTextNode("2v2 Arena raitng: 0");
            para1.appendChild(text2vs2);
            p2vs2.appendChild(para1);
        }
        else {
            para1.appendChild(text1);
            p2vs2.appendChild(para1);
            if (rating < 1399) {
                img2vs2.src = 'Foto/RJ6XE5WS8D6G1528483047503.png';
            }
            else if (rating >= 1400 && rating <= 1599) {
                img2vs2.src = 'Foto/UI_RankedPvP_02.png';
            }
            else if (rating >= 1600 && rating <= 1799) {
                img2vs2.src = 'Foto/Q4TDZMWJS1DC1528483047584.png';
            }
            else if (rating >= 1800 && rating <= 2099) {
                img2vs2.src = 'Foto/UI_RankedPvP_04.png';
            }
            else if (rating >= 2100 && rating <= 2399) {
                img2vs2.src = 'Foto/ui-rankedpvp-05-1537178803.png';
            }
            else if (rating >= 2400) {
                img2vs2.src = 'Foto/UI_RankedPvP_06.png';
            }
        }
    });
    //PVP 3vs3
    fetch("https://eu.api.blizzard.com/profile/wow/character/" + server + "/" + nick + "/pvp-bracket/3v3?namespace=profile-eu&locale=en_GB&access_token=" + dane.access_token, {}).then(function (dane) { return dane.json(); }).then(function (dane) {
        var er = 404;
        console.log(dane);
        var img3vs3 = document.getElementById("img3vs3");
        var p3vs3 = document.getElementById("p3vs3");
        var img2 = document.createElement('img');
        var para2 = document.createElement("p");
        if (er === dane.code) {
            img3vs3.src = 'Foto/RJ6XE5WS8D6G1528483047503.png';
            var text3vs3 = document.createTextNode("3v3 Arena raitng: 0");
            para2.appendChild(text3vs3);
            p3vs3.appendChild(para2);
        }
        var season = dane.season.id;
        var rating = dane.rating;
        var text2 = document.createTextNode("3v3 Arena raitng: " + rating);
        if (season != 31) {
            img3vs3.src = 'Foto/RJ6XE5WS8D6G1528483047503.png';
            var text3vs3 = document.createTextNode("2v2 Arena raitng: 0");
            para2.appendChild(text3vs3);
            p3vs3.appendChild(para2);
        }
        else {
            para2.appendChild(text2);
            p3vs3.appendChild(para2);
            if (rating < 1399) {
                img3vs3.src = 'Foto/RJ6XE5WS8D6G1528483047503.png';
            }
            else if (rating >= 1400 && rating <= 1599) {
                img3vs3.src = 'Foto/UI_RankedPvP_02.png';
            }
            else if (rating >= 1600 && rating <= 1799) {
                img3vs3.src = 'Foto/Q4TDZMWJS1DC1528483047584.png';
            }
            else if (rating >= 1800 && rating <= 2099) {
                img3vs3.src = 'Foto/UI_RankedPvP_04.png';
            }
            else if (rating >= 2100 && rating <= 2399) {
                img3vs3.src = 'Foto/ui-rankedpvp-05-1537178803.png';
            }
            else if (rating >= 2400) {
                img3vs3.src = 'Foto/UI_RankedPvP_06.png';
            }
        }
    });
});
//Mythic Progress bar 
function updateMythic(width) {
    var element = document.getElementById("progressBarMythic");
    var width_i = 0;
    var identity = setInterval(scene, 10);
    function scene() {
        if (width_i >= width) {
            clearInterval(identity);
        }
        else {
            width_i++;
            element.style.width = width_i + '%';
        }
    }
}
//HC progress bar 
function updateHc(width) {
    var element = document.getElementById("progressBarHC");
    var width_i = 0;
    var identity = setInterval(scene, 10);
    function scene() {
        if (width_i >= width) {
            clearInterval(identity);
        }
        else {
            width_i++;
            element.style.width = width_i + '%';
        }
    }
}
//opsłuż kiedy nie znajdzie gracza
//Obsluzyc 404 na postaci zeby 0 pokazywaly 
//Dodac losowych graczy jako przyklad
//# sourceMappingURL=app.js.map