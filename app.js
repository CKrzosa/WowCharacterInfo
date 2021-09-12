//Client ID c04e4c250c59419fab4964ce7ce5ff75 Cezary95 nBsv7f2nizCpTcTowfdzH2MJYv5PdCqQ
var wow = {
    Secret: "nBsv7f2nizCpTcTowfdzH2MJYv5PdCqQ",
    ClientID: "c04e4c250c59419fab4964ce7ce5ff75",
    client: "Cezary95"
};
// fetch(`https://<request URI>/?access_token={${wow.Secret}}`).then((data) => data.json).then((data) => console.log(data))
fetch('https://us.battle.net/oauth/token', {
    method: 'POST', body: "grant_type=client_credentials&client_id=" + wow.ClientID + "&client_secret=" + wow.Secret, headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then(function (dane) { return dane.json(); }).then(function (dane) { return console.log(dane); });
