// Инициализация TonConnect
const connector = new TonConnect.TonConnect({
    manifestUrl: 'https://nikitakalashnikov2006.github.io/crypto/tonconnect-manifest.json'
});

// Элементы UI
const connectButton = document.getElementById('connectButton');
const disconnectButton = document.getElementById('disconnectButton');
const walletInfo = document.getElementById('walletInfo');
const walletAddress = document.getElementById('walletAddress');
const walletNetwork = document.getElementById('walletNetwork');

// Проверка существующего подключения
async function checkConnection() {
    const walletConnectionSource = {
        jsBridgeKey: 'tonconnect'
    };

    if (connector.connected) {
        updateUI(connector.account);
    }
}

// Обновление интерфейса
function updateUI(account) {
    if (account) {
        connectButton.style.display = 'none';
        disconnectButton.style.display = 'block';
        walletInfo.style.display = 'block';
        
        walletAddress.textContent = account.address;
        walletNetwork.textContent = account.chain;
    } else {
        connectButton.style.display = 'block';
        disconnectButton.style.display = 'none';
        walletInfo.style.display = 'none';
    }
}

// Подключение кошелька
connectButton.addEventListener('click', async () => {
    try {
        const wallets = await connector.getWallets();
        const wallet = wallets[0]; // Можно добавить выбор кошелька
        
        await connector.connect({ jsBridgeKey: wallet.jsBridgeKey });
        
        connector.onStatusChange((wallet) => {
            updateUI(wallet);
        });
    } catch (error) {
        console.error('Connection error:', error);
        alert('Failed to connect wallet');
    }
});

// Отключение кошелька
disconnectButton.addEventListener('click', async () => {
    try {
        await connector.disconnect();
        updateUI(null);
    } catch (error) {
        console.error('Disconnection error:', error);
    }
});

// Проверка подключения при загрузке
document.addEventListener('DOMContentLoaded', checkConnection);
