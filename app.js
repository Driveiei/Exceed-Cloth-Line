let rain = 0
let light = 0
let temp = 0
let humid = 0
let start = 0
let finish = 0
let test = 0
let drop = "on"
let x = false

let getWeb = (sensor) => {
    return $.ajax({
        type: "GET",
        url: `http://ecourse.cpe.ku.ac.th/exceed/api/odinpalm-${sensor}/view`,
        dataType: "text",
    });
}

let getAll = () => {
    test = getWeb("rain_status").then((response) => {
        rain =parseInt(response)
        if (rain === 0) {
            $('#result-rain-image').html('<img width="78" src="./source/Rainy.svg" alt="">')
            $('#result-rain').html(`<div class="miniText"><br><h3>Rainy</h3></div>`)
        }
        else {
            $('#result-rain-image').html('<img width="78" src="./source/Cloudy.svg" alt="">')
            $('#result-rain').html(`<div class="miniText"><br><h3>Sunny</h3></div>`)
        }
    })

    test = getWeb("light_status").then((response) => {
        light = response
        if(light <=450){
            $('#result-light-image').html('<img width="78" src="./source/DayNight.svg" alt="">')
            $('#result-light').html(`<div class="miniText">
            <br>
            <h3>Goodnight</h3>
        </div>`)
        }
        else{
            $('#result-light-image').html('<img width="78" src="./source/Daylight.svg" alt="">')
            $('#result-light').html(`<div class="miniText">
            <br>
            <h3>Morning</h3>
        </div>`)
        }
    })

    test = getWeb("temp").then((response) => {
        temp = response
        $('#result-temp').html(`<div class="miniText"> 
        <br>
        <h3>${temp}°C</h3>
</div>`)
    })
    test = getWeb("humid").then((response) => {
        humid = parseFloat(response)
        $('#result-humid').html(`<div class="miniText"><br><h3>${humid}</h3></div>`)
    })
    test = getWeb("start").then((response) => {
        start = response
        $('#result-start').html(`<h4>${start}</h4>`)
    })
    test = getWeb("finish").then((response) => {
        finish = response
        $('#result-finish').html(`<h4>${finish}</h4>`)
    })
}

let getSetup = () => {
    setInterval(getAll, 2000)

}

let postWeb = (sensor, data) => {
    $.ajax({
        type: "POST",
        url: `http://ecourse.cpe.ku.ac.th/exceed/api/odinpalm-${sensor}/set`,
        data: {
            value: data
        },
        dataType: "json",
        success: function (response) {

        }
    });
}

let postSetup = () => {
    $('#auto-drop-button').on('click', () => {
        console.log(x)
        if(x){
        postWeb('drop_status', 2)
        }
    })
    $('#on-round-button').on('mousedown', () => {
        postWeb('round_status', 1)
    })
    $('#on-round-button').on('mouseup', () => {
        postWeb('round_status', 0)
    })
}

let swapSwitch = ()=>{
    $('#swap').on('click',() =>{
        x = !x;
        if(x === true){
            $('#show').html(`<div class="col-6" style="padding-top: 8px">
            <button id="auto-drop-button" type="button" class="btn btn-danger btn-lg">Danger</button>
        </div>`)
        }
        else{
            $('#show').html(`<div class="col-6" style="padding-top: 8px">
            <button id="auto-drop-button" type="button" class="btn btn-danger btn-lg disabled">Danger</button>
        </div>`)
        }
    })
}

let init = () => {
    getSetup()
    postSetup()
    swapSwitch()
}

$(init)