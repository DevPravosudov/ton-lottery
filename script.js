// Инициализация TonWeb с использованием глобального объекта TonWeb
const tonweb = new TonWeb(new TonWeb.HttpProvider('https://test.toncenter.com/api/v2/jsonRPC'));

// Функция для получения баланса
async function getBalance(walletAddress) {
    try {
        const balance = await tonweb.getBalance(walletAddress); // Получаем баланс кошелька
        console.log("Баланс кошелька: ", TonWeb.utils.fromNano(balance)); // Выводим баланс в читаемом формате
        return balance;
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