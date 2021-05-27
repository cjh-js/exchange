const firstSelect = document.querySelector('#first-cur');
const secondSelect = document.querySelector('#second-cur');
const firstInput = document.querySelector('.first-amount');
const secondInput = document.querySelector('.second-amount');
const swapBtn = document.querySelector('.swap-btn');
const swapText = document.querySelector('.changeCur');
const select = document.querySelectorAll('.cur-sel');

function getAPI(){
    fetch(`https://open.exchangerate-api.com/v6/latest/${firstSelect.value}`
    ).then(function(res){
        return res.json();
    }).then(function(json){
        const baseCur = firstInput.value;
        const curRate = json.rates[secondSelect.value];
        secondInput.value = baseCur * curRate;
        swapText.innerText = `${baseCur}${firstSelect.value} = ${secondInput.value}${secondSelect.value}`;
    });
}

// EventListener
select.forEach((currency) => {
    currency.addEventListener('change', getAPI);
});
firstInput.addEventListener('input', getAPI);
swapBtn.addEventListener('click', () => {
    const change = firstSelect.value;
    firstSelect.value = secondSelect.value;
    secondSelect.value = change;
    getAPI();
});

// Call API Function
getAPI();