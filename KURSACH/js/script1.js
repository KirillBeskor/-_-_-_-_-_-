window.onload = function () {
    var page = document.body.getAttribute('data-page');
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'data.xml', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            var xmlDoc = xhr.responseXML;
            if (xmlDoc) {
                if (page == 'index') {
                    renderHome(xmlDoc);
                }
            }
        }
    };
    xhr.send(null);
};

function renderHome(xml) {
    var grid = document.getElementById('services-container');
    var newsGrid = document.getElementById('news-container');

    // Рендер направлений
    var sections = xml.getElementsByTagName('section');
    for (var i = 0; i < sections.length; i++) {
        var title = sections[i].getElementsByTagName('title')[0].childNodes[0].nodeValue;
        var short = sections[i].getElementsByTagName('short')[0].childNodes[0].nodeValue;
        var img = sections[i].getElementsByTagName('image')[0].childNodes[0].nodeValue;
        var link = sections[i].getElementsByTagName('link')[0].childNodes[0].nodeValue;

        var div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = '<div class="card__img" style="background-image: url(' + img + ')"></div>' +
            '<div class="card__info"><h3>' + title + '</h3><p>' + short + '</p></div>';

        div.onclick = createClickHandler(link);
        if (grid) grid.appendChild(div);
    }

    // Рендер новостей
    var items = xml.getElementsByTagName('item');
    for (var j = 0; j < items.length; j++) {
        var date = items[j].getElementsByTagName('date')[0].childNodes[0].nodeValue;
        var nTitle = items[j].getElementsByTagName('title')[0].childNodes[0].nodeValue;
        var text = items[j].getElementsByTagName('text')[0].childNodes[0].nodeValue;

        var nDiv = document.createElement('div');
        nDiv.className = 'card';
        nDiv.innerHTML = '<div class="card__info"><small>' + date + '</small><h4>' + nTitle + '</h4><p>' + text + '</p></div>';
        if (newsGrid) newsGrid.appendChild(nDiv);
    }
}

function createClickHandler(url) {
    return function () {
        window.location.href = url;
    };
}
