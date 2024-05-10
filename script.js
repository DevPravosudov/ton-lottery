// const { TonClient } = require("ton-client-js");

// // Создание экземпляра клиента TON
// const client = new TonClient({
//     network: {
//         endpoints: ['https://net.ton.dev'] // URL к одному из доступных API блокчейна TON
//     }
// });

// // Функция для получения баланса
// async function getWalletBalance(address) {
//     try {
//         const { result } = await client.net.query_collection({
//             collection: 'accounts',
//             filter: { id: { eq: address } },
//             result: 'balance'
//         });

//         if (result.length > 0) {
//             const balance = result[0].balance;
//             return balance;
//         }
//         return null;
//     } catch (error) {
//         console.error("Ошибка:", error);
//         return null;
//     }
// }

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
        console.log(`tonConnectUI wallet.account.pyblicKey: ${wallet.account.publicKey}`);

        // const balance = await getWalletBalance(wallet.account.address);
        // console.log(`balance from TON: ${balance}`);

        // Проверка, подключен ли кошелек и есть ли информация о балансе
        if (wallet && wallet.account.publicKey) {
            console.log('tonConnectUI onStatusChange wallet exist and wallet.balance');
            // Обновление баланса на веб-странице
            document.getElementById('wallet-balance').innerText = `Баланс: ${wallet.account.publicKey}`;
        } else {
            console.log('tonConnectUI onStatusChange else closure called');
            // Если кошелек отключен или информация о балансе недоступна, отобразить сообщение
            document.getElementById('wallet-balance').innerText = 'Баланс: Н/Д ???';
        }
    });
});