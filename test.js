var table = document.getElementById("outputTable");
var values = [];
document.getElementById("infoSubmit").onclick = () =>{
    if (checkMandatory()){
        insertData();
        updateCountdown();
    }
}

function checkMandatory() {
    let mandatory = document.getElementById("mandatory");
    let uname = document.getElementById("unamein").value;
    let aname = document.getElementById("anamein").value;
    let adate = document.getElementById("adatein").value;
    let aweight = document.getElementById("aweightin").value;
    if (uname == "" || aname == "" || adate == "" || aweight == "") {
        mandatory.style.display = "block";
        return false;
    } else {
        mandatory.style.display = "none";
        return true;
    }
}

function insertData(){
    values.push([document.getElementById("unamein").value, document.getElementById("anamein").value, document.getElementById("adatein").value, document.getElementById("aweightin").value])
    let row = document.createElement("tr");
    for (let item of values[values.length - 1]) {
        var data = document.createElement("td");
        var itemin = document.createTextNode(item);
        data.appendChild(itemin);
        row.appendChild(data);
    }
    table.appendChild(row);
};

function updateCountdown(stop = false) {
    var countDownDate = new Date(values[0][2]).getTime();

    if (stop) {
        clearInterval(x);
        document.getElementById("theFinalCountdown").innerHTML = null;
    }
    // Update the count down every 1 second
    var x = setInterval(function() {    
        // Get today's date and time
        var now = new Date().getTime();
        
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Output the result in an element with id="demo"
        document.getElementById("theFinalCountdown").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
        
        // If the count down is over, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("theFinalCountdown").innerHTML = "EXPIRED";
        }
    }, 1000);
}