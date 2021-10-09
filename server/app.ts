//Client ID c04e4c250c59419fab4964ce7ce5ff75 Cezary95 nBsv7f2nizCpTcTowfdzH2MJYv5PdCqQ

let wow = {
    Secret: "nBsv7f2nizCpTcTowfdzH2MJYv5PdCqQ",
    ClientID: "c04e4c250c59419fab4964ce7ce5ff75",
    client: "Cezary95"
}
// fetch(`https://<request URI>/?access_token={${wow.Secret}}`).then((data) => data.json).then((data) => console.log(data))

interface Player {

    playerName: string;

    playerRealm: string;


}

let player: Player = {

    playerName: "bearthorn",

    playerRealm: "burning-legion"
};

//fetch do nicku i server nama

fetch('/main', {
    method: 'POST'
}).then((data) => data.json()).then((data) => { console.log(data) })




fetch('https://eu.battle.net/oauth/token', {
    method: 'POST', body: `grant_type=client_credentials&client_id=${wow.ClientID}&client_secret=${wow.Secret}`, headers: {
        'Content-Type': 'application/x-www-form-urlencoded'

    }
}).then((dane) => dane.json()).then((dane) => {


    //Specka
    fetch(`https://eu.api.blizzard.com/profile/wow/character/${player.playerRealm}/${player.playerName}/specializations?namespace=profile-eu&locale=en_GB&access_token=${dane.access_token}`, {}).then((dane) => dane.json()).then((dane) => console.log(dane.active_specialization.name))


    // raid progress
    fetch(`https://eu.api.blizzard.com/profile/wow/character/${player.playerRealm}/${player.playerName}/encounters/raids?namespace=profile-eu&locale=en_GB&access_token=${dane.access_token}`, {}).then((dane) => dane.json()).then((dane) => {

        //Dostep do danych o raidzie 

        //dane na temat expansi
        let expansion = dane.expansions[dane.expansions.length - 1]
        //szukanie istancji po name sactum of domination
        let instances = expansion.instances
        let instances_index = -1
        for (let i = 0; i < instances.length; i++) {

            if (instances[i].instance.name === "Sanctum of Domination") {
                instances_index = i
            }

        }
        //Sprawdzenia czy postac grała mythica
        let indexJ = -1;

        let mode = instances[instances_index].modes
        for (let j = 0; j < mode.length; j++) {
            if (mode[j].difficulty.type === "MYTHIC") {
                indexJ = j
            }


        }

        if (indexJ != -1) { console.log(mode[indexJ].progress.completed_count) } else { console.log("noob nie gra mythica") }





        //[0].instance.name//["Sanctum of Domination"].modes[2].progress.completed_count
    })

    fetch(`https://eu.api.blizzard.com/profile/wow/character/${player.playerRealm}/${player.playerName}/encounters/raids?namespace=profile-eu&locale=en_GB&access_token=${dane.access_token}`, {}).then((dane) => dane.json()).then((dane) => console.log(dane))


    //dungeon score 
    fetch(`https://eu.api.blizzard.com/profile/wow/character/${player.playerRealm}/${player.playerName}/mythic-keystone-profile?namespace=profile-eu&locale=en_GB&access_token=${dane.access_token}`, {}).then((dane) => dane.json()).then((dane) => console.log(dane.current_mythic_rating.rating))

    //Avatar postaci
    fetch(`https://eu.api.blizzard.com/profile/wow/character/${player.playerRealm}/${player.playerName}/character-media?namespace=profile-eu&locale=en_GB&access_token=${dane.access_token}`, {}).then((dane) => dane.json()).then((dane) => console.log(dane))

    //PVP
    fetch(`https://eu.api.blizzard.com/profile/wow/character/${player.playerRealm}/${player.playerName}/pvp-bracket/2v2?namespace=profile-eu&locale=en_GB&access_token=${dane.access_token}`, {}).then((dane) => dane.json()).then((dane) => {

        console.log(dane)

        let season = dane.season.id
        let rating = dane.rating

        if (season != 31) {
            console.log("lol pvp nie gra")
        } else { console.log(rating) }



    })

}
)