function getData(url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    xhr.send();

    function setData(jsonData) {
        data = jsonData;
    }

    xhr.onreadystatechange = function () {
        // readyState 0 = unsent // 1 = opened // 2 = headers_received // 3 = loading // 4 = done
        // status 200 == OK! // 404 = error // 403 = method not allowed
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("data").innerHTML = this.responseText;
            //console.log(typeof (this.responseText));
            //console.log(JSON.parse(this.responseText));
            //console.log(typeof (JSON.parse(this.responseText)));
            callback(JSON.parse(this.responseText));
        };
    };
}

/*
function printDataToConsole(data) {
    console.log(data);
};

getData(printDataToConsole);
*/

// set the Timeout to 500ms and then console.log(data)
/*
setTimeout(function () {
    console.log(data);
}, 500);
*/

function getTableHeaders(obj) {
    var tableHeaders = [];
    Object.keys(obj).forEach(function (key) {
        tableHeaders.push(`<td>${key}</td>`);
    });
    return `<tr>${tableHeaders}</tr>`;
};

function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
        <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
};

function writeToDocument(url) {
    var tableRows = [];
    var elmnt = document.getElementById("data");
    elmnt.innerHTML = "";
    getData(url, function (data) {
        var pagination;
        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous)
        };
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);
        data.forEach(function (item) {
            var dataRow = [];
            Object.keys(item).forEach(function (key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
            //elmnt.innerHTML += "<p>" + item.name + "</p>";
        });
        elmnt.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, "");
    });
};