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
    tonConnectUI.onStatusChange(wallet => {
        console.log('tonConnectUI onStatusChange called');
        console.log(`tonConnectUI wallet: ${JSON.stringify(wallet, null, 2)}`);
        console.log(`tonConnectUI wallet.balance: ${wallet.balance}`);

        // Проверка, подключен ли кошелек и есть ли информация о балансе
        if (wallet && wallet.balance) {
            console.log('tonConnectUI onStatusChange wallet exist and wallet.balance');
            // Обновление баланса на веб-странице
            document.getElementById('wallet-balance').innerText = `Баланс: ${wallet.balance}`;
        } else {
            console.log('tonConnectUI onStatusChange else closure called');
            // Если кошелек отключен или информация о балансе недоступна, отобразить сообщение
            document.getElementById('wallet-balance').innerText = 'Баланс: Н/Д ???';
        }
    });
});