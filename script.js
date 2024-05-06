const tonweb = new TonWeb();
const provider = new tonweb.Provider.HttpProvider('https://toncenter.com/api/v2/jsonRPC'); // URL API зависит от провайдера

async function getWalletBalance(walletAddress) {
    const wallet = tonweb.wallet.create({address: walletAddress});
    const balance = await wallet.getBalance();
    return TonWeb.utils.fromNano(balance); // Конвертируем нанотоны в тоны
}

// Функция для отображения баланса
async function displayBalance() {
    const walletAddress = 'адрес_вашего_кошелька';
    const balance = await getWalletBalance(walletAddress);
    document.getElementById('wallet-balance').innerText = `Баланс: ${balance} TON`;
}

displayBalance();
