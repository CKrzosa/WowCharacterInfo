//Client ID c04e4c250c59419fab4964ce7ce5ff75 Cezary95 nBsv7f2nizCpTcTowfdzH2MJYv5PdCqQ
var wow = {
    Secret: "nBsv7f2nizCpTcTowfdzH2MJYv5PdCqQ",
    ClientID: "c04e4c250c59419fab4964ce7ce5ff75",
    client: "Cezary95"
};
var player = {
    playerName: "bearthorn",
    playerRealm: "burning-legion"
};

//fetch do nicku i server nama

let api = "/main"
const myAsynFunction = async (url: api): Promise<T> => {
    await fetch(api, {
        method: 'POST'
    }).then(function (data) { return data.json(); }).then(function (data) { console.log(data); });

}





fetch('https://eu.battle.net/oauth/token', {
    method: 'POST', body: "grant_type=client_credentials&client_id=" + wow.ClientID + "&client_secret=" + wow.Secret, headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then(function (dane) { return dane.json(); }).then(function (dane) {
    //Specka
    fetch("https://eu.api.blizzard.com/profile/wow/character/" + player.playerRealm + "/" + player.playerName + "/specializations?namespace=profile-eu&locale=en_GB&access_token=" + dane.access_token, {}).then(function (dane) { return dane.json(); }).then(function (dane) { return console.log(dane.active_specialization.name); });
    // raid progress
    fetch("https://eu.api.blizzard.com/profile/wow/character/" + player.playerRealm + "/" + player.playerName + "/encounters/raids?namespace=profile-eu&locale=en_GB&access_token=" + dane.access_token, {}).then(function (dane) { return dane.json(); }).then(function (dane) {
        //Dostep do danych o raidzie 
        //dane na temat expansi
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
            console.log(mode[indexJ].progress.completed_count);
        }
        else {
            console.log("noob nie gra mythica");
        }
        //[0].instance.name//["Sanctum of Domination"].modes[2].progress.completed_count
    });
    fetch("https://eu.api.blizzard.com/profile/wow/character/" + player.playerRealm + "/" + player.playerName + "/encounters/raids?namespace=profile-eu&locale=en_GB&access_token=" + dane.access_token, {}).then(function (dane) { return dane.json(); }).then(function (dane) { return console.log(dane); });
    //dungeon score 
    fetch("https://eu.api.blizzard.com/profile/wow/character/" + player.playerRealm + "/" + player.playerName + "/mythic-keystone-profile?namespace=profile-eu&locale=en_GB&access_token=" + dane.access_token, {}).then(function (dane) { return dane.json(); }).then(function (dane) { return console.log(dane.current_mythic_rating.rating); });
    //Avatar postaci
    fetch("https://eu.api.blizzard.com/profile/wow/character/" + player.playerRealm + "/" + player.playerName + "/character-media?namespace=profile-eu&locale=en_GB&access_token=" + dane.access_token, {}).then(function (dane) { return dane.json(); }).then(function (dane) { return console.log(dane); });
    //PVP
    fetch("https://eu.api.blizzard.com/profile/wow/character/" + player.playerRealm + "/" + player.playerName + "/pvp-bracket/2v2?namespace=profile-eu&locale=en_GB&access_token=" + dane.access_token, {}).then(function (dane) { return dane.json(); }).then(function (dane) {
        console.log(dane);
        var season = dane.season.id;
        var rating = dane.rating;
        if (season != 31) {
            console.log("lol pvp nie gra");
        }
        else {
            console.log(rating);
        }
    });
});
//# sourceMappingURL=app.js.map