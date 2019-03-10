function callVerfication() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    var entity = url.searchParams.get("entity");
    console.log(id);
    console.log(entity);

    fetch('https://us-central1-harvestor-f8623.cloudfunctions.net/unverification?id=' + id + "&entity=" + entity, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: "cors"
    }).then(response => {
        console.log(response.status);
        if (response.status === 200) {
            // redirect na dekuji stranku
            // window.location.href = 'registration_ok.html';
        } else {
            // redirect na faild stranku
            // window.location.href = 'registration_nok.html';
        }
    }).catch((error) => {
        // totalni selhani
        // window.location.href = 'registration_nok.html';
    });
}
