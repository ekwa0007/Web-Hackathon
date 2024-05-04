document.getElementById("infoSubmit").onclick = () =>{
        insertData();
}


function insertData(){
    let table = document.getElementById("outputTable");
    let values = [document.getElementById("unamein").value, document.getElementById("anamein").value, document.getElementById("adatein").value, document.getElementById("aweightin").value]
    let row = document.createElement("tr");
    for (let item of values){
        var data = document.createElement("td");
        var itemin = document.createTextNode(item);
        data.appendChild(itemin);
        row.appendChild(data);
    }
    table.appendChild(row);
};
