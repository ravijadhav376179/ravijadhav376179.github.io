var serverURL = "http://127.0.0.1:8081";
$(document).ready(function() {
	initCanvas();

//	$("select#viewSelector").on("change", function(event) {
//		// console.log("change");
//		var view = event.target.value;
//		createLegends();
//		switch (view) {
//		case "opportunities":
//			createAssessments(true);
//			createUseCaseView(false);
//			break;
//		case "deployments":
//			createAssessments(false);
//			createUseCaseView(false);
//			break;
//		case "useCase":
//			createUseCaseView(true);
//			createAssessments(false);
//			break;
//		case "map":
//			createContentView(false);
//			break;
//		case "content":
//			createContentView(true);
//			break;
//		}
//	})
});

function fetchUploadedFile(step) {
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', serverURL + '/download?fileName=' + step.id, true);

    // Must include this line - specifies the response type we want
    xmlHTTP.responseType = 'arraybuffer';

    xmlHTTP.onload = function (e) {
        if(this.status === 200){
            $("#modalContainer").show();
            var b64 = base64ArrayBuffer(this.response);
            document.getElementById("imgshow").src = "data:image/png;base64," + b64;
        }else{
            alert("File Not Found!! Please upload a file.")
        }
        console.log("fetchUploadedFile this: ",this);
    };
    xmlHTTP.send();
}

function base64ArrayBuffer(arrayBuffer) {
    var base64 = ''
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    var bytes = new Uint8Array(arrayBuffer)
    var byteLength = bytes.byteLength
    var byteRemainder = byteLength % 3
    var mainLength = byteLength - byteRemainder

    var a, b, c, d
    var chunk

    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048) >> 12 // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032) >> 6 // 4032     = (2^6 - 1) << 6
        d = chunk & 63               // 63       = 2^6 - 1

        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
        chunk = bytes[mainLength]

        a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

        // Set the 4 least significant bits to zero
        b = (chunk & 3) << 4 // 3   = 2^2 - 1

        base64 += encodings[a] + encodings[b] + '=='
    } else if (byteRemainder == 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

        a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008) >> 4 // 1008  = (2^6 - 1) << 4

        // Set the 2 least significant bits to zero
        c = (chunk & 15) << 2 // 15    = 2^4 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + '='
    }

    return base64
}

function removeUploadedFile(step) {
    $.ajax({
        type: "GET",
        url: serverURL + "/remove?fileName=" + step.id,
        success: function (data) {
            alert(data.message);
            console.log("SUCCESS: ", data);
        },
        error: function (data) {
            alert(data.message);
            console.log("error: ", data);
        }
    })
}

function openFileExplorer(step) {
    $("input#uploadFile").click();
    var reader = new FileReader();

    function loadFile() {
        var file = document.querySelector('input#uploadFile').files[0];
        if (file) {

            var formData = new FormData();
            formData.append('file', file);

            $.ajax({
                url: serverURL + "/upload?fileName=" + step.id,
                type: 'POST',
                data: formData,
                processData: false,  // tell jQuery not to process the data
                contentType: false,  // tell jQuery not to set contentType
                success: function (data) {
                	console.log("UPLOAD data: ",data)
                    reader.onload = function (e) {
                        $("#modalContainer").show();
                        $('#imgshow').attr('src', e.target.result);
                    }
                    reader.readAsDataURL(file);
                },
                error: function (data) {
                    console.log("error: ", data);
                }
            });
        }
    }

    function parseFile() {
        var data = d3.csvParse(reader.result, function (d) {
            return d;
        });
        console.log("data: ", data);
    }

    $("input#uploadFile").on("change", function (e) {
        loadFile();
        $("input#uploadFile").off("change");
    });
}

function splitCamelCaseToString(s) {
    return s.split(/(?=[A-Z])/).join(' ');
}

function randomID() {
    return "l" + (Math.random().toString(36).substring(7));
}