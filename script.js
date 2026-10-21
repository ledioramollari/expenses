let list;

const savedData = localStorage.getItem('myExpenses');
if (savedData != null) {
    list = JSON.parse(savedData);
}
else {
    list = [];
}


function add() {
    const title = document.getElementById('title').value
    const amount = document.getElementById('Amount').value
    const category = document.getElementById('category').value
    const date = document.getElementById('date').value
    addExpense(title, amount, category, date);
}

function addExpense(title, amount, category, date) {
    list.push({ title: [title], amount: [amount], category: [category], date: [date] });

    localStorage.setItem('myExpenses', JSON.stringify(list))

}

function update() {
    let length = list.length;
    let total = 0;
    let avg = 0;
    document.getElementById('saved').innerHTML = list.length;
    for (let i = 0; i < length; i++) {
        total += Number(list[i].amount);
    }
    avg = total / length;
    document.getElementById('total').innerHTML = total;
    document.getElementById('avg').innerHTML = avg;
    document.getElementById('recent').innerHTML = list[length - 1].amount;


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







