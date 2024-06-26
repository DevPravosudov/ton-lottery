// Инициализация TonWeb с использованием API ключа
const tonweb = new window.TonWeb(new window.TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', {
    apiKey: '759989c9519c207eec918dc0c5d289a521eb1395ab4474c518819edf621d5b5e'
}));

// Функция для преобразования баланса из наноединиц в читаемый вид
function formatBalance(nanoBalance) {
    return window.TonWeb.utils.fromNano(nanoBalance) + ' TON';  // Добавляем единицу измерения для ясности
}

// Функция для получения баланса
async function getBalance(walletAddress) {
    try {
        const balance = await tonweb.getBalance(walletAddress); // Получаем баланс кошелька
        const formattedBalance = formatBalance(balance);
        console.log("Баланс кошелька: ", formattedBalance); // Выводим баланс в читаемом формате
        return formattedBalance;
    } catch (error) {
        console.error("Ошибка при получении баланса: ", error);
    }
}

// Добавление обработчика события 'DOMContentLoaded' для выполнения кода после полной загрузки DOM.
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM полностью загружен и разобран');
    // Инициализация экземпляра TonConnectUI для подключения и взаимодействия с TON blockchain.
    const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://devpravosudov.github.io/ton-lottery/tonconnect-manifest.json',
        buttonRootId: 'ton-connect'
    });

    console.log('tonConnectUI создан');

    // Подписка на изменения статуса подключения
    tonConnectUI.onStatusChange(async wallet => {
        console.log('tonConnectUI onStatusChange called');
        console.log(`tonConnectUI wallet: ${JSON.stringify(wallet, null, 2)}`);
        console.log(`tonConnectUI wallet.account.address: ${wallet.account.address}`);

        const balance = await getBalance(wallet.account.address);
        console.log(`balance from TON: ${balance}`);

        // Проверка, подключен ли кошелек и есть ли информация о балансе
        if (wallet && balance) {
            console.log('tonConnectUI onStatusChange wallet exist and wallet.balance');
            // Обновление баланса на веб-странице
            document.getElementById('wallet-balance').innerText = `Баланс: ${balance}`;
        } else {
            console.log('tonConnectUI onStatusChange else closure called');
            // Если кошелек отключен или информация о балансе недоступна, отобразить сообщение
            document.getElementById('wallet-balance').innerText = 'Баланс: Н/Д ???';
        }
    });
});