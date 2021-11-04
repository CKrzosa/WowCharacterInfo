//Client ID c04e4c250c59419fab4964ce7ce5ff75 Cezary95 nBsv7f2nizCpTcTowfdzH2MJYv5PdCqQ



let wow = {
    Secret: "nBsv7f2nizCpTcTowfdzH2MJYv5PdCqQ",
    ClientID: "c04e4c250c59419fab4964ce7ce5ff75",
    client: "Cezary95"
}
// fetch(`https://<request URI>/?access_token={${wow.Secret}}`).then((data) => data.json).then((data) => console.log(data))

interface Player {

    playerNick: string;

    playerServer: string;

}
declare let playerData: Player



let nick: string = playerData.playerNick.toLowerCase()

let server: string = playerData.playerServer.toLowerCase()


server = server.replace(' ', '-')


let player: Player = {

    playerNick: nick,

    playerServer: server
};


//fetch do nicku i server nama




fetch('https://eu.battle.net/oauth/token', {
    method: 'POST', body: `grant_type=client_credentials&client_id=${wow.ClientID}&client_secret=${wow.Secret}`, headers: {
        'Content-Type': 'application/x-www-form-urlencoded'

    }
}).then((dane) => dane.json()).then((dane) => {


    //Specka
    fetch(`https://eu.api.blizzard.com/profile/wow/character/${server}/${nick}/specializations?namespace=profile-eu&locale=en_GB&access_token=${dane.access_token}`, {}).then((dane) => dane.json()).then((dane) => console.log(dane.active_specialization.name))


    // raid progress mythic
    fetch(`https://eu.api.blizzard.com/profile/wow/character/${server}/${nick}/encounters/raids?namespace=profile-eu&locale=en_GB&access_token=${dane.access_token}`, {}).then((dane) => dane.json()).then((dane) => {

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

        if (indexJ != -1) {
            updateMythic((mode[indexJ].progress.completed_count) * 10)

            let hold = document.getElementById("myNumber")
            const para = document.createElement("p");
            const node = document.createTextNode(`${mode[indexJ].progress.completed_count}/10`);
            para.appendChild(node);
            hold.appendChild(para)



        } else {
            updateMythic(0)
            let hold = document.getElementById("myNumber")
            const para = document.createElement("p");
            const node = document.createTextNode(`0/10`);
            para.appendChild(node);
            hold.appendChild(para)
        }






    })


    // raid progress HC
    fetch(`https://eu.api.blizzard.com/profile/wow/character/${server}/${nick}/encounters/raids?namespace=profile-eu&locale=en_GB&access_token=${dane.access_token}`, {}).then((dane) => dane.json()).then((dane) => {

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
            if (mode[j].difficulty.type === "HEROIC") {
                indexJ = j
            }


        }


        if (indexJ != -1) {
            updateHc((mode[indexJ].progress.completed_count) * 10)
            let hold = document.getElementById("hcNumber")
            const para = document.createElement("p");
            const node = document.createTextNode(`${mode[indexJ].progress.completed_count}/10`);
            para.appendChild(node);
            hold.appendChild(para)

        } else {
            updateHc(0)
            let hold = document.getElementById("hcNumber")
            const para = document.createElement("p");
            const node = document.createTextNode(`0/10`);
            para.appendChild(node);
            hold.appendChild(para)
        }
    })

    fetch(`https://eu.api.blizzard.com/profile/wow/character/${server}/${nick}/encounters/raids?namespace=profile-eu&locale=en_GB&access_token=${dane.access_token}`, {}).then((dane) => dane.json()).then((dane) => console.log(dane))


    //dungeon score 
    fetch(`https://eu.api.blizzard.com/profile/wow/character/${server}/${nick}/mythic-keystone-profile?namespace=profile-eu&locale=en_GB&access_token=${dane.access_token}`, {}).then((dane) => dane.json()).then((dane) => {


        let score = dane.current_mythic_rating.rating

        let hold = document.getElementById("score")
        const para = document.createElement("p");
        const node = document.createTextNode(`Dungeon score: ${score.toFixed(0)}`);
        para.appendChild(node);
        hold.appendChild(para)

    })

    //Avatar postaci
    fetch(`https://eu.api.blizzard.com/profile/wow/character/${server}/${nick}/character-media?namespace=profile-eu&locale=en_GB&access_token=${dane.access_token}`, {}).then((dane) => dane.json()).then((dane) => {
        console.log(dane.assets[3].value)

        let avatarID = document.getElementById('avatar');
        let img = document.createElement("img");
        img.src = dane.assets[3].value
        img.id = "avatarID"

        avatarID.appendChild(img)
    })

    //PVP 2vs2
    fetch(`https://eu.api.blizzard.com/profile/wow/character/${server}/${nick}/pvp-bracket/2v2?namespace=profile-eu&locale=en_GB&access_token=${dane.access_token}`, {}).then((dane) => dane.json()).then((dane) => {

        console.log(dane)
        let img2vs2 = document.getElementById("img2vs2") as HTMLImageElement
        let p2vs2 = document.getElementById("p2vs2")


        let para1 = document.createElement("p");


        let season = dane.season.id
        let rating = dane.rating
        let text1 = document.createTextNode(`2v2 Arena raitng: ${rating}`);



        if (season != 31) {

            img2vs2.src = 'Foto/RJ6XE5WS8D6G1528483047503.png'
            let text2vs2 = document.createTextNode(`2v2 Arena raitng: 0`);
            para1.appendChild(text2vs2)
            p2vs2.appendChild(para1)





        } else {
            para1.appendChild(text1)
            p2vs2.appendChild(para1)
            if (rating < 1399) { img2vs2.src = 'Foto/RJ6XE5WS8D6G1528483047503.png' }
            else if (rating >= 1400 && rating <= 1599) { img2vs2.src = 'Foto/UI_RankedPvP_02.png' }
            else if (rating >= 1600 && rating <= 1799) { img2vs2.src = 'Foto/Q4TDZMWJS1DC1528483047584.png' }
            else if (rating >= 1800 && rating <= 2099) { img2vs2.src = 'Foto/UI_RankedPvP_04.png' }
            else if (rating >= 2100 && rating <= 2399) { img2vs2.src = 'Foto/ui-rankedpvp-05-1537178803.png' }
            else if (rating >= 2400) { img2vs2.src = 'Foto/UI_RankedPvP_06.png' }
        }



    })

    //PVP 3vs3
    fetch(`https://eu.api.blizzard.com/profile/wow/character/${server}/${nick}/pvp-bracket/3v3?namespace=profile-eu&locale=en_GB&access_token=${dane.access_token}`, {}).then((dane) => dane.json()).then((dane) => {

        console.log(dane)
        let img3vs3 = document.getElementById("img3vs3") as HTMLImageElement
        let p3vs3 = document.getElementById("p3vs3")

        let img2 = document.createElement('img');

        let para2 = document.createElement("p");

        let season = dane.season.id
        let rating = dane.rating

        let text2 = document.createTextNode(`3v3 Arena raitng: ${rating}`);


        if (season != 31) {

            img3vs3.src = 'Foto/RJ6XE5WS8D6G1528483047503.png'
            let text3vs3 = document.createTextNode(`2v2 Arena raitng: 0`);
            para2.appendChild(text3vs3)
            p3vs3.appendChild(para2)





        } else {

            para2.appendChild(text2)
            p3vs3.appendChild(para2)
            if (rating < 1399) { img3vs3.src = 'Foto/RJ6XE5WS8D6G1528483047503.png' }
            else if (rating >= 1400 && rating <= 1599) { img3vs3.src = 'Foto/UI_RankedPvP_02.png' }
            else if (rating >= 1600 && rating <= 1799) { img3vs3.src = 'Foto/Q4TDZMWJS1DC1528483047584.png' }
            else if (rating >= 1800 && rating <= 2099) { img3vs3.src = 'Foto/UI_RankedPvP_04.png' }
            else if (rating >= 2100 && rating <= 2399) { img3vs3.src = 'Foto/ui-rankedpvp-05-1537178803.png' }
            else if (rating >= 2400) { img3vs3.src = 'Foto/UI_RankedPvP_06.png' }
        }



    })




})

//Mythic Progress bar 
function updateMythic(width) {
    var element = document.getElementById("progressBarMythic");

    let width_i = 0
    var identity = setInterval(scene, 10);
    function scene() {
        if (width_i >= width) {
            clearInterval(identity);
        } else {
            width_i++;
            element.style.width = width_i + '%';
        }
    }
}

//HC progress bar 

function updateHc(width) {
    var element = document.getElementById("progressBarHC");

    let width_i = 0
    var identity = setInterval(scene, 10);

    function scene() {
        if (width_i >= width) {
            clearInterval(identity);
        } else {
            width_i++;
            element.style.width = width_i + '%';
        }
    }
}


//Przycisk cofania
//opsłuż kiedy nie znajdzie gracza
//Obsluzyc 404 na postaci zeby 0 pokazywaly 
//Dodac losowych graczy jako przyklad