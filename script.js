// Инициализация экземпляра TonConnectUI для подключения и взаимодействия с TON blockchain.
const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://devpravosudov.github.io/ton-lottery/tonconnect-manifest.json',
    buttonRootId: 'ton-connect'
});

// Подписка на изменения статуса подключения
tonConnectUI.onStatusChange(wallet => {
    // Проверка, подключен ли кошелек и есть ли информация о балансе
    if (wallet && wallet.balance) {
        // Обновление баланса на веб-странице
        document.getElementById('wallet-balance').innerText = `Баланс: ${wallet.balance}`;
    } else {
        // Если кошелек отключен или информация о балансе недоступна, отобразить сообщение
        document.getElementById('wallet-balance').innerText = 'Баланс: Н/Д';
    }
});

