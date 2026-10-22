let list;

const savedData = localStorage.getItem('myExpenses');
if (savedData != null) {
    list = JSON.parse(savedData);
}
else {
    list = [];
}


function add() {
    const title = document.getElementById('title').value;
    const amount = document.getElementById('Amount').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    addExpense(title, amount, category, date);
    clear();
}

function clear() {
    document.getElementById('title').value = " ";
    document.getElementById('Amount').value = " ";
    document.getElementById('category').value = " ";
    document.getElementById('date').value = " ";
}

function addExpense(title, amount, category, date) {
    list.push({ title: title, amount: amount, category: category, date: date });
    localStorage.setItem('myExpenses', JSON.stringify(list));

}

function update() {
    let length = list.length;
    let total = 0;
    let avg = 0;
    document.getElementById('saved').innerHTML = list.length;
    for (let i = 0; i < length; i++) {
        total += Number(list[i].amount);
    }
    if (length == 0) {
        avg = 0;
    }
    else {
        avg = total / length;
    }
    document.getElementById('total').innerHTML = total;
    document.getElementById('avg').innerHTML = avg.toFixed(2);
    
    let recent=document.getElementById('recent');
    if(list.length==0){
        recent.innerHTML = 0;
    }

    else{
        recent.innerHTML = list[length - 1].amount;
    }
}

function updateTable() {
    let tableBody = document.querySelector('#table tbody');
    
   
    for (let i = 0; i < list.length; i++) {
        let row = tableBody.insertRow(-1); 
        
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);

        cell1.textContent = list[i].date;
        cell2.textContent = list[i].title;
        cell3.textContent = list[i].amount;
        cell4.textContent = list[i].category;

        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.onclick = function() {
            list.splice(i, 1);
            localStorage.setItem('myExpenses', JSON.stringify(list));
            row.remove();
            update();
        }
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => row.remove());

        cell5.appendChild(deleteBtn);
    }
}


function updateHome() {
    length = list.length;
    let total = 0;
    let max = 0;
    for (let i = 0; i < length; i++) {
        total += Number(list[i].amount);
        if (list[i].amount > max) {
            max = list[i].amount;
        }
    }
    document.getElementById('rec').innerHTML = max;
    document.getElementById('sav').innerHTML = length;
    document.getElementById('tot').innerHTML = total;



}

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    const time = document.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
    return time;
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }
    return i;
}

function read() {
    const toCurrency = document.getElementById('listed').value;
    const amount = document.getElementById('LekAmount').value;
    convert(toCurrency, amount);
}

function convert(toCurrency, amount) {
    const Key = "6232ce543fefd8dfa0752e28";
    from = "ALL";
    const url = `https://v6.exchangerate-api.com/v6/${Key}/latest/${from}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("API Status:", data.result);
            console.log("Base Currency:", data.base_code);
            console.log("All Conversion Rates:", data.conversion_rates);


            const Rate = data.conversion_rates[toCurrency];

            console.log(`1 ${from} is equal to ${Rate} ${toCurrency}`);

            const sum = amount * Rate;
            const result = sum.toFixed(2);
            console.log(`${amount} ${from} is equal to ${result} ${toCurrency}`);

            const con = document.getElementById('converted').innerHTML = result + " " + toCurrency;
        })
        .catch(error => {
            console.error("Error fetching exchange rates:", error);
        });


}


function deleteall(){
    list.length=0;
    console.log(list.length);
     localStorage.setItem('myExpenses', JSON.stringify(list));

location.reload();


}






