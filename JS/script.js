console.log('Here We Go!');

$(function () {

// element references
const $form = $('form');
const $input = $('input[type="text"]');

// event listeners
$form.on('submit', getCoin);

function getCoin(evt) {
    evt.preventDefault();

    const userInput = $input.val()
    console.log({userInput})
    if(!userInput) return; // get outta here!
    
    $input.val('');

    const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${userInput}&order=market_cap_desc&per_page=1&page=1&sparkline=falseprice_change_percentage=24hr`

    $.ajax(URL).then(function(data) {
        render(data[0]);
    }, function(error) {
        console.log('Oops! Try again')
        console.log(error);
    })
}

function render(coinData) {
    console.log('coindata===', coinData)
    $('main').html(`
    <h2>Current Price: ${numberWithCommas(coinData.current_price)}</h2>
    <p>Market Rank: ${coinData.market_cap_rank}</p>
    <p>Market Cap: ${numberWithCommas(coinData.market_cap)}</p>
    <p>Circulating Supply: ${numberWithCommas2(coinData.circulating_supply)}</p>
    <h2>Name/ID: ${coinData.id}</h2>
    <p>Ticker Symbol: ${coinData.symbol}</p>
    <img src=${coinData.image} alt="pic" />
    `);
}
});

function numberWithCommas(x) {
    const formatted = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${formatted}`;
}

function numberWithCommas2(y) {
    const formatted = y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formatted}`;
}