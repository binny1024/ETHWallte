var Web3 = require("Web3");

async function testContract() {
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    // 合约ABI
    let abi = [
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "x",
                    "type": "uint256"
                }
            ],
            "name": "set",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "get",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
    //合约地址
    let address = "0x35030F7C367bd4c7e671A7Fd2b45b96E478F5cA9";

    //获取合约实力
    let simpleStorage = new web3.eth.Contract(abi, address);
    //获取一个账户地址
    let from = web3.eth.accounts[0];
    //调用 send 函数 ,将发送一笔交易到智能合约,同时执行set函数,send 调用可以改变合约中的状态变量
    await simpleStorage.methods.set(14).send({from: "0xb70041b092b9e684d4Ee2caDBe5c3ffE6cA83c98"});


    // 调用 call 函数,执行智能合约中的一个只读函数,,此时调用call,不会发交易,不会改变合约中的变量的状态
    let value = await simpleStorage.methods.get().call();

    // console.log("value = " + JSON.stringify(newVar));
    console.log("value = " + value);

    let abi_method = await simpleStorage.methods.set(14).encodeABI();

    console.log("abi_method = "+ abi_method);
}

testContract();


async function testIONC() {

    try {
        web3 = new Web3(new Web3.providers.HttpProvider("https://api.ionchain.org/"));
        let res = await web3.eth.getBalance("0x5541a764f6325f209c8ad7a83fdde557480834e1");
        console.log(web3.utils.fromWei(res, 'ether'));
    } catch (e) {
        console.log(e.toString())
    }

}

// testIONC();

async function testLocal() {

    try {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
        // let res = await web3.eth.getTransaction("0xb365ef7bc2811cc0de62b024b8db6a9bd1b2ba3d41982e2be26f4be6182607f8");
        let res = await web3.eth.getTransaction("0xfe1667fea705792e7acdd9e2f497eaa9456f0343a10be70ac027e0b9d78ca12a");
        console.log(res);
    } catch (e) {
        console.log(e.toString())
    }

}


// testLocal();

