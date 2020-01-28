
function lookup(url, keyword){

    $('input').val("");

    $.ajax({
        url : url,
        method : "GET",
        dataType : "json",
        success : function(responseJSON){
            console.log(responseJSON);
            displayResults(responseJSON, keyword);
        },
        error : function(err){
            console.log(err);
        }
    });
}

function displayResults(responseJSON, keyword){

    let results = $('.results').empty();

    for(i = 0; i < 10; i++){

        results.append(`
        <p>
            <div class="title" onclick="window.open('https://www.youtube.com/watch?v=${responseJSON.items[i].id.videoId}')">${responseJSON.items[i].snippet.title}</div>
            <div><img class="dimension" onclick="window.open('https://www.youtube.com/watch?v=${responseJSON.items[i].id.videoId}')" src="${responseJSON.items[i].snippet.thumbnails.high.url}" /></div>
        </p>
        `);

    }

    results.append(`
        <button id="Anterior" type="Submit">
            Anterior
        </button>

        <button id="Siguiente" type="submit">
            Siguiente
        </button>
    `);

    clickAnterior(responseJSON, keyword);
    clickSiguiente(responseJSON, keyword);

}

function clickAnterior(responseJSON, keyword){

    let ant = $('#Anterior');

    $(ant).on('click', function(e){
        let urlAnt = `https://www.googleapis.com/youtube/v3/search?type=video&pageToken=${responseJSON.prevPageToken}&key=AIzaSyDPkzGh8AonYcel-jq8qknGU4KUFboKfqQ&part=snippet&maxResults=10&q=${keyword}`;

        lookup(urlAnt, keyword);
    });

}

function clickSiguiente(responseJSON, keyword){

    let sig = $('#Siguiente');

    $(sig).on('click', function(e){
        let urlSig = `https://www.googleapis.com/youtube/v3/search?type=video&pageToken=${responseJSON.nextPageToken}&key=AIzaSyDPkzGh8AonYcel-jq8qknGU4KUFboKfqQ&part=snippet&maxResults=10&q=${keyword}`;

        lookup(urlSig, keyword);
    });
}

function watchBtn(){

    let btn = $('#keyword');

    $(btn).on('click', function(e){

        e.preventDefault();

        let keyword = $('input').val();

        let url = `https://www.googleapis.com/youtube/v3/search?type=video&key=AIzaSyDPkzGh8AonYcel-jq8qknGU4KUFboKfqQ&part=snippet&maxResults=10&q=${keyword}`;

        lookup(url, keyword);

    });

}

function init(){
    watchBtn();
}

init();