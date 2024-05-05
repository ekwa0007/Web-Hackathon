var table = document.getElementById("outputTable");
var values = [];
var timer_index = 0;
document.getElementById("infoSubmit").onclick = () =>{
    if (checkMandatory()){
        insertData();
        updateCountdown();
    }
}

document.getElementById("infoClear").onclick = () =>{
    document.getElementById("unamein").value = "";
    document.getElementById("anamein").value = "";
    document.getElementById("adatein").value = "";
    document.getElementById("aweightin").value = "";
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
    document.getElementById("unamein").value = "";
    document.getElementById("anamein").value = "";
    document.getElementById("adatein").value = "";
    document.getElementById("aweightin").value = "";
    values.sort(compareFn);
};

function updateCountdown(stop = false) {
    if (stop) {
        clearInterval(x);
        document.getElementById("theFinalCountdown").innerHTML = null;
    }
    // Update the count down every 1 second
    var x = setInterval(function() {
        var countDownDate = new Date(values[timer_index][2]).getTime();    
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

        if (distance < 0) {
            if (timer_index < values.length){
                console.log("Restarting Timer");
                while (timer_index < values.length) {
                    console.log("Checking value at index:", timer_index, " Date:", values[timer_index][2]);
                    if (new Date(values[timer_index][2]).getTime() < new Date().getTime()){
                        timer_index++;
                        continue;
                    }
                    else{
                        console.log("Found future date at index:", timer_index);
                        break;
                    }
                }
                if (timer_index < values.length){
                    updateCountdown();
                } else {
                    console.log("No future dates found. Resetting timer_index or handling edge case.");
                    // Handle case where no valid future dates are found
                    clearInterval(x);
                    document.getElementById("theFinalCountdown").innerHTML = "EXPIRED";
                    document.getElementById("theFinalCountdown").style.color = "white";
                
                }
            }
            else{
                clearInterval(x);
                document.getElementById("theFinalCountdown").innerHTML = "EXPIRED";
                document.getElementById("theFinalCountdown").style.color = "white";
                
                }
            
        }

        if (distance < 60 * 60 * 1000){
            if (Math.floor(distance / 1000) % 2 == 0){
                document.getElementById("theFinalCountdown").style.color = "white";
            }
            else{
                document.getElementById("theFinalCountdown").style.color = "black";
            }
        }
    }, 1000);
}

function compareFn(a, b) {
    if (a[2] < b[2]) {
        return -1;
    } else if (a[2] > b[2]) {
        return 1;
    }
    return 0;
}

function RestartTimer(){
    console.log("Restarting Timer");
    while (timer_index < values.length) {
        console.log("Checking value at index:", timer_index, " Date:", values[timer_index][2]);
        if (new Date(values[timer_index][2]).getTime() < new Date().getTime()){
            timer_index++;
            continue;
        }
        else{
            console.log("Found future date at index:", timer_index);
            break;
        }
    }
    if (timer_index < values.length){
        updateCountdown();
        return true;
    } else {
        console.log("No future dates found. Resetting timer_index or handling edge case.");
        // Handle case where no valid future dates are found
        updateCountdown(true);
        return false;
    }
}