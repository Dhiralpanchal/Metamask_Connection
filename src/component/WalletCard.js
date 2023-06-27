import React , {useState} from 'react';
import './walletcard.css';
const ethers = require ('ethers');
const WalletCard = () =>{

    const [errorMessage,setErrorMessage] = useState(null);
    const [defaultAccount,setDefaultAccount] = useState(null);
    const [userBalance,setUserBalance] = useState(null);
    const [connectButton,setConnectButton] = useState('Connect Wallet');

    const connectWalletHandler = () => {

        if(window.ethereum) {
            window.ethereum.request({method : 'eth_requestAccounts'})
            .then(account => {
                accountHandler(account[0]);
            })
        }
        else{
            setErrorMessage("Install MetaMask");
        }
    }
    const accountHandler = (newAccount) =>{
        setDefaultAccount(newAccount);
        getUserBalance(newAccount.toString());
    }

    const getUserBalance = (address) =>{
        window.ethereum.request({method:'eth_getBalance',params: [address,'latest']})
        .then(balance => {
            setUserBalance(ethers.utils.formatEther(balance));
        })
    }

    const chainChangedHandler = () =>{
        window.location.reload();
    }

    window.ethereum.on('accountsChanged',accountHandler);

    window.ethereum.on('chainChanged',chainChangedHandler);

    return(
        <div className='wallet_card'>

            <h4>{"connect to metamask using window.ethereum methods"}</h4>
            <button onClick={connectWalletHandler}>{connectButton}</button>
            <div className='accountDisplay'>
                <h3>Address: {defaultAccount}</h3>
            </div>
            <div className='balanceDisplay'>
                <h3>Balance: {userBalance}</h3>
            </div>
            {errorMessage}

        </div>
    );
}
export default WalletCard;