# Clients

Python and TypeScript clients are available, allowing programmatic usage of dYdX.

## Python Client

This guide will help you get started with the dYdX Python SDK, which allows for asynchronous programming and interaction with the dYdX protocol.

### Installation

Install `dydx-v3-python` from [PyPI](https://pypi.org/project/dydx-v3-python) using `pip`:

<pre class="center-column">
pip install dydx-v4-client   
</pre>

> Initialize

```python
from dydx_v4_client.network import make_testnet
from dydx_v4_client.node.client import NodeClient

CUSTOM_TESTNET = make_testnet(
    node_url="your-custom-testnet-node-url",
    rest_indexer="your-custom-testnet-rest-url",
    websocket_indexer="your-custom-testnet-websocket-url"
)

node = await NodeClient.connect(TESTNET.node)
```

### Usage

See [dydxprotocol/v4-clients](https://github.com/dydxprotocol/v4-clients/tree/main/v4-client-py-v2).

See the [examples]((https://github.com/dydxprotocol/v4-clients/tree/main/v4-client-py-v2/examples) folder for simple python examples.

## TypeScript Client

### Installation

Install `pnpm install @dydxprotocol/v4-client-js` from [NPM](https://www.npmjs.com/package/@dydxprotocol/v4-client-js):

<pre class="center-column">
pnpm install @dydxprotocol/v4-client-js
</pre>

### Usage

See [dydxprotocol/v4-client-js](https://github.com/dydxprotocol/v4-clients/tree/main/v4-client-js).

See the [examples](https://github.com/dydxprotocol/v4-clients/tree/main/v4-client-js/examples) folder for simple typescript examples.

> Initialize

```typescript
import { ValidatorClient, Network } from '@dydxprotocol/v4-client-js';

/**
      // For the deployment by DYDX token holders, use below:

      import { IndexerConfig, ValidatorConfig } from "@dydxprotocol/v4-client-js";

      const NETWORK: Network = new Network(
        'mainnet',
        new IndexerConfig(
          'https://indexer.dydx.trade',
          'wss://indexer.dydx.trade',
        ),
        new ValidatorConfig(
          'https://dydx-ops-rpc.kingnodes.com', // or other node URL
          'dydx-mainnet-1',
          {
            CHAINTOKEN_DENOM: 'adydx',
            CHAINTOKEN_DECIMALS: 18,
            USDC_DENOM: 'ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5',
            USDC_GAS_DENOM: 'uusdc',
            USDC_DECIMALS: 6,
          },
        ),
      );
    */
const NETWORK = Network.testnet();

const client = await ValidatorClient.connect(NETWORK.validatorConfig);
```

The Typescript client is organized into various clients

<aside class="notice">
The Python client uses a node client as opposed to these various clients.
</aside>

| Module      | Description                                                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------------------------- |
| `Composite` | CompositeClient simplifies the transactions by transforming human readable parameters to chain-specific parameters. |
| `Validator` | Validator client                                                                                                    |
| `Indexer`   | Indexer client for read-only calls                                                                                  |
| `Socket`    | Websocket for streaming data read-only                                                                              |
| `Node`      | Python Node client                                                                                                  |

The following configuration options are available:

| Parameter                | Description                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| host                     | The HTTP API host.                                                                                                                                                                                                                                                                                                                                                                  |
| api_timeout              | Timeout for HTTP requests, in milliseconds.                                                                                                                                                                                                                                                                                                                                         |
| default_ethereum_address | (Optional) The default account for Ethereum key auth and sending Ethereum transactions.                                                                                                                                                                                                                                                                                             |
| eth_private_key          | (Optional) May be used for Ethereum key auth.                                                                                                                                                                                                                                                                                                                                       |
| eth_send_options         | (Optional) Options for Ethereum transactions, see [`sendTransaction`](https://web3py.readthedocs.io/en/stable/web3.eth.html?highlight=signTransaction#web3.eth.Eth.sendTransaction).                                                                                                                                                                                                |
| network_id               | (Optional) Chain ID for Ethereum key auth and smart contract addresses. Defaults to `web3.net.version` if available, or `1` (mainnet).                                                                                                                                                                                                                                              |
| stark_private_key        | (Optional) STARK private key, used to sign orders and withdrawals.                                                                                                                                                                                                                                                                                                                  |
| web3                     | (Optional) Web3 object used for Ethereum key auth and/or smart contract interactions.                                                                                                                                                                                                                                                                                               |
| web3_account             | (Optional) May be used for Ethereum key auth.                                                                                                                                                                                                                                                                                                                                       |
| web3_provider            | (Optional) Web3 provider object, same usage as `web3`.                                                                                                                                                                                                                                                                                                                              |
| api_key_credentials      | (Optional) Dictionary containing the key, secret and passphrase required for the private module to sign requests.                                                                                                                                                                                                                                                                   |
| crypto_c_exports_path    | (Optional) For python only, will use faster C++ code to run hashing, signing and verifying. It's expected to be compiled from the `crypto_c_exports` target from Starkware's [repository](https://github.com/starkware-libs/crypto-cpp/blob/master/src/starkware/crypto/ffi/CMakeLists.txt). See [section on this below for more information](#c-methods-for-faster-stark-signing). |

## Validator Client

### Onboarding

You will need to generate a dYdX address by connecting a wallet:

- Eth wallet
- Cosmos Wallet
- Sol Wallet

1. Connect your preferred wallet to the dYdX Chain deployment of your choice (e.g. the dYdX Operations Services Ltd. deployment [dydx.trade](https://dydx.trade)).
2. Deposit USDC to your dYdX Chain address. The default onboarding path uses Circle's Cross Chain Transfer Protocol (CCTP) on Noble Chain. You can deposit USDC from many origination chains. Read more [here](https://dydx.exchange/blog/cctp).

### Configuring a Network

#### Overview

Examples on how to setup client

**Deposit Example: `examples/transfer_example_deposit`**

> Configure Network

````typescript
import { ValidatorClient, Network } from '@dydxprotocol/v4-client-js';

/**
      // For the deployment by DYDX token holders, use below:

      import { IndexerConfig, ValidatorConfig } from "@dydxprotocol/v4-client-js";

      const NETWORK: Network = new Network(
        'mainnet',
        new IndexerConfig(
          'https://indexer.dydx.trade',
          'wss://indexer.dydx.trade',
        ),
        new ValidatorConfig(
          'https://dydx-ops-rpc.kingnodes.com', // or other node URL
          'dydx-mainnet-1',
          {
            CHAINTOKEN_DENOM: 'adydx',
            CHAINTOKEN_DECIMALS: 18,
            USDC_DENOM: 'ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5',
            USDC_GAS_DENOM: 'uusdc',
            USDC_DECIMALS: 6,
          },
        ),
      );
    */
const NETWORK = Network.testnet();```

```python
  from dydx_v4_client.network import make_testnet
  from dydx_v4_client.node.client import NodeClient

  CUSTOM_TESTNET = make_testnet(
      node_url="your-custom-testnet-node-url",
      rest_indexer="your-custom-testnet-rest-url",
      websocket_indexer="your-custom-testnet-websocket-url"
)
````

See reference implementations: [[Python]]()

#### Request

| Parameter | Type    | Required? | Description               |
| --------- | ------- | --------- | ------------------------- |
| `network` | Network | yes       | The network to connect to |

#### Response

| Parameter | Description           |
| --------- | --------------------- |
| Client    | Promise of the client |

### Initialize Client

#### Overview

Examples on how to setup client

**Deposit Example: `examples/transfer_example_deposit`**

> Initialize

```typescript
client = ValidatorClient.connect(NETWORK.validator_config);
```

```python
    node = await NodeClient.connect(TESTNET.node)

```

See reference implementations: [[Python]](https://github.com/dydxprotocol/dydx-v3-python/blob/master/dydx3/modules/onboarding.py) [[TypeScript]](https://github.com/dydxprotocol/v3-client/blob/master/src/modules/onboarding.ts)

#### Request

| Parameter | Type    | Required? | Description               |
| --------- | ------- | --------- | ------------------------- |
| `network` | Network | yes       | The network to connect to |

#### Response

| Parameter | Description           |
| --------- | --------------------- |
| Client    | Promise of the client |

### Setup Mnemonic

#### Overview

Examples on how to initialize mnemonic

**Deposit Example: `examples/transfer_example_deposit`**

> Mnemonic

````typescript
    import {
      BECH32_PREFIX,
      LocalWallet,
    } from '@dydxprotocol/v4-client-js';

    const mnemonic = 'YOUR MNEMONIC HERE';
    const wallet = await LocalWallet.fromMnemonic(mnemonic, BECH32_PREFIX);```

```python
    wallet = await Wallet.from_mnemonic(node, DYDX_TEST_MNEMONIC, TEST_ADDRESS)

````

See reference implementations: [[Python]]()

#### Request

<aside class="warning">
Programmatic users of the API must take care to store Mnemonics. dYdX does not store any private keys. you must be careful not to lose it, or your funds may be inaccessible for a period of time.
</aside>

Description: Setup Mnemonic

| Parameter  | Type   | Required? | Description    |
| ---------- | ------ | --------- | -------------- |
| `mnemonic` | String | yes       | The mnemo      |
| `prefix`   | String | No        | Default Bech32 |

#### Response

| Parameter   | Description  |
| ----------- | ------------ |
| LocalWallet | Local Wallet |

### Transfer

#### Overview

Examples on how to transfer funds into a subaccount.

**Deposit Example: `examples/transfer_example_deposit`**

> Deposit

````typescript
    import { SubaccountClient } from '@dydxprotocol/v4-client-js';

    const subaccount = new SubaccountClient(wallet, 0);
    const recipientAddress = 'dydx...' // address of the recipient
    const recipientSubaccountNumber = 0 // subaccount number of the recipient
    const assetId = 0 // asset id of the token you want to transfer
    const amount = Long.fromNumber(/* amount of the token you want to transfer */);

    const tx = await client.post.transfer(
      subaccount,
      recipientAddress,
      recipientSubaccountNumber,
      assetId,
      amount
    );```

```python
````

See reference implementations: [[Python]]()

#### Request

<aside class="warning">
Programmatic users of the API must take care to store Mnemonics. dYdX does not store any private keys. you must be careful not to lose it, or your funds may be inaccessible for a period of time.
</aside>

Description: Deposit funds into your dYdX subaccount

| Parameter       | Type           | Required? | Description                          |
| --------------- | -------------- | --------- | ------------------------------------ |
| `subaccount`    | SubaccountInfo | yes       | The subaccount to deposit to         |
| `assetId`       | number         | yes       | The asset ID of the asset to deposit |
| `quantums`      | Long           | yes       | quantums to calculate size           |
| `broadcastMode` | BroadcastMode  | no        | The broadcast mode                   |

#### Response

| Parameter | Description |
| --------- | ----------- |
| Tx        | Tx hash     |

### Deposit

#### Overview

Examples on how to deposit funds into a subaccount.

**Deposit Example: `examples/transfer_example_deposit`**

> Deposit

```typescript
const tx = await client.post.deposit(subaccount, 0, new Long(10_000_000));
```

```python
    response = await node.deposit(
        wallet, TEST_ADDRESS, subaccount(TEST_ADDRESS, 0), 0, 10_000_000
    )
```

See reference implementations: [[Python]]()

#### Request

<aside class="warning">
Programmatic users of the API must take care to store Mnemonics. dYdX does not store any private keys. you must be careful not to lose it, or your funds may be inaccessible for a period of time.
</aside>

Description: Deposit funds into your dYdX subaccount

| Parameter       | Type           | Required? | Description                          |
| --------------- | -------------- | --------- | ------------------------------------ |
| `subaccount`    | SubaccountInfo | yes       | The subaccount to deposit to         |
| `assetId`       | number         | yes       | The asset ID of the asset to deposit |
| `quantums`      | Long           | yes       | quantums to calculate size           |
| `broadcastMode` | BroadcastMode  | no        | The broadcast mode                   |

#### Response

| Parameter | Description |
| --------- | ----------- |
| Tx        | Tx hash     |

### Withdraw

#### Overview

Examples on how to transfer funds into a subaccount.

**Deposit Example: `examples/transfer_example_deposit`**

> Deposit

```typescript
import { SubaccountClient } from '@dydxprotocol/v4-client-js';

const subaccount = new SubaccountClient(wallet, 0);
const assetId = 0; // asset id of the token you want to withdraw
const amount = Long.fromNumber(/* amount of the token you want to withdraw */);

const tx = await client.post.withdraw(subaccount, assetId, amount);
```

```python

```

See reference implementations: [[Python]]()

#### Request

<aside class="warning">
Programmatic users of the API must take care to store Mnemonics. dYdX does not store any private keys. you must be careful not to lose it, or your funds may be inaccessible for a period of time.
</aside>

Description: Deposit funds into your dYdX subaccount

| Parameter       | Type           | Required? | Description                          |
| --------------- | -------------- | --------- | ------------------------------------ |
| `subaccount`    | SubaccountInfo | yes       | The subaccount to deposit to         |
| `assetId`       | number         | yes       | The asset ID of the asset to deposit |
| `quantums`      | Long           | yes       | quantums to calculate size           |
| `broadcastMode` | BroadcastMode  | no        | The broadcast mode                   |

#### Response

| Parameter | Description |
| --------- | ----------- |
| Tx        | Tx hash     |

### Simulate a Transaction

#### Overview

Examples on how to simulate a transaction.

**Deposit Example: `examples/transfer_example_deposit`**

> Deposit

```typescript
const messages = () =>
  Promise.resolve([
    /* ... your transaction messages here */
  ]);
const fee = await client.simulate(wallet, messages);
```

```python

```

See reference implementations: [[Python]]()

#### Request

<aside class="warning">
Programmatic users of the API must take care to store Mnemonics. dYdX does not store any private keys. you must be careful not to lose it, or your funds may be inaccessible for a period of time.
</aside>

Description: Deposit funds into your dYdX subaccount

| Parameter       | Type           | Required? | Description                          |
| --------------- | -------------- | --------- | ------------------------------------ |
| `subaccount`    | SubaccountInfo | yes       | The subaccount to deposit to         |
| `assetId`       | number         | yes       | The asset ID of the asset to deposit |
| `quantums`      | Long           | yes       | quantums to calculate size           |
| `broadcastMode` | BroadcastMode  | no        | The broadcast mode                   |

#### Response

| Parameter | Description |
| --------- | ----------- |
| Tx        | Tx hash     |

### Sign a Transaction

Examples on how to deposit funds into a subaccount.

**Deposit Example: `examples/transfer_example_deposit`**

> Deposit

```typescript
const messages = () =>
  Promise.resolve([
    /* ... your transaction messages here */
  ]);
const zeroFee = true;
const signedTransaction = await client.sign(wallet, messages, zeroFee);
```

```python

```

See reference implementations: [[Python]]()

#### Request

<aside class="warning">
Programmatic users of the API must take care to store Mnemonics. dYdX does not store any private keys. you must be careful not to lose it, or your funds may be inaccessible for a period of time.
</aside>

Description: Deposit funds into your dYdX subaccount

| Parameter       | Type           | Required? | Description                          |
| --------------- | -------------- | --------- | ------------------------------------ |
| `subaccount`    | SubaccountInfo | yes       | The subaccount to deposit to         |
| `assetId`       | number         | yes       | The asset ID of the asset to deposit |
| `quantums`      | Long           | yes       | quantums to calculate size           |
| `broadcastMode` | BroadcastMode  | no        | The broadcast mode                   |

#### Response

| Parameter | Description |
| --------- | ----------- |
| Tx        | Tx hash     |

### Send a Transaction

Examples on how to deposit funds into a subaccount.

**Deposit Example: `examples/transfer_example_deposit`**

> Deposit

```typescript
const messages = () =>
  Promise.resolve([
    /* ... your transaction messages here */
  ]);
const zeroFee = true;
const signedTransaction = await client.send(wallet, messages, zeroFee);
```

```python

```

See reference implementations: [[Python]]()

#### Request

<aside class="warning">
Programmatic users of the API must take care to store Mnemonics. dYdX does not store any private keys. you must be careful not to lose it, or your funds may be inaccessible for a period of time.
</aside>

Description: Deposit funds into your dYdX subaccount

| Parameter       | Type           | Required? | Description                          |
| --------------- | -------------- | --------- | ------------------------------------ |
| `subaccount`    | SubaccountInfo | yes       | The subaccount to deposit to         |
| `assetId`       | number         | yes       | The asset ID of the asset to deposit |
| `quantums`      | Long           | yes       | quantums to calculate size           |
| `broadcastMode` | BroadcastMode  | no        | The broadcast mode                   |

#### Response

| Parameter | Description |
| --------- | ----------- |
| Tx        | Tx hash     |

### Selecting desired gas token

This ability to select the desired gas token is only available in `v4-client-js`.
Default gas token is `USDC`.

**Deposit Example: `examples/transfer_example_deposit`**

> Deposit

```typescript
import { SelectedGasDenom } from '@dydxprotocol/v4-client-js';

client.setSelectedGasDenom(SelectedGasDenom.NATIVE);
```

```python

```

See reference implementations: [[Python]]()

#### Request

<aside class="warning">
Programmatic users of the API must take care to store Mnemonics. dYdX does not store any private keys. you must be careful not to lose it, or your funds may be inaccessible for a period of time.
</aside>

Description: Deposit funds into your dYdX subaccount

| Parameter       | Type           | Required? | Description                          |
| --------------- | -------------- | --------- | ------------------------------------ |
| `subaccount`    | SubaccountInfo | yes       | The subaccount to deposit to         |
| `assetId`       | number         | yes       | The asset ID of the asset to deposit |
| `quantums`      | Long           | yes       | quantums to calculate size           |
| `broadcastMode` | BroadcastMode  | no        | The broadcast mode                   |

#### Response

| Parameter | Description |
| --------- | ----------- |
| Tx        | Tx hash     |

### Get Account Balances

Examples on how to deposit funds into a subaccount.

**Deposit Example: `examples/transfer_example_deposit`**

> Deposit

```typescript
const balances = await client.get.getAccountBalances(DYDX_ADDRESS);

// Get balance of one denom for an account.
const balance = await client.get.getAccountBalance(DYDX_ADDRESS, TOKEN_DENOM);
```

```python

```

See reference implementations: [[Python]]()

#### Request

<aside class="warning">
Programmatic users of the API must take care to store Mnemonics. dYdX does not store any private keys. you must be careful not to lose it, or your funds may be inaccessible for a period of time.
</aside>

Description: Deposit funds into your dYdX subaccount

| Parameter       | Type           | Required? | Description                          |
| --------------- | -------------- | --------- | ------------------------------------ |
| `subaccount`    | SubaccountInfo | yes       | The subaccount to deposit to         |
| `assetId`       | number         | yes       | The asset ID of the asset to deposit |
| `quantums`      | Long           | yes       | quantums to calculate size           |
| `broadcastMode` | BroadcastMode  | no        | The broadcast mode                   |

#### Response

| Parameter | Description |
| --------- | ----------- |
| Tx        | Tx hash     |

### Placing an Order

Examples on how to place an order

**Place order example: `examples/market_order_example.py`(https://github.com/dydxprotocol/v4-clients/blob/main/v4-client-py-v2/examples/market_order_example.py)**

> Place order

```typescript
import {
  OrderFlags,
  Order_Side,
  Order_TimeInForce,
  SubaccountClient,
} from '@dydxprotocol/v4-client-js';

const subaccount = new SubaccountClient(wallet, 0);
const clientId = 123; // set to a number, can be used by the client to identify the order
const clobPairId = 0; // perpertual market id
const side = Order_Side.SIDE_BUY; // side of the order
const quantums = Long.fromNumber(1_000_000_000); // quantums are calculated by the size if the order
const subticks = Long.fromNumber(1_000_000_000); // subticks are calculated by the price of the order
const timeInForce = Order_TimeInForce.TIME_IN_FORCE_UNSPECIFIED; // TimeInForce indicates how long an order will remain active before it is executed or expires
const orderFlags = OrderFlags.SHORT_TERM; // either SHORT_TERM, LONG_TERM or CONDITIONAL
const reduceOnly = false; // if true, the order will only reduce the position size

const tx = await client.post.placeOrder(
  subaccount,
  clientId,
  clobPairId,
  side,
  quantums,
  subticks,
  timeInForce,
  orderFlags,
  reduceOnly
);
```

```python
import asyncio
import random

from dydx_v4_client import MAX_CLIENT_ID, OrderFlags
from v4_proto.dydxprotocol.clob.order_pb2 import Order

from dydx_v4_client.indexer.rest.constants import OrderType
from dydx_v4_client.indexer.rest.indexer_client import IndexerClient
from dydx_v4_client.network import TESTNET
from dydx_v4_client.node.client import NodeClient
from dydx_v4_client.node.market import Market
from dydx_v4_client.wallet import Wallet

MARKET_ID = "ETH-USD"
DYDX_TEST_MNEMONIC = "this is a test mnemonic"
TEST_ADDRESS = "this is test address"

async def place_market_order(size: float):
    node = await NodeClient.connect(TESTNET.node)
    indexer = IndexerClient(TESTNET.rest_indexer)

    market = Market(
        (await indexer.markets.get_perpetual_markets(MARKET_ID))["markets"][MARKET_ID]
    )
    wallet = await Wallet.from_mnemonic(node, DYDX_TEST_MNEMONIC, TEST_ADDRESS)

    order_id = market.order_id(
        TEST_ADDRESS, 0, random.randint(0, MAX_CLIENT_ID), OrderFlags.SHORT_TERM
    )

    current_block = await node.latest_block_height()

    new_order = market.order(
        order_id=order_id,
        order_type=OrderType.MARKET,
        side=Order.Side.SIDE_SELL,
        size=size,
        price=0,  # Recommend set to oracle price - 5% or lower for SELL, oracle price + 5% for BUY
        time_in_force=Order.TimeInForce.TIME_IN_FORCE_UNSPECIFIED,
        reduce_only=False,
        good_til_block=current_block + 10,
    )

    transaction = await node.place_order(
        wallet=wallet,
        order=new_order,
    )

    print(transaction)
    wallet.sequence += 1


asyncio.run(place_market_order(0.00001))
```

```rust
mod support;
use anyhow::{Error, Result};
use bigdecimal::BigDecimal;
use chrono::{TimeDelta, Utc};
use dydx::config::ClientConfig;
use dydx::indexer::{ClientId, IndexerClient, Ticker};
use dydx::node::{NodeClient, OrderBuilder, OrderSide, Wallet};
use dydx_proto::dydxprotocol::clob::order::TimeInForce;
use support::constants::TEST_MNEMONIC;

const ETH_USD_TICKER: &str = "ETH-USD";

pub struct OrderPlacer {
    client: NodeClient,
    indexer: IndexerClient,
    wallet: Wallet,
}

impl OrderPlacer {
    pub async fn connect() -> Result<Self> {
        let config = ClientConfig::from_file("client/tests/testnet.toml").await?;
        let client = NodeClient::connect(config.node).await?;
        let indexer = IndexerClient::new(config.indexer);
        let wallet = Wallet::from_mnemonic(TEST_MNEMONIC)?;
        Ok(Self {
            client,
            indexer,
            wallet,
        })
    }
}

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt().try_init().map_err(Error::msg)?;
    #[cfg(feature = "telemetry")]
    support::telemetry::metrics_dashboard().await?;
    let mut placer = OrderPlacer::connect().await?;
    let mut account = placer.wallet.account(0, &mut placer.client).await?;

    // Test values
    let subaccount = account.subaccount(0)?;
    let client_id = ClientId::random();
    let ticker = Ticker(ETH_USD_TICKER.into());
    let market = placer
        .indexer
        .markets()
        .get_perpetual_market(&ticker)
        .await?;

    let now = Utc::now();
    let time_in_force_seconds = now + TimeDelta::seconds(60);

    let (_id, order) = OrderBuilder::new(market, subaccount)
        .limit(OrderSide::Buy, 123, BigDecimal::new(2.into(), 2))
        .time_in_force(TimeInForce::Unspecified)
        .until(time_in_force_seconds)
        .long_term()
        .build(client_id)?;

    let tx_hash = placer.client.place_order(&mut account, order).await?;
    tracing::info!("Broadcast transaction hash: {:?}", tx_hash);

    Ok(())
}
```

See reference implementations: [[Python]]()

#### Request

<aside class="warning">
Programmatic users of the API must take care to store Mnemonics. dYdX does not store any private keys. you must be careful not to lose it, or your funds may be inaccessible for a period of time.
</aside>

Description: Deposit funds into your dYdX subaccount

| Parameter                         | Type                  | Required? | Description                          |
| --------------------------------- | --------------------- | --------- | ------------------------------------ |
| `subaccount`                      | SubaccountInfo        | yes       | The subaccount to deposit to         |
| `assetId`                         | number                | yes       | The asset ID of the asset to deposit |
| `clobPairId`                      | number                | yes       | The clob pair id of the asset        |
| `side`                            | Order_Side            | yes       |                                      |
| `quantums`                        | Long                  | yes       | quantums to calculate size           |
| `subticks`                        | Long                  | yes       |                                      |
| `timeInForce`                     | Order_TimeInforce     | yes       |                                      |
| `orderFlags`                      | number                | yes       |                                      |
| `reduceOnly`                      | boolean               | yes       |                                      |
| `goodTilBlock`                    | number                | no        |                                      |
| `goodTilBlockTime`                | number                | no        |                                      |
| `clientMetadata`                  | number                | no        |                                      |
| `conditionType`                   | Order_ConditionType   | no        |                                      |
| `conditionalOrderTriggerSubticks` | Long                  | no        |                                      |
| `broadcastMode`                   | BroadcastMode         | no        | The broadcast mode                   |

#### Response

| Parameter | Description |
| --------- | ----------- |
| Tx        | Tx hash     |

#### Setting the good-til-block

When specifying the good-til-block on your order, verify that the following is true to ensure your order placement succeeds (where `ShortBlockWindow` is currently set to [20 blocks](https://github.com/dydxprotocol/v4-chain/blob/dcd2d9c2f6170bd19218d92cf6f2f88216b2ffe1/protocol/x/clob/types/constants.go#L7-L9)):

`currentBlockHeight < order.goodTilBlock <= currentBlockHeight + ShortBlockWindow`.

### Replacing an Order

Traders can replace Short-Term orders atomically by placing an order with the same order ID and a larger value for the [good-til-block field](https://github.com/dydxprotocol/v4-chain/blob/dcd2d9c2f6170bd19218d92cf6f2f88216b2ffe1/proto/dydxprotocol/clob/order.proto#L143-L146)
of the order.

Note that two orders have the same order ID if the following client-specified fields are equal (from [OrderId proto definition](https://github.com/dydxprotocol/v4-chain/blob/dcd2d9c2f6170bd19218d92cf6f2f88216b2ffe1/proto/dydxprotocol/clob/order.proto#L9-L41)):

- [Subaccount ID](https://github.com/dydxprotocol/v4-chain/blob/dcd2d9c2f6170bd19218d92cf6f2f88216b2ffe1/proto/dydxprotocol/subaccounts/subaccount.proto#L10-L17).
  - order.subaccount_id.owner should be set to your address that is signing the order transaction.
  - order.subaccount_id.number should be set to 0 unless you are using a different subaccount.
- Client ID.
- Order flags (note this should always be set to 0 for placing Short-Term orders).
- CLOB pair ID.

Assuming the current block height is 9, the below example places an order with good-til-block 10, then places a replacement order with a good-til-block of 11.

**Deposit Example: `examples/transfer_example_deposit`**

> Replace Order

```typescript
import {
  OrderFlags,
  Order_Side,
  Order_TimeInForce,
  SubaccountClient,
} from '@dydxprotocol/v4-client-js';

const subaccount = new SubaccountClient(wallet, 0);
const clientId = 123; // set to a number, can be used by the client to identify the order
const clobPairId = 0; // perpertual market id
const side = Order_Side.SIDE_BUY; // side of the order
const quantums = Long.fromNumber(1_000_000_000); // quantums are calculated by the size if the order
const subticks = Long.fromNumber(1_000_000_000); // subticks are calculated by the price of the order
const timeInForce = Order_TimeInForce.TIME_IN_FORCE_UNSPECIFIED; // TimeInForce indicates how long an order will remain active before it is executed or expires
const orderFlags = OrderFlags.SHORT_TERM; // either SHORT_TERM, LONG_TERM or CONDITIONAL
const reduceOnly = false; // if true, the order will only reduce the position size

const tx = await client.post.placeOrder(
  subaccount,
  clientId,
  clobPairId,
  side,
  quantums,
  subticks,
  timeInForce,
  orderFlags,
  reduceOnly,
  10
);

const replacementTx = await client.post.placeOrder(
  subaccount,
  clientId,
  clobPairId,
  side,
  quantums,
  subticks,
  timeInForce,
  orderFlags,
  reduceOnly,
  11
);
```

```python

```

See reference implementations: [[Python]]()

#### Request

<aside class="warning">
As of February 23rd, 2024, Typescript client source code for the above function is [here](https://github.com/dydxprotocol/v4-clients/blob/fd1e9d33913ef27a4c761cd66bca93057fe707e2/v4-client-js/src/clients/modules/post.ts#L353-L369),

</aside>

Description: Deposit funds into your dYdX subaccount

| Parameter       | Type           | Required? | Description                          |
| --------------- | -------------- | --------- | ------------------------------------ |
| `subaccount`    | SubaccountInfo | yes       | The subaccount to deposit to         |
| `assetId`       | number         | yes       | The asset ID of the asset to deposit |
| `quantums`      | Long           | yes       | quantums to calculate size           |
| `broadcastMode` | BroadcastMode  | no        | The broadcast mode                   |

#### Response

| Parameter | Description |
| --------- | ----------- |
| Tx        | Tx hash     |

### Cancelling an Order

Examples on how to cancel an order

**Cancel Example: `examples/short_term_order_cancel_examples.ts`(https://github.com/dydxprotocol/v4-clients/blob/main/v4-client-js/examples/short_term_order_cancel_example.ts)**

> Order cancel

```typescript
/*
    order is an Order object from the Indexer
    */
const goodTilBlock = order.goodTilBlock;
let goodTilBlockTime: number | undefined;
if (order.goodTilBlockTime) {
  const datetime = new Date(order.goodTilBlockTime);
  const utcMilllisecondsSinceEpoch = datetime.getTime();
  goodTilBlockTime = Math.round(utcMilllisecondsSinceEpoch / 1000);
}

const tx = await client.post.cancelOrder(
  subaccount,
  order.clientId,
  order.orderFlags,
  order.clobPairId,
  goodTilBlock,
  goodTilBlockTime
);
```

```python
import asyncio
import random
import time

from v4_proto.dydxprotocol.clob.order_pb2 import Order

from dydx_v4_client import MAX_CLIENT_ID, OrderFlags
from dydx_v4_client.indexer.rest.constants import OrderType
from dydx_v4_client.indexer.rest.indexer_client import IndexerClient
from dydx_v4_client.network import TESTNET
from dydx_v4_client.node.client import NodeClient
from dydx_v4_client.node.market import Market
from dydx_v4_client.wallet import Wallet
from tests.conftest import DYDX_TEST_MNEMONIC, TEST_ADDRESS

MARKET_ID = "ETH-USD"


async def test():

    node = await NodeClient.connect(TESTNET.node)
    indexer = IndexerClient(TESTNET.rest_indexer)

    market = Market(
        (await indexer.markets.get_perpetual_markets(MARKET_ID))["markets"][MARKET_ID]
    )
    wallet = await Wallet.from_mnemonic(node, DYDX_TEST_MNEMONIC, TEST_ADDRESS)

    current_block = await node.latest_block_height()
    good_til_block = current_block + 1 + 10

    order_id = market.order_id(
        TEST_ADDRESS, 0, random.randint(0, MAX_CLIENT_ID), OrderFlags.SHORT_TERM
    )

    place = await node.place_order(
        wallet,
        market.order(
            order_id,
            OrderType.LIMIT,
            Order.Side.SIDE_SELL,
            size=0.01,
            price=40000,
            time_in_force=Order.TimeInForce.TIME_IN_FORCE_UNSPECIFIED,
            reduce_only=False,
            good_til_block=good_til_block,
        ),
    )
    print(place)
    # FIXME(piwonskp): Remove
    wallet.sequence += 1
    time.sleep(5)

    cancel = await node.cancel_order(
        wallet, order_id, good_til_block=good_til_block + 10
    )
    print(cancel)


asyncio.run(test())
```

```rust
mod support;
use anyhow::{Error, Result};
use dydx::config::ClientConfig;
use dydx::indexer::{AnyId, IndexerClient, Ticker};
use dydx::node::{NodeClient, OrderBuilder, OrderSide, Wallet};
use dydx_proto::dydxprotocol::clob::order::TimeInForce;
use support::constants::TEST_MNEMONIC;
use tokio::time::{sleep, Duration};

const ETH_USD_TICKER: &str = "ETH-USD";

pub struct OrderPlacer {
    client: NodeClient,
    indexer: IndexerClient,
    wallet: Wallet,
}

impl OrderPlacer {
    pub async fn connect() -> Result<Self> {
        let config = ClientConfig::from_file("client/tests/testnet.toml").await?;
        let client = NodeClient::connect(config.node).await?;
        let indexer = IndexerClient::new(config.indexer);
        let wallet = Wallet::from_mnemonic(TEST_MNEMONIC)?;
        Ok(Self {
            client,
            indexer,
            wallet,
        })
    }
}

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt().try_init().map_err(Error::msg)?;
    #[cfg(feature = "telemetry")]
    support::telemetry::metrics_dashboard().await?;
    let mut placer = OrderPlacer::connect().await?;
    let mut account = placer.wallet.account(0, &mut placer.client).await?;
    let subaccount = account.subaccount(0)?;

    let ticker = Ticker(ETH_USD_TICKER.into());
    let market = placer
        .indexer
        .markets()
        .get_perpetual_market(&ticker)
        .await?;

    let current_block_height = placer.client.get_latest_block_height().await?;
    let good_until = current_block_height.ahead(10);

    let (order_id, order) = OrderBuilder::new(market, subaccount)
        .limit(OrderSide::Buy, 100, 3)
        .reduce_only(false)
        .time_in_force(TimeInForce::Unspecified)
        .until(good_until.clone())
        .build(AnyId)?;

    let place_tx_hash = placer.client.place_order(&mut account, order).await?;
    tracing::info!("Place order transaction hash: {:?}", place_tx_hash);

    sleep(Duration::from_secs(5)).await;

    // Cancel order
    let cancel_tx_hash = placer
        .client
        .cancel_order(&mut account, order_id, good_until)
        .await?;
    tracing::info!("Cancel order transaction hash: {:?}", cancel_tx_hash);

    Ok(())
}
```

#### Request

<aside class="warning">
Programmatic users of the API must take care to store Mnemonics. dYdX does not store any private keys. you must be careful not to lose it, or your funds may be inaccessible for a period of time.
</aside>

Description: Deposit funds into your dYdX subaccount

| Parameter           | Type            | Required? | Description                           |
| ------------------- | --------------- | --------- | ------------------------------------- |
| `subaccount`        | SubaccountInfo  | yes       | The subaccount to deposit to          |
| `clientId`          | number          | yes       | The asset ID of the asset to deposit  |
| `orderFlags`        | OrderFlags      | yes       |                                       |
| `clobPairId`        | number          | yes       |                                       |
| `goodTilBlock`      | number          | no        |                                       |
| `goodTilBlockTime`  | number          | no        |                                       |
| `broadcastMode`     | BroadcastMode   | no        | The broadcast mode                    |

#### Response

| Parameter | Description |
| --------- | ----------- |
| Tx        | Tx hash     |

<!--
## Derive StarkKey
> Derive StarkKey

```python
key_pair_with_y_coordinate = client.onboarding.derive_stark_key(
  # Optional if eth_private_key or web3.eth.defaultAccount was provided.
  ethereum_address='ethereumAddress',
)
```

```typescript
const keyPairWithYCoordinate: KeyPairWithYCoordinate = await client.onboarding.deriveStarkKey(
  'ethereumAddress',
);
```

<aside class="success">
This method does not access the dYdX API. This is used by the frontend app to derive the STARK key pair in a way that is recoverable. Programmatic traders may optionally derive their STARK key pair in the same way.
</aside>

### Request

Parameter          | Description
------------------ | -----------
ethereumAddress    | Ethereum address associated with the user being created.

### Response

Parameter             | Description
----------------------| -----------
keyPairWithYCoordinate| KeyPairWithYCoordinate.

### KeyPairWithYCoordinate

|field|type|description|
|-----|----|-----------|
|publicKey|string|The x-coordinate of the publicKey.|
|publicKeyYCoordinate|string|The y-coordinate of the publicKey.|
|privateKey|string|The privateKey for the key pair.|

## Recover Default API Credentials
> Recover Default API Credentials

```python
api_credentials = client.onboarding.recover_default_api_key_credentials(
  # Optional if eth_private_key or web3.eth.defaultAccount was provided.
  ethereum_address='ethereumAddress',
)
```

```typescript
const apiCredentials: ApiKeyCredentials = await client.onboarding.recoverDefaultApiCredentials(
  'ethereumAddress',
);
```

<aside class="success">
This method does not access the dYdX API. This can be used to recover the default API key credentials, which are
the same set of credentials used in the dYdX frontend.
</aside>

### Request

Parameter          | Description
------------------ | -----------
ethereumAddress    | Ethereum address associated with the user being created.

### Response

Parameter      | Description
---------------| -----------
apiCredentials | ApiKeyCredentials.

### ApiKeyCredentials

|field|type|description|
|-----|----|-----------|
|key|string|UUID identifying the credentials.|
|secret|string|Secret string used to generate HMACs.|
|passphrase|string|Secret string sent with each request.|

## Recover StarkKey, QuoteBalance and Open Positions
> Recovery

```python
recovery = client.eth_private.recovery(
  # Optional if eth_private_key or web3.eth.defaultAccount was provided.
  ethereum_address='ethereumAddress',
)
```

```typescript
const recovery: {
  starkKey: string,
  positionId: string,
  quoteBalance: string,
  positions: PositionResponseObject[],
} = client.ethPrivate.recovery(
  'ethereumAddress',
);
```

```json
{
  "starkKey": "180913017c740260fea4b2c62828a4008ca8b0d6e4",
  "positionId": "1812",
  "equity": "10000",
  "freeCollateral": "10000",
  "quoteBalance": "10000",
  "positions": [
    {
      "market": "BTC-USD",
      "status": "OPEN",
      "side": "LONG",
      "size": "1000",
      "maxSize": "1050",
      "entryPrice": "100",
      "exitPrice": null,
      "unrealizedPnl": "50",
      "realizedPnl": "100",
      "createdAt": "2021-01-04T23:44:59.690Z",
      "closedAt": null,
      "netFunding": "500",
      "sumOpen": "1050",
      "sumClose": "50"
    }
  ]
}
```

### HTTP Request
`GET v3/recovery`

Description: This is for if you can't recover your starkKey or apiKey and need an additional way to get your starkKey and balance on our exchange, both of which are needed to call the L1 solidity function needed to recover your funds.

### Response

Parameter     | Description
------------- | ----------
starkKey      | Public starkKey associated with the key-pair you created.
positionId    | Starkware-specific positionId.
equity        | The amount of equity (value) in the account. Uses balances and oracle-prices to calculate.
freeCollateral| The amount of collateral that is withdrawable from the account.
quoteBalance  | Human readable quote token balance. Can be negative.
positions     | See [Positions](#get-positions). Note, only open position are returned.

## Get Registration
> Get Registration

```python
signature = client.private.get_registration()
```

```typescript
const signature: { signature: string } = await client.private.getRegistration();
```

```json
{
  "signature": "foo"
}
```

### HTTP Request
`GET v3/registration`

Description: Gets the dYdX provided Ethereum signature required to send a registration transaction to the Starkware smart contract.

### Response

Parameter      | Description
---------------| -----------
signature      | Ethereum signature authorizing the user's Ethereum address to register for the corresponding position id.

## Register API Key
> Register API Key

```python
api_key_response = client.eth_private.create_api_key(
  # Optional if eth_private_key or web3.eth.defaultAccount was provided.
  ethereum_address='0x0123...',
)
```

```typescript
const apiKey: { apiKey: ApiKeyCredentials } = await client.ethPrivate.createApiKey(
  '0x0123...',
);
```

```json
{
  "apiKey": {
    "key": "290decd9-548b-62a8-d603-45a988386fc8",
    "passphrase": "S6a8lUhACPY2L5MWDvPl",
    "secret": "KQ3s2VSLYqjWA0WpiDhvyEumvJVIQAj2Ni-TFg7z"
  }
}
```

### HTTP Request
`POST v3/api-keys`

Description: Create new API key credentials for a user.
Limit: 20 API keys per user.

### Response

Parameter      | Description
---------------| -----------
apiKey         | [ApiKeyCredentials](#apikeycredentials).

## Get API Keys
> Get API Keys

```python
api_keys = client.private.get_api_keys()
```

```typescript
const apiKeys: { keys: string[] } = await client.private.getApiKeys();
```

```json
{
  "apiKeys": [
    "290decd9-548b-62a8-d603-45a988386fc8",
    "390decd9-548b-62a8-d603-45a988386fc8",
    ...
  ]
}
```

### HTTP Request
`GET v3/api-keys`


Description: Get all api keys associated with an Ethereum address.

<aside class="warning">
Note that this endpoint is in the private module, unlike the methods to create or revoke API keys.
</aside>

### Response

Parameter      | Description
---------------| -----------
apiKeys        | Array of apiKey strings corresponding to the ethereumAddress in the request.

## Delete API Key
> Delete API Key

```python
client.eth_private.delete_api_key(
  api_key='290decd9-548b-...',
  # Optional if eth_private_key or web3.eth.defaultAccount was provided.
  ethereum_address='0x0123...',
)
```

```typescript
await client.ethPrivate.delete_api_key(
  '290decd9-548b-...', // API key
  '0x0123...', // Ethereum address
);
```

```json
{
  "apiKey": "foo"
}
```

### HTTP Request
`DELETE v3/api-keys`

Description: Delete an api key by key and Ethereum address.

<aside class="warning">
Deleting your API keys may cause you to be locked out of your account. dYdX will only prevent deleting your last API Key. Proceed with caution when using this endpoint.
</aside>

### Request

Parameter       | Description
----------------| -----------
apiKey          | Public api key being deleted.
ethereumAdddress| Ethereum address the api key is associated with.

### Response

Returns a 200 on success.

## Get User
> Get User

```python
user = client.private.get_user()
```

```typescript
const user: { user: UserResponseObject } = await client.private.getUser();
```

```json
{
  "user": {
    "ethereumAddress": "0x0913017c740260fea4b2c62828a4008ca8b0d6e4",
    "isRegistered": true,
    "email": "email@dydx.exchange",
    "username": "supersam15o",
    "referredByAffiliateLink": null,
    "makerFeeRate": "0.01",
    "takerFeeRate": "0.01",
    "makerVolume30D": "1000.00",
    "takerVolume30D": "1000.00",
    "fees30D": "00.50",
    "userData": {},
    "dydxTokenBalance": "0",
    "stakedDydxTokenBalance": "0",
    "isEmailVerified": false,
    "hedgiesHeld": [1, 2, 3000],
    "country": "CN",
    "languageCode": "zh-CN"
  }
}
```

### HTTP Request
`GET v3/users`

Description: return the user and user information.

### Response

Parameter               | Description
------------------------| -----------
ethereumAddress         | The 20-byte Ethereum address.
isRegistered            | True if the user is registered on the starkware smart contract. This is false otherwise.
email                   | Email address.
username                | User defined username.
referredByAffiliateLink | The affiliate link that referred this user, or null if the user was not referred.
makerFeeRate            | The fee rate the user would be willing to take as the maker. Fee rates are rounded to a 100th of a basis point, or 0.0001%. Note, 1% would be represented as 0.01.
takerFeeRate            | The fee rate the user would be willing to take as the taker. Fee rates are rounded to a 100th of a basis point, or 0.0001%. Note, 1% would be represented as 0.01.
makerVolume30D          | The user's trailing-thirty-day maker volume in USD.
takerVolume30D          | The user's trailing-thirty-day taker volume in USD.
fees30D                 | The user's trailing-thirty-day fees in USD.
userData                | The user's unstructured user data.
dydxTokenBalance        | The user's DYDX token holdings.
stakedDydxTokenBalance  | The user's staked DYDX token holdings
isEmailVerified         | If the user's email address is verified to receive emails from dYdX.
hedgiesHeld             | Indices of all Hedgies held by the user.
country                 | Country of the user's residence. Must be [ISO 3166-1 Alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) compliant.
languageCode            | The user's preferred language. Must be [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) compliant, including 'zh-CN'.

## Update User
> Update user

```python
user = client.private.update_user(
  user_data={},
  email='user@example.com',
  username='username',
  is_sharing_email=False,
  is_sharing_address=True,
  country='SG',
  language_code='en',
)
```

```typescript
const user: { user: UserResponseObject } = await client.private.updateUser({
  email: 'user@example.com',
  username: 'username',
  isSharingEmail: false,
  isSharingAddress: false,
  userData: {},
  country: 'SG',
  languageCode: 'en',
});
```

```json
{
  "user": {
    "ethereumAddress": "0x0913017c740260fea4b2c62828a4008ca8b0d6e4",
    "isRegistered": true,
    "email": "email@dydx.exchange",
    "username": "supersam15o",
    "referredByAffiliateLink": null,
    "makerFeeRate": "0.01",
    "takerFeeRate": "0.01",
    "makerVolume30D": "1000.00",
    "takerVolume30D": "1000.00",
    "fees30D": "00.50",
    "userData": {},
    "dydxTokenBalance": "0",
    "stakedDydxTokenBalance": "0",
    "isEmailVerified": false,
    "country": "SG",
    "languageCode": "en"
  }
}
```

### HTTP Request
`PUT v3/users`

Description: Update user information and return the updated user.

Parameter         | Description
------------------| -----------
userData          | User metadata in a JSON blob.
email             | (Optional) Email to be used with the user.
username          | (Optional) Username to be used for the user.
isSharingUsername | (Optional) Share username publically on leaderboard rankings.
isSharingAddress  | (Optional) Share ETH address publically on leaderboard rankings.
country           | (Optional) Country of the user's residence. Must be [ISO 3166-1 Alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) compliant.
languageCode      | (Optional) The user's preferred language. Must be [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) compliant, including 'zh-CN'.

### Response

Parameter      | Description
---------------| -----------
user           | See [User](#get-user).

## Get User Active Links
> Get User Active Links

```python
links = client.private.get_user_links()
```

```typescript
const userLinks: UserLinksResponseObject = await client.private.getUserLinks();
```

```json
{
  "userType": "SECONDARY",
  "primaryAddress": "0x0913017c740260fea4b2c62828a4008ca8b0d6e4",
  "secondaryAddresses": null
}
```

### HTTP Request
`GET v3/users/links`

Description: return active user links.

### Response

Parameter               | Description
------------------------| -----------
userType                | `PRIMARY`, `SECONDARY`, or null if no active links.
primaryAddress          | Address of the `PRIMARY` user if `userType = SECONDARY`. null otherwise.
linkedAddresses         | Addresses of the `SECONDARY` users if `userType = PRIMARY`. null otherwise.

## Send User Link Request
> Send User Link Request

```python
pending_links = client.private.send_link_request('CREATE_SECONDARY_REQUEST', '0x0913017c740260fea4b2c62828a4008ca8b0d6e4')
```

```typescript
const res: {} = await client.private.sendLinkRequest({
  action: LinkAction.REMOVE,
  address: "0x0913017c740260fea4b2c62828a4008ca8b0d6e4"
});
```

```json
{}
```

### HTTP Request
`POST v3/users/links`

Description: Send a new request to link users, respond to a pending request, or remove a link.

All DYDX rewards will be calculated and distributed to the primary address following the current rewards formulas.

For trading rewards, all formula terms will be summed and aggregated across linked addresses, including fees paid, open interest, and stkDYDX.
For liquidity provider rewards, all formula terms will be summed and aggregated across linked addresses, including depth/score score, stkDYDX, and maker volume. For each market, the max uptime across linked addresses will be used.

### Request

Parameter          | Description
------------------ | -----------
action             | `CREATE_SECONDARY_REQUEST`, `DELETE_SECONDARY_REQUEST`, `ACCEPT_PRIMARY_REQUEST`, `REJECT_PRIMARY_REQUEST`, or `REMOVE`.
address            | Address that the link is with (should not be your own).

### Response

Parameter               | Description
------------------------| -----------
{}                      | Empty object upon success.

### Link Actions

Action                     | Description
-------------------------- | -----------
`CREATE_SECONDARY_REQUEST` | Create a pending link request for the address to become `SECONDARY`, and your address to become `PRIMARY`. Request will be rejected if either address is already linked.
`DELETE_SECONDARY_REQUEST` | Delete an outgoing link request from your address.
`ACCEPT_PRIMARY_REQUEST`   | Accept a pending link request for your address to become `SECONDARY` and their address to become `PRIMARY`.
`REJECT_PRIMARY_REQUEST`   | Reject an incoming pending link request.
`REMOVE`                   | Remove an active link between your address and the other's.

## Get User Pending Link Requests
> Get User Pending Link Requests

```python
pending_links = client.private.get_user_pending_link_requests()
```

```typescript
const userPendingLinks: UserLinkRequestsResponseObject = await client.private.getUserPendingLinkRequests();
```

```json
{
  "userType": null,
  "outgoingRequests": [],
  "incomingRequests": [
    {
      "primaryAddress": "0x99b0599952a4fd2d1a1561fa4c010827ead30354",
      "secondaryAddress": "0x0913017c740260fea4b2c62828a4008ca8b0d6e4"
    }
  ]
}
```

### HTTP Request
`GET v3/users/links/requests`

Description: return pending user links.

### Response

Parameter               | Description
------------------------| -----------
userType                | `PRIMARY`, `SECONDARY`, or null if no active links.
outgoingRequests        | Outgoing requests for another user to be linked as `SECONDARY` to this user. null if `userType = SECONDARY`.
incomingRequests        | Incoming requests for this user to be linked as `SECONDARY` to another user. null if `userType != null`.

## Create An Account
> Create Account

```python
client.private.create_account(
  stark_public_key='701234abcd...',
  stark_public_key_y_coordinate='1234abcd...',
)
```

```typescript
const account: { account: AccountResponseObject } = await client.private.createAccount(
  '701234abcd...', // starkKey
  '1234abcd...', // starkKeyYCoordinate
);
```

```json
{
  "account": {
    "starkKey": "180913017c740260fea4b2c62828a4008ca8b0d6e4",
    "positionId": "1812",
    "equity": "10000",
    "freeCollateral": "10000",
    "quoteBalance": "10000",
    "pendingDeposits": "0",
    "pendingWithdrawals": "0",
    "createdAt": "2021-04-09T21:08:34.984Z",
    "openPositions": {
      "BTC-USD": {
        "market": "BTC-USD",
        "status": "OPEN",
        "side": "LONG",
        "size": "1000",
        "maxSize": "1050",
        "entryPrice": "100",
        "exitPrice": null,
        "unrealizedPnl": "50",
        "realizedPnl": "100",
        "createdAt": "2021-01-04T23:44:59.690Z",
        "closedAt": null,
        "netFunding": "500",
        "sumOpen": "1050",
        "sumClose": "50"
      }
    },
    "accountNumber": "5",
    "id": "id"
  }
}
```

<aside class="warning">
An account will be created automatically during onboarding so this call is not necessary to get started.
</aside>

### HTTP Request
`POST v3/accounts`

Description: Create an account with a given starkKey.

### Request

Parameter          | Description
------------------ | -----------
starkKey           | Public starkKey associated with the key-pair you created.
starkKeyYCoordinate| Public starkKey Y-Coordinate associated with the key-pair you created.


### Response

Parameter      | Description
---------------| -----------
account        | See [Account](#get-account).

## Get Account
> Get Account

```python
account = client.private.get_account(
  # Optional if eth_private_key or web3.eth.defaultAccount was provided.
  ethereum_address='0x0123...',
)
```

```typescript
const account: { account: AccountResponseObject } = await client.private.getAccount(
  '0x0123...',
);
```

```json
{
  "account": {
    "starkKey": "180913017c740260fea4b2c62828a4008ca8b0d6e4",
    "positionId": "1812",
    "equity": "10000",
    "freeCollateral": "10000",
    "quoteBalance": "10000",
    "pendingDeposits": "0",
    "pendingWithdrawals": "0",
    "createdAt": "2021-04-09T21:08:34.984Z",
    "openPositions": {
      "BTC-USD": {
        "market": "BTC-USD",
        "status": "OPEN",
        "side": "LONG",
        "size": "1000",
        "maxSize": "1050",
        "entryPrice": "100",
        "exitPrice": null,
        "unrealizedPnl": "50",
        "realizedPnl": "100",
        "createdAt": "2021-01-04T23:44:59.690Z",
        "closedAt": null,
        "netFunding": "500",
        "sumOpen": "1050",
        "sumClose": "50"
      }
    },
    "accountNumber": "5",
    "id": "id"
  }
}
```

### HTTP Request
`GET v3/accounts/:id`

Description: Get an account for a user by id. Using the client, the id will be generated with client
information and an Ethereum address.

### Request

Parameter      | Description
---------------| -----------
ethereumAddress| Ethereum address associated with an account.

### Response

Parameter         | Description
------------------| -----------
starkKey          | Public StarkKey associated with an account.
positionId        | Starkware-specific positionId.
equity            | The amount of equity (value) in the account. Uses balances and oracle-prices to calculate.
freeCollateral    | The amount of collateral that is withdrawable from the account.
quoteBalance      | Human readable quote token balance. Can be negative.
pendingDeposits   | The sum amount of all pending deposits.
pendingWithdrawals| The sum amount of all pending withdrawal requests.
createdAt         | When the account was first created in UTC.
openPositions     | See [Positions](#get-positions). Note, markets where the user has no position are not returned in the map.
accountNumber     | Unique accountNumber for the account.
id                | Unique id of the account hashed from the userId and the accountNumber.

## Get Account Leaderboard PNLs
> Get Account Leaderboard PNLs

```typescript
const account: { accountPnls: AccountLeaderboardPnlResponseObject } = await client.private.getAccountLeaderboardPnl(
  period=LeaderboardPnlPeriod.DAILY,
);
```

```json
{
  "absolutePnl": "100.000000",
  "percentPnl": "100.000000",
  "absoluteRank": 10,
  "percentRank": 10,
  "startedAt": "2021-08-01T00:00:00.000Z",
  "endsAt": "2021-08-10T00:00:00.000Z",
  "updatedAt": "2021-08-02T22:53:45.659Z",
  "accountId": "afoo",
  "period": "BRONZE",
  "seasonExpectedOutcome": "PROMOTION",
  "seasonNumber": 16,
  "hedgieWon": null,
  "prizeWon": "100000"
}
```

### HTTP Request
`GET v3/accounts/leaderboard-pnl/:period`

Description: Get an account's personal leaderboard pnls.

### Request

Parameter          | Description
-------------------| -----------
period             | "DAILY", "WEEKLY", "MONTHLY", "ALLTIME", "COMPETITION", "DAILY_COMPETITION", or "LEAGUES".
startingBeforeOrAt | (Optional) Latest the leaderboard starts at.

### Response

Parameter             | Description
----------------------| -----------
absolutePnl           | The account's latest updated absolute PNL.
percentPnl            | The account's latest updated percent PNL.
absoluteRank          | User's absolute PNL rank. `null` if not ranked.
percentRank           | User's percent PNL rank. `null` if not ranked.
startedAt             | Starting time for this pnl. Note: will only be set if being used for a competition or leagues. Otherwise, this value will always be `null`.
endsAt                | Ending time for this pnl. Note: will only be set if being used for a competition or leagues. Otherwise, this value will always be `null`. (Can be a future time.)
updatedAt             |	When these leaderboard PNLs were last updated.
accountId             | The account the PNLs are for.
period                | "DAILY", "WEEKLY", "MONTHLY", "ALLTIME", "COMPETITION", "BRONZE", "SILVER", "GOLD", "PLATINUM", "DIAMOND".
seasonExpectedOutcome | User's expected outcome of latest season. "PROMOTION", "DEMOTION", or "SAME_LEAGUE". `null` if not "LEAGUES".
seasonNumber          | Leagues season number. Starts at 1. `null` if not "LEAGUES".
hedgieWon             | Index of hedgie won. `null` if no hedgie won.
prizeWon              | Amount of cash prize won in dollars. `null` if no prize won.


## Get Account Historical Leaderboard PNLs
> Get Account Historical Leaderboard PNLs

```python
historical_leaderboard_pnls = client.private.get_historical_leaderboard_pnls("LEAGUES")
```

```typescript
const historicalLeaderboardPnls: HistoricalLeaderboardPnlsResponseObject = await client.private.getAccountHistoricalLeaderboardPnl(
  period=AccountLeaderboardPnlPeriod.DAILY,
);
```

```json
{
  "leaderboardPnls" : [
    {
      "absolutePnl": "100.000000",
      "percentPnl": "100.000000",
      "absoluteRank": 10,
      "percentRank": 10,
      "startedAt": "2021-08-01T00:00:00.000Z",
      "endsAt": "2021-08-10T00:00:00.000Z",
      "updatedAt": "2021-08-02T22:53:45.659Z",
      "accountId": "afoo",
      "period": "BRONZE",
      "seasonOutcome": "PROMOTION",
      "seasonNumber": 16,
      "hedgieWon": null,
      "prizeWon": "100000"
    },
    ...
  ],
}
```

### HTTP Request
`GET v3/accounts/historical-leaderboard-pnls/:period`

Description: Get an account's historical leaderboard pnls.

### Request

Parameter          | Description
-------------------| -----------
period             | Leaderboard period. "LEAGUES", "DAILY", or "DAILY_COMPETITION".
limit              | Integer between 1 to 10, which indicates the number of most recent leaderboard pnls to be returned. By default this value will be 10.

### Response

Parameter             | Description
----------------------| -----------
leaderboardPnls       | Array of "LeaderboardPnl" from oldest to most recent. See "LeaderboardPnl" below.

### LeaderboardPnl

Parameter             | Description
----------------------| -----------
absolutePnl           | The account's latest updated absolute PNL.
percentPnl            | The account's latest updated percent PNL.
absoluteRank          | User's absolute PNL rank. `null` if not ranked.
percentRank           | User's percent PNL rank. `null` if not ranked.
startedAt             | Starting time for this pnl. Note: will only be set if being used for a competition or leagues. Otherwise, this value will always be `null`.
endsAt                | Ending time for this pnl. Note: will only be set if being used for a competition or leagues. Otherwise, this value will always be `null`. (Can be a future time.)
updatedAt             |	When these leaderboard PNLs were last updated.
accountId             | The account the PNLs are for.
period             | Leaderboard period. "LEAGUES", "DAILY", or "DAILY_COMPETITION".
seasonExpectedOutcome | User's expected outcome of latest season. "PROMOTION", "DEMOTION", or "SAME_LEAGUE". `null` if not "LEAGUES".
seasonNumber          | Leagues season number. Starts at 1. `null` if not "LEAGUES".
hedgieWon             | Index of hedgie won. `null` if no hedgie won.
prizeWon              | Amount of cash prize won in dollars. `null` if no prize won.

## Get Accounts
> Get Account

```python
accounts = client.private.get_accounts()
```

```typescript
const accounts: { accounts: AccountResponseObject[] } = await client.private.getAccounts();
```

```json
{ "accounts": [{
    "starkKey": "180913017c740260fea4b2c62828a4008ca8b0d6e4",
    "positionId": "1812",
    "equity": "10000",
    "freeCollateral": "10000",
    "quoteBalance": "10000",
    "pendingDeposits": "0",
    "pendingWithdrawals": "0",
    "createdAt": "2021-04-09T21:08:34.984Z",
    "openPositions": {
      "BTC-USD": {
        "market": "BTC-USD",
        "status": "OPEN",
        "side": "LONG",
        "size": "1000",
        "maxSize": "1050",
        "entryPrice": "100",
        "exitPrice": null,
        "unrealizedPnl": "50",
        "realizedPnl": "100",
        "createdAt": "2021-01-04T23:44:59.690Z",
        "closedAt": null,
        "netFunding": "500",
        "sumOpen": "1050",
        "sumClose": "50"
      }
    },
    "accountNumber": "5",
    "id": "id"
  }]
}
```

### HTTP Request
`GET v3/accounts`

Description: Get all accounts for a user.

### Response

Parameter      | Description
---------------| -----------
accounts        | See [Account](#get-account). Returns an array of Accounts.

## Get Positions
>Get Positions

```python
from dydx3.constants import MARKET_BTC_USD
from dydx3.constants import POSITION_STATUS_OPEN

all_positions = client.private.get_positions(
  market=MARKET_BTC_USD,
  status=POSITION_STATUS_OPEN,
)
```

```typescript
const positions: { positions: PositionResponseObject[] } = await client.private.getPositions(
  {
    market: Market.BTC_USD,
    status: PositionStatus.OPEN,
  },
);
```

```json
{
  "market": "BTC-USD",
  "status": "OPEN",
  "side": "LONG",
  "size": "1000",
  "maxSize": "1050",
  "entryPrice": "100",
  "exitPrice": null,
  "unrealizedPnl": "50",
  "realizedPnl": "100",
  "createdAt": "2021-01-04T23:44:59.690Z",
  "closedAt": null,
  "netFunding": "500",
  "sumOpen": "1050",
  "sumClose": "50"
}
```

### HTTP Request
`GET v3/positions`

Description: Get all current positions for a user by specified query parameters.

For each market, a position is created with `status=OPEN`. A position is set to `status=CLOSED` when it goes to market-neutral (i.e. `size=0`). On a per-market basis, there should be at most one `status=OPEN` position at any given time.

### Request

Parameter         | Description
------------------| -----------
market            | (Optional) Market of the position.
status            | (Optional) Status of the position. Can be <code>OPEN</code>, <code>CLOSED</code> or <code>LIQUIDATED</code>.
limit             | (Optional) The maximum number of positions that can be fetched via this request. Note, this cannot be greater than 100.
createdBeforeOrAt | (Optional) Set a date by which the positions had to be created.

### Response

Parameter         | Description
------------------| -----------
market            | The market of the position.
status            | The status of the position.
side              | The side of the position. <code>LONG</code> or <code>SHORT</code>.
size              | The current size of the position. Positive if long, negative if short, 0 if closed.
maxSize           | The maximum (absolute value) size of the position. Positive if long, negative if short.
entryPrice        | Average price paid to enter the position.
exitPrice         | Average price paid to exit the position.
unrealizedPnl     | The unrealized pnl of the position in quote currency using the market's [index-price](#index-price-sources) for the position to calculate.
realizedPnl       | The realized pnl of the position in quote currency.
createdAt         | Timestamp of when the position was opened.
closedAt          | Timestamp of when the position was closed.
netFunding        | Sum of all funding payments for this position.
sumOpen           | Sum of all trades sizes that increased the size of this position.
sumClose          | Sum of all trades sizes that decreased the size of this position.

## Get Transfers
> Get Transfers

```python
from dydx3.constants import ACCOUNT_ACTION_DEPOSIT

transfers = client.private.get_transfers(
  transfer_type=ACCOUNT_ACTION_DEPOSIT,
  limit=50,
)
```

```typescript
const transfers: { transfers: TransferResponseObject[] } = await client.private.getTransfers(
  {
    type: AccountAction.DEPOSIT,
    limit: 50,
  },
);
```

```json
{
  "transfers": [{
    "id": "foo",
    "type": "DEPOSIT",
    "debitAsset": "USDC",
    "creditAsset": "USDT",
    "debitAmount": "3000",
    "creditAmount": "2800",
    "transactionHash": "hash",
    "status": "PENDING",
    "createdAt": "2021-01-04T23:44:59.690Z",
    "confirmedAt": null,
    "clientId": "foo",
    "fromAddress": "0x0913017c740260fea4b2c62828a4008ca8b0d6e4",
    "toAddress": null
  }]
}
```

### HTTP Request
`GET v3/transfers`

Description: Get transfers for a user, limited by query parameters.

### Request

Parameter         | Description
------------------| -----------
transferType      | (Optional) Type of the transfer. Can be <code>DEPOSIT</code>, <code>WITHDRAWAL</code> or <code>FAST_WITHDRAWAL</code>.
limit             | (Optional) The maximum number of transfers that can be fetched via this request. Note, this cannot be greater than 100.
createdBeforeOrAt | Latest that the transfers could have been created.

### Response

Parameter         | Description
------------------| -----------
id                | Unique id assigned by dYdX.
type              | Type of the transfer. Will be <code>DEPOSIT</code>, <code>WITHDRAWAL</code> or <code>FAST_WITHDRAWAL</code>.
debitAsset        | Asset that was debited (USDC, USDT, USD, etc).
creditAsset       | Asset that was credited (USDC, USDT, USD, etc).
debitAmount       | Amount that was sent in for the deposit in debitAsset.
creditAmount      | Amount that was credited to the account in creditAsset.
transactionHash   | Ethereum transaction hash of the transfer.
status            | Status of the transfer. Will be <code>PENDING</code> or <code>CONFIRMED</code>.
createdAt         | Timestamp when created.
confirmedAt       | Timestamp when confirmed.
clientId          | ClientId of transfer.
fromAddress       | The Ethereum address the transfer is from.
toAddress         | The Ethereum address the transfer is for.

## Fast vs. Slow Withdrawal

The normal process for withdrawing from L2 to L1 requires waiting for a block of L2 transactions to be collected, and the zero-knowledge proof for the block to be constructed and verified onchain.

Using the fast withdrawal process, users can get their funds on L1 much faster by essentially trading their L2 funds to an “LP” account operated by dYdX, in order to receive immediate liquidity on L1. Since the LP must then recycle these funds from L2 to L1 via the regular withdrawal process, dYdX is only able to process a certain volume of fast withdrawals within a given period of time.

## Create Withdrawal
> Create Withdrawal

```python
from dydx3.constants import ASSET_USDC

withdrawal = client.private.create_withdrawal(
  position_id=1, # required for creating the withdrawal signature
  amount='100',
  asset=ASSET_USDC,
  expiration_epoch_seconds=1613988637,
)
```

```typescript
const withdrawal: { withdrawal: TransferResponseObject } = await client.private.createWithdrawal(
  {
    amount: '100',
    asset: Asset.USDC,
    expiration: '2020-12-28T22:49:31.588Z',
  },
  '1', // positionId required for creating the withdrawal signature
);
```

```json
{
  "withdrawal": {
    "id": "foo",
    "type": "WITHDRAWAL",
    "debitAsset": "USDC",
    "creditAsset": "USDC",
    "debitAmount": "3000",
    "creditAmount": "2800",
    "transactionHash": "hash",
    "status": "PENDING",
    "createdAt": "2021-01-04T23:44:59.690Z",
    "confirmedAt": null,
    "clientId": "foo",
    "fromAddress": "0x0913017c740260fea4b2c62828a4008ca8b0d6e4",
    "toAddress": null
  }
}
```

### HTTP Request
`POST v3/withdrawals`

Description: Create a withdrawal from an account.

<aside class="notice">
If not withdrawing the entirety of your balance, there is a minimum withdrawal amount. Currently that amount is 100 USDC.
</aside>

An additional L1 transaction has to be sent to the Starkware contract to retrieve funds after a slow withdrawal. This cannot be done until the zero-knowledge proof for the block has been constructed and verified onchain. For the L1 transaction, the Ethereum address that the starkKey is registered to must call either the [withdraw](https://github.com/dydxprotocol/starkex-eth/blob/master/src/contracts/starkware-perpetual-abi.json#L1802) or [withdrawTo](https://github.com/dydxprotocol/starkex-eth/blob/master/src/contracts/starkware-perpetual-abi.json#L1907) smart-contract functions. The contract ABI is not tied to a particular client but can be accessed via a [client](https://github.com/dydxprotocol/starkex-eth). All withdrawable funds are withdrawn at once.

Both Layer 1 withdrawal methods can be accessed from [starkex-eth](https://github.com/dydxprotocol/starkex-eth/blob/master/src/modules/Exchange.ts).

### Request

Parameter         | Description
------------------| -----------
amount            | Amount to be withdrawn.
asset             | Asset being withdrawn. Can currently only be <code>USDC</code>.
expiration        | Datetime at which the withdrawal expires if it has not been completed. Expiration must be at least seven days in the future.
clientId          | Unique id of the client associated with the withdrawal. Must be <= 40 characters. When using the client, if not included, will be randomly generated by the client.
signature         | The signature for the withdrawal, signed with the account's STARK private key. When using the client, if not included, will be done by the client. For more information see [above](#creating-and-signing-requests).

### Response

Parameter         | Description
------------------| -----------
withdrawal        | See [Transfers](#get-transfers).

## Create Fast Withdrawal
> Create Fast Withdrawal

```python
from dydx3.constants import ASSET_USDC

fast_withdrawal = client.private.create_fast_withdrawal(
  position_id='1', # required for creating the fast-withdrawal signature
  credit_asset=ASSET_USDC,
  credit_amount='100',
  debit_amount='110',
  to_address='0x98ab...',
  lp_position_id='2',
  expiration_epoch_seconds=1613988637,
  signature='0abc12...',  # Optional if stark_private_key was provided to client.
)
```

```typescript
const fastWithdrawal: { withdrawal: TransferResponseObject } = await client.private.createFastWithdrawal(
  {
    creditAsset: Asset.USDC,
    creditAmount: '100',
    debitAmount: '110',
    toAddress: '0x98ab...',
    lpPositionId: '2',
    clientId: 'client',
    signature: '0abc12...', // Optional if starkPrivateKey was provided to client.
  },
  '1', // positionId required for creating the fast-withdrawal signature
);
```

```json
{
  "withdrawal": {
    "id": "foo",
    "type": "FAST_WITHDRAWAL",
    "debitAsset": "USDC",
    "creditAsset": "USDC",
    "debitAmount": "3000",
    "creditAmount": "2800",
    "transactionHash": "hash",
    "status": "PENDING",
    "createdAt": "2021-01-04T23:44:59.690Z",
    "confirmedAt": null,
    "clientId": "foo",
    "fromAddress": "0x0913017c740260fea4b2c62828a4008ca8b0d6e4",
    "toAddress": null
  }
}
```

### HTTP Request
`POST v3/fast-withdrawals`

Description: Create a fast-withdrawal. [dYdX article on how fast withdrawals work](https://help.dydx.exchange/en/articles/4797387-how-do-deposits-and-withdrawals-work).

### Request

Parameter         | Description
------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
creditAsset       | Asset being withdrawn. Can currently only be <code>USDC</code>.
creditAmount      | Amount that is expected.
debitAmount       | Amount offered in <code>USDC</code> for the credit amount.
toAddress         | Address to be credited.
lpPositionId      | LP Position Id of the debit account.
expiration        | Datetime at which the withdrawal expires if it has not been completed. Expiration must be at least seven days in the future.
signature         | Signature for the fast-withdrawal, signed with the account's STARK private key. When using the client, if not included, will be done by the client. For more information see [above](#creating-and-signing-requests).
clientId          | Unique id of the client associated with the fast-withdrawal. Must be <= 40 characters. When using the client, if not included, will be randomly generated by the client.

`expectedCredit` is the result of computing `debitAmount` - min(`gas_fee`).

### Response

Parameter         | Description
------------------| -----------
withdrawal        | See [Transfers](#get-transfers).

Returns 400 if `expectedCredit` != `creditAmount`.

## Order Types

Type           | Description
-------------- | -----------
MARKET         | Market order (must be FOK or IOC).
LIMIT          | Limit order.
STOP           | Stop limit order.
TRAILING_STOP  | Trailing stop limit order.
TAKE_PROFIT    | Take-profit order.
LIQUIDATED     | Indicates the account was liquidated (fills only).
LIQUIDATION    | Indicates the account took over a liquidated account (fills only).

## Create A New Order

> Create Order

```python
from dydx3.constants import MARKET_BTC_USD
from dydx3.constants import ORDER_SIDE_SELL
from dydx3.constants import ORDER_TYPE_LIMIT
from dydx3.constants import TIME_IN_FORCE_GTT

placed_order = client.private.create_order(
  position_id=1, # required for creating the order signature
  market=MARKET_BTC_USD,
  side=ORDER_SIDE_SELL,
  order_type=ORDER_TYPE_LIMIT,
  post_only=False,
  size='100',
  price='18000',
  limit_fee='0.015',
  expiration_epoch_seconds=1613988637,
  time_in_force=TIME_IN_FORCE_GTT,
)
```

```typescript
const order: { order: OrderResponseObject } = await client.private.createOrder(
  {
    side: OrderSide.SELL,
    type: OrderType.LIMIT,
    timeInForce: TimeInForce.GTT,
    postOnly: false,
    size: '100',
    price: '18000',
    limitFee: '0.015',
    expiration: '2022-12-21T21:30:20.200Z',
  },
  '1', // required for creating the order signature
);
```

```json
{
  "order": {
    "id": "foo",
    "clientId": "foo",
    "accountId": "afoo",
    "market": "BTC-USD",
    "side": "SELL",
    "price": "18000",
    "triggerPrice": null,
    "trailingPercent": null,
    "size": "100",
    "remainingSize": "100",
    "type": "LIMIT",
    "createdAt": "2021-01-04T23:44:59.690Z",
    "unfillableAt": null,
    "expiresAt": "2022-12-21T21:30:20.200Z",
    "status": "PENDING",
    "timeInForce": "GTT",
    "postOnly": false,
    "reduceOnly": false,
    "cancelReason": null
  }
}
```

### HTTP Request
`POST v3/orders`

Description: Create a new order.

### Request

Parameter      | Description
-------------- | -----------
market         | Market of the order.
side           | Either <code>BUY</code> or <code>SELL</sell>.
type           | The type of order. This can be <code>MARKET</code>, <code>LIMIT</code>, <code>STOP_LIMIT</code>, <code>TRAILING_STOP</code> or <code>TAKE_PROFIT</code>.
postOnly       | Whether the order should be canceled if it would fill immediately on reaching the matching-engine.
size           | Size of the order, in base currency (i.e. an ETH-USD position of size 1 represents 1 ETH).
price          | Worst accepted price of the base asset in USD.
limitFee       | Is the highest accepted fee for the trade. See [below](#order-limitfee) for more information.
expiration     | Time at which the order will expire if not filled. This is the Good-Til-Time and is accurate to a granularity of about 15 seconds.
timeInForce    | (Optional) One of <code>GTT</code> (Good til time), <code>FOK</code>(Fill or kill) or <code>IOC</code> (Immediate or cancel). This will default to <code>GTT</code>.
cancelId       | (Optional) The id of the order that is being replaced by this one.
triggerPrice   | (Optional) The triggerPrice at which this order will go to the matching-engine.
trailingPercent| (Optional) The percent that the triggerPrice trails the [index price](#index-price-sources) of the market.
reduceOnly     | (Optional) Whether the order should be [reduce-only](#reduce-only). Only supported on <code>FOK</code>(Fill or kill) or <code>IOC</code> (Immediate or cancel) orders.
clientId       | Unique id of the client associated with the order. Must be <= 40 characters. When using the client, if not included, will be randomly generated by the client.
signature      | Signature for the order, signed with the account's STARK private key. When using the client, if not included, will be done by the client. For more information see [above](#creating-and-signing-requests).

<aside class="notice">
Specifying cancelId will cause the order matching cancelId to be canceled **atomically** (and immediately before) with the new order being placed. This can be used to always have available liquidity on the book when market making. The new order will still be placed even if the old order was already filled.
</aside>

### Response

Parameter    | Description
------------ | -----------
order        | See [order](#get-orders).

## Order LimitFee

The `limitFee` is the highest fee a user would be willing to accept on an order. This should be in decimal form (i.e. 0.1 is 10%). To see current fees, call [GET /v3/users](#get-user) and the maker/taker fee rates show what fees will be. If the order is `postOnly` dYdX will validate against `makerFeeRate` only. The opposite is true if the order is `FOK` or `IOC` - dYdX will only validate against `takerFeeRate`. Otherwise, dYdX assesses against the maximum of maker and taker fee rate.

## Tick Size and Minimum Size

### Tick Size

Each market has a specified <code>tickSize</code>. Order <code>price</code> must be a multiple of the tickSize. The same applies to <code>triggerPrice</code> and <code>trailingPercent</code> if either of these are not null.

### Minimum Size

Each market has a specified <code>minOrderSize</code>. Order <code>size</code> must be not be less than the minOrderSize.

## Order Deletion

Canceled orders older than one month are deleted from the dYdX database.

## Reduce Only

A reduce-only order can only reduce an existing position.

- When user holds no open position, a reduce-only order will always be rejected.
- When user holds an open position, a reduce-only order can only be placed on the other side of the book, with size smaller or equal to the existing position size.

The reduce-only option can be combined with any order type (Limit, Market, Stop Loss, Take Profit, Trailing Stop), but is only available for taker orders (Immediate-or-Cancel and Fill-or-Kill).

`UNTRIGGERED` reduce-only orders are either resized or canceled (with cancel reason `REDUCE_ONLY_RESIZED`) if the underlying position shrinks or no longer exists. When there are multiple `UNTRIGGERED` reduce-only orders and the total order size exceeds the existing position, they will be resized/canceled starting from the order that will be filled last.

<aside class="notice">
Under extremely rare circumstances during outages, reduce-only orders may not execute as expected. During these cases, placing multiple reduce-only orders may result in an opposite position.
</aside>

## Cancel An Order
> Cancel an order

```python
client.private.cancel_order(order_id='0x0000')
```

```typescript
await client.private.cancelOrder('0x0000');
```

```json
{}
```

### HTTP Request
`DELETE v3/orders/:id`

Description: Cancel an order by its unique id.

### Request

Parameter        | Description
---------------- | -----------
orderId          | Unique id of the order to be canceled.

### Response

<aside class="success">
The endpoint returns with status code 200 once the order has been queued for cancelation. The order's status will be updated after the cancelation has been processed by the matching engine.
</aside>

Parameter    | Description
------------ | -----------
cancelOrder  | See [order](#get-orders).

## Cancel Orders
> Cancel Orders

```python
from dydx3.constants import MARKET_BTC_USD

client.private.cancel_all_orders(market=MARKET_BTC_USD)
```

```typescript
await client.private.cancelAllOrders(Market.BTC_USD);
```


```json
{}
```

### HTTP Request
`DELETE v3/orders`

Description: Either bulk cancel all orders or just all orders for a specific market.

### Request

Parameter       | Description
--------------- | -----------
market          | (Optional) Market of the orders being canceled.

### Response

<aside class="success">
The endpoint returns with status code 200 once the orders have been queued for cancelation. The orders' statuses will be updated after the cancelations have been processed by the matching engine.
</aside>

Parameter    | Description
------------ | -----------
cancelOrders | Returns an array of orders to be canceled. See [order](#get-orders).

## Cancel Active Orders
> Cancel Active Orders

```python
from dydx3.constants import MARKET_BTC_USD
from dydx3.constants import ORDER_SIDE_SELL

market_side_orders = client.private.cancel_active_orders(
  market=MARKET_BTC_USD,
  side=ORDER_SIDE_SELL,
)
```

```typescript
const marketSideOrders: {
  cancelOrders: ActiveOrderResponseObject[],
} = await client.private.cancelActiveOrders(
  {
    market: Market.BTC_USD,
    side: OrderSide.SELL,
  },
);
```

```json
{
  "cancelOrders": [
    {
      "id": "id",
      "accountId": "afoo",
      "market": "BTC-USD",
      "side": "SELL",
      "price": "29000",
      "remainingSize": "0.500",
    },
    ...
  ]
}
```

### HTTP Request
`DELETE v3/active-orders`

Description: Cancel active orders that match request parameters.

<aside class="success">
Note that rate-limiting is more generous for this endpoint than DELETE v3/orders. When including side, the rate-limiting becomes even more permissive and when id is included as well as side, the rate-limiting is its most permissive.
</aside>

### Request

Parameter        | Description
---------------- | -----------
market           | Market of the order.
side             | (Optional) Either <code>BUY</code> or <code>SELL</sell>. This parameter is required if `id` is included.
id               | (Optional) The unique id assigned by dYdX. Note, if id is not found, will return a 400.


### Response

<aside class="success">
The endpoint returns with status code 200 once the orders have been queued for cancelation. The orders' statuses will be updated after the cancelations have been processed by the matching engine.
</aside>


Parameter        | Description
---------------- | -----------
cancelOrders | Returns an array of active orders to be canceled. See [activeOrder](#get-active-orders).

## Get Orders
> Get Orders

```python
from dydx3.constants import MARKET_BTC_USD
from dydx3.constants import ORDER_SIDE_SELL
from dydx3.constants import ORDER_TYPE_LIMIT
from dydx3.constants import ORDER_STATUS_OPEN

all_orders = client.private.get_orders(
  market=MARKET_BTC_USD,
  status=ORDER_STATUS_OPEN,
  side=ORDER_SIDE_SELL,
  type=ORDER_TYPE_LIMIT,
  limit=50,
)
```

```typescript
const allOrders: { orders: OrderResponseObject[] } = await client.private.getOrders(
  {
    market: Market.BTC_USD,
    status: OrderStatus.OPEN,
    side: OrderSide.SELL,
    type: OrderType.LIMIT,
    limit: 50,
  },
);
```

```json
{
  "orders": [
    {
      "id": "id",
      "clientId": "foo",
      "accountId": "afoo",
      "market": "BTC-USD",
      "side": "SELL",
      "price": "29000",
      "triggerPrice": null,
      "trailingPercent": null,
      "size": "0.500",
      "remainingSize": "0.500",
      "type": "LIMIT",
      "createdAt": "2021-01-04T23:44:59.690Z",
      "unfillableAt": null,
      "expiresAt": "2021-02-04T23:44:59.690Z",
      "status": "OPEN",
      "timeInForce": "GTT",
      "postOnly": false,
      "cancelReason": null
    },
    ...
  ]
}
```

### HTTP Request
`GET v3/orders`

Description: Get active (not filled or canceled) orders for a user by specified parameters.

### Request

Parameter        | Description
---------------- | -----------
market           | (Optional) Market of the order.
status           | (Optional) A list of statuses to filter by. Must be in the subset <code>PENDING|OPEN|UNTRIGGERED</code>.
side             | (Optional) Either <code>BUY</code> or <code>SELL</sell>.
type             | (Optional) The expected type of the order. This can be <code>LIMIT</code>, <code>STOP</code>, <code>TRAILING_STOP</code> or <code>TAKE_PROFIT</code>.
limit            | (Optional) The maximum number of orders that can be fetched via this request. Note, this cannot be greater than 100.
createdBeforeOrAt| (Optional) Set a date by which the orders had to be created.
returnLatestOrders| (Optional) Returns the most recently created orders instead of the oldest and the order is from most recent to least recent (up to `limit`).

### Response

Parameter        | Description
---------------- | -----------
orders           | An array of orders. See order below.

### Order

Parameter        | Description
---------------- | -----------
id               | The unique id assigned by dYdX.
clientId         | The unique id assigned by the client.
accountId        | The id of the account.
market           | Market of the fill.
side             | Either <code>BUY</code> or <code>SELL</sell>.
price            | The price of the order. Must adhere to the market's tick size.
triggerPrice     | The trigger price of the order. Must adhere to the market's tick size.
trailingPercent  | Used for trailing stops. Percent drop from maximum price that will trigger the order.
size             | Total size (base currency) of the order
remainingSize    | Size of order not yet filled.
type             | The [type](#order-types) of the fill.
createdAt        | Timestamp when the fill was created.
unfillableAt     | Time order was either filled or canceled.
expiresAt        | Time order will expire.
status           | See order statuses below.
timeInForce      | One of <code>GTT</code> (Good til time), <code>FOK</code>(Fill or kill) or <code>IOC</code> (Immediate or cancel). This will default to <code>GTT</code>.
postOnly         | If the order will cancel if it would take the position of <code>TAKER</code>.
cancelReason     | See cancel reasons below.

### Order Statuses

Status           | Description
---------------- | -----------
PENDING          | Order has yet to be processed by the matching engine.
OPEN             | Order is active and on the orderbook. Could be partially filled.
FILLED           | Fully filled.
CANCELED         | Canceled, for one of the cancel reasons. Could be partially filled.
UNTRIGGERED      | Triggerable order that has not yet been triggered.

### Cancel Reasons

Reason           | Description
-------------------- | -----------
UNDERCOLLATERALIZED  | Order would have led to an undercollateralized state for the user.
EXPIRED              | Order expired.
USER_CANCELED        | Order was canceled by the user.
SELF_TRADE           | Order would have resulted in a self trade for the user.
FAILED               | An internal issue caused the order to be canceled.
COULD_NOT_FILL       | A FOK or IOC order could not be fully filled.
POST_ONLY_WOULD_CROSS| A post-only order would cross the orderbook.

## Get Active Orders
> Get Active Orders

```python
from dydx3.constants import MARKET_BTC_USD
from dydx3.constants import ORDER_SIDE_SELL

market_side_orders = client.private.get_active_orders(
  market=MARKET_BTC_USD,
  side=ORDER_SIDE_SELL,
)
```

```typescript
const marketSideOrders: {
  orders: ActiveOrderResponseObject[],
} = await client.private.getActiveOrders(
  {
    market: Market.BTC_USD,
    side: OrderSide.SELL,
  },
);
```

```json
{
  "orders": [
    {
      "id": "id",
      "accountId": "afoo",
      "market": "BTC-USD",
      "side": "SELL",
      "price": "29000",
      "remainingSize": "0.500",
    },
    ...
  ]
}
```

### HTTP Request
`GET v3/active-orders`

Description: Get active (not filled or canceled) orders for a user by specified parameters.

<aside class="success">
Note that rate-limiting is more generous for this endpoint than GET v3/orders. When including side, the rate-limiting becomes even more permissive and when id is included as well as side, the rate-limiting is its most permissive.
</aside>

### Request

Parameter        | Description
---------------- | -----------
market           | Market of the order.
side             | (Optional) Either <code>BUY</code> or <code>SELL</sell>. This parameter is required if `id` is included.
id               | (Optional) The unique id assigned by dYdX. Note, if id is not found, will return a 400.


### Response

Parameter        | Description
---------------- | -----------
orders           | An array of activeOrders. See activeOrder below.

### ActiveOrder

Parameter        | Description
---------------- | -----------
id               | The unique id assigned by dYdX.
accountId        | The id of the account.
market           | Market of the fill.
side             | Either <code>BUY</code> or <code>SELL</sell>.
price            | The price of the order. Must adhere to the market's tick size.
remainingSize    | Size of order not yet filled.

## Get Order By Id
>Get Order By Id

```python
order = client.private.get_order_by_id('foo')
```

```typescript
const orderResponse: { order: OrderResponseObject } = await client.private.getOrderById('foo');
```

```json
{
  "order": {
    "id": "foo",
    "clientId": "foo",
    "accountId": "afoo",
    "market": "BTC-USD",
    "side": "SELL",
    "price": "29000",
    "triggerPrice": null,
    "trailingPercent": null,
    "size": "0.500",
    "remainingSize": "0.500",
    "type": "LIMIT",
    "createdAt": "2021-01-04T23:44:59.690Z",
    "unfillableAt": null,
    "expiresAt": "2021-02-04T23:44:59.690Z",
    "status": "OPEN",
    "timeInForce": "GTT",
    "postOnly": false,
    "cancelReason": null
  }
}
```

### HTTP Request
`GET v3/orders/:id`

Description: Get an order by <code>id</code> from the active orderbook and order history.

### Request

Parameter    | Description
------------ | -----------
id           | Unique id of the order

### Response

Parameter    | Description
------------ | -----------
order        | See [order](#get-orders).

## Get Order by ClientId
>Get Order By ClientId

```python
order = client.private.get_order_by_client_id('clientId')
```

```typescript
const allOrders: { order: OrderResponseObject } = await client.private.getOrderByClientId('clientId');
```

```json
{
  "order": {
    "id": "foo",
    "clientId": "foo",
    "accountId": "afoo",
    "market": "BTC-USD",
    "side": "SELL",
    "price": "29000",
    "triggerPrice": null,
    "trailingPercent": null,
    "size": "0.500",
    "remainingSize": "0.500",
    "type": "LIMIT",
    "createdAt": "2021-01-04T23:44:59.690Z",
    "unfillableAt": null,
    "expiresAt": "2021-02-04T23:44:59.690Z",
    "status": "OPEN",
    "timeInForce": "GTT",
    "postOnly": false,
    "cancelReason": null
  }
}
```

### HTTP Request
`GET v3/orders/client/:id`

Description: Get an order by <code>clientId</code> from the active orderbook and order history. Only the latest 1 hour of orders can be fetched from this endpoint.

### Request

Parameter    | Description
------------ | -----------
id           | Unique clientId of the order

### Response

Parameter    | Description
------------ | -----------
order        | See [order](#get-orders).

## Get Fills
>Get Fills

```python
from dydx3.constants import MARKET_BTC_USD

all_fills = client.private.get_fills(
  market=MARKET_BTC_USD,
)
```

```typescript
const allFills: { fills: FillResponseObject[] } = await client.private.getFills(
  {
    market: Market.BTC_USD,
  },
);
```

```json
{
  "fills": [
    {
      "id": "foo",
      "side": "BUY",
      "liquidity": "TAKER",
      "type": "LIMIT",
      "market": "BTC-USD",
      "orderId": "id",
      "price": "29000",
      "size": "0.001",
      "fee": "100",
      "createdAt": "2021-01-05T16:33:43.163Z"
    },
    ...
  ]
}
```

### HTTP Request
`GET v3/fills`

Description: Get Fills for a user by specified parameters.

### Request

Parameter        | Description
---------------- | -----------
market           | (Optional) Market of the fills.
orderId          | (Optional) Unique order id. Will only fetch a single order.
limit            | (Optional) The maximum number of fills that can be fetched via this request. Note, this cannot be greater than 100.
createdBeforeOrAt| (Optional) Set a date by which the fills had to be created.

### Response

Parameter        | Description
---------------- | -----------
fills            | Array of fills. See below for an individual example.

### Fill

Parameter        | Description
---------------- | -----------
id               | The unique id assigned by dYdX.
side             | Either <code>BUY</code> or <code>SELL</sell>.
liquidity        | Either <code>MAKER</code> or <code>TAKER</sell>.
type             | The [type](#order-types) of the fill.
market           | Market of the fill.
orderId          | Id of the order which caused this fill. null if type is <code>LIQUIDATED</code> or <code>LIQUIDATION`</code>.
price            | The price the fill occurred at (in quote / base currency).
size             | Size that was filled (in base currency).
fee              | Fee that was charged (in quote currency).
createdAt        | Timestamp when the fill was created.

## Get Funding Payments
> Get Funding Payments

```python
from dydx3.constants import MARKET_BTC_USD

funding_payments = client.private.get_funding_payments(
  market=MARKET_BTC_USD,
  limit=75,
)
```

```typescript
const fundingPayments: { fundingPayments: FundingResponseObject } = await client.private.getFundingPayments(
  {
    market: Market.BTC_USD,
    limit: 75,
  },
);
```

```json
{
  "fundingPayments": [{
    "market": "BTC-USD",
    "payment": "10000",
    "rate": "0.0000125000",
    "positionSize": "500",
    "price": "90",
    "effectiveAt": "2021-01-04T23:44:59.690Z"
  }]
}
```

### HTTP Request
`GET v3/funding`

Description: Get Funding Payments made to an account.

### Request

Parameter          | Description
-------------------| -----------
market             | (Optional) Market of the funding payments.
limit              | (Optional) The maximum number of funding payments that can be fetched via this request. Note, this cannot be greater than 100.
effectiveBeforeOrAt| (Optional) Set a date by which the funding payments had to be created.

### Response

Parameter          | Description
-------------------| -----------
market             | Market corresponding to the funding payment.
payment            | Change in the `quoteBalance` of the account. Positive if the user received funding and negative if the user paid funding.
rate               | Funding rate at the time of this payment (as a 1-hour rate).
positionSize       | User's position size at the time of this funding payment. positive if long, negative if short.
price              | Oracle price used to calculate this funding payment.
effectiveAt        | Time of this funding payment.

## Get Historical PNL Ticks
> Get Historical PNL Ticks

```python
historical_pnl = client.private.get_historical_pnl(
  created_before_or_at='2021-04-09T22:02:46+0000',
)
```

```typescript
const historicalPnlTicks: {
  historicalPnl: HistoricalPnlResponseObject[],
} = await client.private.getHistoricalPnl(
  {
    createdBeforeOrAt: '2021-04-09T22:02:46+0000',
  },
);
```

```json
{
  "historicalPnl": [{
    "equity": "0.0000",
    "totalPnl": "0.0000",
    "createdAt": "2021-04-09T21:08:34.984Z",
    "netTransfers": "0.0000",
    "accountId": "49979004..."
  }]
}
```

### HTTP Request
`GET v3/historical-pnl`

Description: Get Historical PNL for an account during an interval.

<aside class="warning">
The max interval of ticks is 1 month. If a single time value is provided, the other value will default to one month away from said value (i.e. set createdBeforeOrAt and createdOnOrAfter will be a month before). If neither value is set, the interval will be the current past roughly 30 days.
</aside>

### Request

Parameter          | Description
-------------------| -----------
createdBeforeOrAt  | (Optional) Used for setting a ending bounds on the ticks.
createdOnOrAfter   | (Optional) Used for setting a starting bounds on the ticks.

### Response

Parameter          | Description
-------------------| -----------
historicalPnl      | Array of HistoricalAggregatedPnl. See "HistoricalAggregatedPnl" below.

### HistoricalAggregatedPnl
Parameter          | Description
-------------------| -----------
equity             | The total account equity.
totalPnl           | The total PNL for the account since inception.
createdAt          | When the tick was recorded.
netTransfers       | The value into or out of the account of transfers since the last interval.
accountId          | Account the tick is for.

## Get Trading Rewards
> Get Trading Rewards

```python
rewards = client.private.get_trading_rewards(
  epoch=0,
)
```

```typescript
const rewards: {
  tradingRewards: TradingRewardsResponseObject,
} = await client.private.getTradingRewards(
  {
    epoch: 5,
  },
);
```

```json
{
  "epoch": 5,
  "epochStart": "2021-12-21T15:00:00.000Z",
  "epochEnd": "2022-01-18T15:00:00.000Z",
  "fees": {
    "feesPaid": "0.1",
    "totalFeesPaid": "1"
  },
  "openInterest": {
    "averageOpenInterest": "10",
    "totalAverageOpenInterest": "100"
  },
  "stakedDYDX": {
    "primaryStakedDYDX": "0",
    "averageStakedDYDX": "200",
    "averageStakedDYDXWithFloor": "200",
    "totalAverageStakedDYDX": "2000"
  },
  "weight": {
    "weight": "0.1",
    "totalWeight": "1"
  },
  "totalRewards": "383561.6",
  "estimatedRewards": "3835616"
}
```

### HTTP Request
`GET v3/rewards/weight`

Description: Get the rewards weight of a given epoch.

### Request

Parameter          | Description
-------------------| -----------
epoch              | (Optional) Epoch number to request rewards data for. Defaults to current epoch.
secondaryAddress   | (Optional) Get rewards for a linked, `SECONDARY` address.

### Response

Parameter          | Description
-------------------| -----------
epoch              | ID of the epoch.
epochStart         | Time when the epoch starts.
epochEnd           | Time when the epoch ends.
fees               | See "Fees" below.
openInterest       | See "OpenInterest" below.
weight             | See "Weight" below.
stakedDYDX         | See "StakedDYDX" below.
totalRewards       | The total number of tokens that will be given out at the end of the epoch.
estimatedRewards   | The user's estimated number of dYdX tokens as rewards.

### Weight
Parameter          | Description
-------------------| -----------
weight             | The user's current weight score for this epoch.
totalWeight        | The sum of the weight score of all users for this epoch.

### Fees
Parameter          | Description
-------------------| -----------
feesPaid           | The USD amount of fees paid by the user in the epoch.
totalFeesPaid      | The total USD amount of fees paid by all users in the epoch.

### OpenInterest
Parameter                | Description
-------------------------| -----------
averageOpenInterest	     | The average open interest for the user.
totalAverageOpenInterest | The total average open interest for all users.

### StakedDYDX
Parameter                  |Description
---------------------------|-----------
primaryStakedDYDX          | The average staked DYDX of the primary user if own user `linkType = SECONDARY` or `secondaryAddress` is included. `'0'` for epochs 0-4 (old rewards formula). `null` otherwise.
averageStakedDYDX          | The average staked DYDX for the user. This value is `'0'` for epochs 0-4 (old rewards formula does not take into account stakedDYDX).
averageStakedDYDXWithFloor | The average staked DYDX for the user, taking into account both `primaryStakedDYDX` and the [rewards formula's](https://commonwealth.im/dydx/proposal/discussion/2940-drc-update-trading-liquidity-provider-rewards-formulas-to-include-holding-of-stkdydx) floor stakedDYDX value. This value is `'0'` for epochs 0-4 (old rewards formula does not take into account stakedDYDX).
totalAverageStakedDYDX     | The total average staked DYDX for all users. This value is `'0'` for epochs 0-4 (old rewards formula does not take into account stakedDYDX).

## Get Liquidity Provider Rewards
> Get Liquidity Provider Rewards

<aside class="warning">
This API is only supported for epochs 13+. For previous epochs, please use the `Get Liquidity Rewards` endpoint.
</aside>

```python
rewards = client.private.get_liquidity_provider_rewards_v2(
  epoch=13,
)
```

```typescript
const rewards: {
  liquidityRewards: LiquidityProviderRewardsV2ResponseObject,
} = await client.private.getLiquidityProviderRewardsV2(
  {
    epoch: 13,
  },
);
```

```json
{
  "epoch": 13,
  "epochStart": "2021-8-02T15:00:00.000Z",
  "epochEnd": "2022-08-30T15:00:00.000Z",
  "markets": {
    "BTC-USD": {
      "market": "BTC-USD",
      "depthSpreadScore": "0.5",
      "uptime": "500",
      "linkedUptime": "7500",
      "maxUptime": "10000",
      "score": "0.00098821176880261854125",
      "totalScore": "1",
      "makerVolume": "10000",
      "totalMakerVolume": "100000",
      "totalRewards": "230137",
      "estimatedRewards": "227.42409183692822322765125",
      "secondaryAllocation": "0"
    }
    ...
  },
  "stakedDYDX": {
    "averageStakedDYDX": "1000",
    "totalAverageStakedDYDX": "10000"
  },
  "linkedAddressRewards": {
    "0x0913017c740260fea4b2c62828a4008ca8b0d6e4": {
      "markets": {
        "BTC-USD": {
          "market": "BTC-USD",
          "depthSpreadScore": "0.5",
          "uptime": "500",
          "linkedUptime": "7500",
          "maxUptime": "10000",
          "score": "0.00098821176880261854125",
          "totalScore": "1",
          "makerVolume": "10000",
          "totalMakerVolume": "100000",
          "totalRewards": "230137",
          "estimatedRewards": "227.42409183692822322765125",
          "secondaryAllocation": "0.5"
        }
        ...
      },
      "averageStakedDYDX": "750"
    }
  }
}
```

### HTTP Request
`GET v3/rewards/liquidity-provider`

Description: Get the liquidity provider rewards of a given epoch (epochs 13+).

### Request

Parameter          | Description
-------------------| -----------
epoch              | (Optional) Epoch number to request rewards data for. Defaults to current epoch.

### Response

Parameter            | Description
---------------------| -----------
epoch                | ID of the epoch.
epochStart           | Time when the epoch starts.
epochEnd             | Time when the epoch ends.
markets              | Map of market name to liquidity rewards for that market. See "LiquidityRewards" below.
stakedDYDX           | See "StakedDYDX" below.
linkedAddressRewards | For a `PRIMARY` address, map of linked address to rewards data for that address. Includes the `PRIMARY` address. See "PerAddressRewards" below.

### LiquidityRewards
Parameter           | Description
--------------------| -----------
market              | The market for which the rewards are for.
depthSpreadScore    | The user's depth and spread score for this market.
uptime              | The ratio of uptime (non-zero scores) that the user has for this market.
linkedUptime        | For a `SECONDARY` address, the max uptime of linked addresses, which will be used in rewards calculation. `0` otherwise.
maxUptime           | The number of samples taken for this market.
score               | The user's total score for this market.
totalScore          | The total score of all liquidity providers who are eligible for liquidity rewards.
makerVolume         | The maker volume for the user.
totalMakerVolume    | The total maker volume for all liquidity providers.
estimatedRewards    | The user's estimated number of dYdX tokens as rewards for this market. For a `SECONDARY` address, this field is the amount of rewards contributed to the `PRIMARY` address (`SECONDARY` addresses do not receive rewards).
totalRewards        | The total number of tokens that will be given out at the end of the epoch for this market.
secondaryAllocation | For a `SECONDARY` address, the proportion (0 to 1) of the `PRIMARY` address rewards that are based on this address contribution. `0` otherwise.

### StakedDYDX
Parameter              | Description
-----------------------| -----------
averageStakedDYDX      | The average staked DYDX for the user. For a `PRIMARY` address, this is the aggregate `averageStakedDYDX` across all linked addresses.
totalAverageStakedDYDX | The total average staked DYDX for all eligible users.

### PerAddressRewards
Parameter              | Description
-----------------------| -----------
markets                | Map of market name to liquidity rewards for that market for the respective address. See "LiquidityRewards" above.
averageStakedDYDX      | The average staked DYDX for the respective address.

## Get Liquidity Rewards (Deprecated)
> Get Liquidity Rewards

<aside class="warning">
This API is now deprecated. Please use it to fetch rewards for only epoch 0-12. For future epochs, please use the `Get Liquidity Provider Rewards` endpoint.
</aside>

```python
rewards = client.private.get_liquidity_provider_rewards(
  epoch=0,
)
```

```typescript
const rewards: {
  liquidityRewards: LiquidityProviderRewardsResponseObject,
} = await client.private.getLiquidityProviderRewards(
  {
    epoch: 5,
  },
);
```

```json
{
  "epoch": 5,
  "epochStart": "2021-12-21T15:00:00.000Z",
  "epochEnd": "2022-01-18T15:00:00.000Z",
  "markets": {
    "BTC-USD": {
      "market": "BTC-USD",
      "uptime": "0.5",
      "score": "0.00098821176880261854125",
      "totalScore": "1",
      "totalRewards": "230137",
      "estimatedRewards": "227.42409183692822322765125",
    }
    ...
  },
  "stakedDYDX": {
    "primaryStakedDYDX": "0",
    "averageStakedDYDX": "1000",
    "totalAverageStakedDYDX": "10000"
  }
}
```

### HTTP Request
`GET v3/rewards/liquidity`

Description: Get the liquidity rewards of a given epoch.

### Request

Parameter          | Description
-------------------| -----------
epoch              | (Optional) Epoch number to request rewards data for. Defaults to current epoch.
secondaryAddress   | (Optional) Get rewards for a linked, `SECONDARY` address.

### Response

Parameter          | Description
-------------------| -----------
epoch              | ID of the epoch.
epochStart         | Time when the epoch starts.
epochEnd           | Time when the epoch ends.
markets            | Map of market name to rewards for that market. See "LiquidityRewards" below.
stakedDYDX         | See "StakedDYDX" below.

### LiquidityRewards
Parameter          | Description
-------------------| -----------
market             | The market for which the rewards are for.
depthSpreadScore   | The user's depth and spread score for this market.
uptime             | The ratio of uptime (non-zero scores) that the user has for this market.
maxUptime          | The number of samples taken for this market.
score              | The user's total score for this market.
totalScore         | The total score of all liquidity providers who are eligible for liquidity rewards.
makerVolume        | The maker volume for the user. `0` for epochs 0-9 (old rewards formulas).
totalMakerVolume   | The total maker volume for all liquidity providers. `0` for epochs 0-4 (old rewards formula).
totalRewards       | The total number of tokens that will be given out at the end of the epoch for this market.
estimatedRewards   | The user's estimated number of dYdX tokens as rewards for this market.

### StakedDYDX
Parameter              | Description
-----------------------| -----------
primaryStakedDYDX      | The average staked DYDX of the primary user if own user `linkType = SECONDARY` or if `secondaryAddress` is included. `'0'` for epochs 0-4 (old rewards formula). `null` otherwise.
averageStakedDYDX      | The average staked DYDX for the user. This value is `'0'` for epochs 0-4 (old rewards formula does not take into account stakedDYDX).
totalAverageStakedDYDX | The total average staked DYDX for all eligible users. This value is `'0'` for epochs 0-4 (old rewards formula does not take into account stakedDYDX).

## Get Retroactive Mining Rewards
> Get Retroactive Mining Rewards

```python
rewards = client.private.get_retroactive_mining_rewards()
```

```typescript
const rewards: {
  retroactiveMiningRewards: RetroactiveMiningRewardsResponseObject,
} = await client.private.getRetroactiveMiningRewards();
```

```json
{
  "epoch": 0,
  "epochStart": "2021-08-03T15:00:00.000Z",
  "epochEnd": "2021-08-31T15:00:00.000Z",
  "retroactiveMining": {
    "allocation": "1000",
    "targetVolume": "500",
    "volume": "100"
  },
  "estimatedRewards": "500"
}
```

### HTTP Request
`GET v3/rewards/retroactive-mining`

Description: Get the retroactive mining rewards of a given epoch.

### Response

Parameter          | Description
-------------------| -----------
epoch              | Will always be '0'.
epochStart         | Time when the epoch starts.
epochEnd           | Time when the epoch ends.
retroactiveMining  | See "RetroactiveMiningRewards" below.
estimatedRewards   | The user's estimated number of dYdX tokens as rewards.

### RetroactiveMiningRewards
Parameter          | Description
-------------------| -----------
allocation         | The number of allocated dYdX tokens for the user.
targetVolume       | The user's required trade volume (in USD) to be able to claim the allocation.
volume             | The user's current total trade volume (in USD) in the epoch.

## Send Verification Email
> Send a verification email

```python
client.private.send_verification_email()
```

```typescript
await client.private.sendVerificationEmail();
```

```json
{}
```

### HTTP Request
`PUT v3/emails/send-verification-email`

Description: Send an email to the email address associated with the user, requesting that they click on a link to verify their email address.

### Response

On success, returns a `204` response with an empty body. Responds with a `400` error if no email address is on file for the user, or their email address has already been verified.

### Setting Notification Status

In addition to verifying an email, notifications must be set in `user.userData` to start receiving emails per category.

> Example userData:

```
user.userData = {
  notifications: {
    deposit: {
      email: true
    },
    trades: {
      email: true
    }
  }
}
```

## Request Testnet Tokens
> Request Testnet Tokens

```python
transfer = client.private.request_testnet_tokens()
```

```typescript
const transfer: { transfer: TransferResponseObject } = await client.private.requestTestnetTokens();
```

```json
{
    "transfer": {
        "id": "e5ed0207-27fe-5cfa-a74e-b3908a113dca",
        "type": "TRANSFER_OUT",
        "debitAsset": "USDC",
        "creditAsset": "USDC",
        "debitAmount": "10000",
        "creditAmount": "0",
        "transactionHash": null,
        "status": "PENDING",
        "createdAt": "2021-11-09T01:29:59.960Z",
        "confirmedAt": null,
        "clientId": "521ba97550e9299",
        "fromAddress": null,
        "toAddress": null
    }
}
```

### HTTP Request
`POST v3/testnet/tokens`

Description: Requests tokens on dYdX's staging server.

<aside class="notice">
This endpoint is only enabled on Staging/Goerli, and will not work on Mainnet/Production.
</aside>

A fixed number of tokens will be transferred to the account. Please take note of [rate limits](#rate-limit-api).

<aside class="notice">
Accounts with high equity that request tokens will have their requests denied.
</aside>

### Response

Parameter         | Description
------------------| -----------
transfer          | See [Transfers](#get-transfers).

## Get Private Profile
Get private profile data for the user. This is a superset of the `/v3/profile/:publicId` endpoint.

```python
profile_private = client.private.get_profile()
```

```typescript
const profilePrivate: ProfilePrivateResponseObject = await client.private.getProfilePrivate();
```

```json
{
    "username": "foo",
    "ethereumAddress": "0x0913017c740260fea4b2c62828a4008ca8b0d6e4",
    "DYDXHoldings": "250",
    "stakedDYDXHoldings": "250",
    "hedgiesHeld": [111],
    "twitterHandle": "bar",
    "affiliateLinks": [{
        "link": "mrAffiliate",
        "discountRate": "0.95",
    }],
    "affiliateApplicationStatus": "APPROVED",
    "publicId": "ABCDEFGH",
    "tradingLeagues": {
        "currentLeague": "SILVER",
        "currentLeagueRanking": 12,
    },
    "tradingPnls": {
        "absolutePnl30D": "324",
        "percentPnl30D": "25",
        "volume30D": "4000",
    },
    "tradingRewards": {
        "curEpoch": "8",
        "curEpochEstimatedRewards": 280,
        "prevEpochEstimatedRewards": 125,
    },
    "affiliateStatistics": {
        "currentEpoch": {
            "usersReferred": "12",
            "revenue": "12.50",
            "revenueShareRate": "0.24",
        },
        "previousEpochs": {
            "usersReferred": "20",
            "revenue": "1427.30",
        },
        "lastPaidEpoch": "9",
    }
}
```

### HTTP Request
`GET v3/profile/private`

Description: Get private profile data for the user.

### Response

Parameter                 | Description
--------------------------| -----------
username                  | Publically-displayed username.
publicId                  | User's public id used in the public profile endpoint
ethereumAddress           | User's associated ethereum address.
DYDXHoldings              | The user's DYDX token holdings. `null` if not sharing ethereum address.
stakedDYDXHoldings        | The user's stkDYDX token holdings. `null` if not sharing ethereum address.
hedgiesHeld               | Indices of all Hedgies held.
twitterHandle             | The username that appears at the end of a unique Twitter url.
affiliateLinks            | The affiliate links that the user can share and earn revenue on. [] if the user is not an affiliate. See "AffiliateLinkData" below.
affiliateApplicationStatus| The status of the affiliate application, can be `APPROVED`, `PENDING`, `REJECTED`, and `REJECTED_AND_BANNED`. `null` if no affiliate application had been submitted.
tradingLeagues            | See "TradingLeagues" below.
tradingPnls               | See "TradingPnls" below.
tradingRewards            | See "TradingRewards" below.
affiliateStatistics       | See "AffiliateStatistics" below.

### AffiliateLinkData

Parameter           | Description
--------------------| -----------
link                | The affiliate link. Ex: `mrAffiliate` in affiliate link `trade.dydx.exchange/r/mrAffiliate`.
discountRate        | The discount rate used to calculate the referred user's fee. Ex: `0.95` would mean that users get a 5% discount to their fees.

### TradingLeagues

Parameter           | Description
--------------------| -----------
currentLeague       | `null, "BRONZE", "SILVER", "GOLD", "PLATINUM", or "DIAMOND"`.
currentLeagueRanking| `null`, or positive integer ranking.

### TradingPnls

Parameter           | Description
--------------------| -----------
absolutePnl30D      | `null`, or user's 30 day absolute pnl (based on leaderboard formula).
percentPnl30D       | `null`, or user's 30 day percent pnl (based on leaderboard formula).
volume30D           | The sum of a user's 30 day maker and taker trading volume.

### TradingRewards

Parameter                | Description
-------------------------| -----------
curEpoch                 | Current epoch number.
curEpochEstimatedRewards | The user's estimated number of dYdX tokens as rewards for the current epoch.
prevEpochEstimatedRewards| The user's estimated number of dYdX tokens as rewards for the previous epoch.

### AffiliateStatistics

Parameter                | Description
-------------------------| -----------
currentEpoch             | See "CurrentEpochAffiliateStatistics" below.
previousEpochs           | See "PreviousEpochAffiliateStatistics" below.
lastEpochPaid            | The last epoch that has been paid out to affiliates.

### CurrentEpochAffiliateStatistics

Parameter                | Description
-------------------------| -----------
usersReferred            | Total number of users referred by this affiliate in this epoch.
revenue                  | Expected current affiliate payout in this epoch.
revenueShareRate         | Current revenue share rate for the user depending on their $stkDYDX and if manual override is enabled for the user. Will be a number between 0 and 1 inclusive, 0.1 would indicate that the affiliate will receive 10% of all net revenue generated by their referred users.

### PreviousEpochsAffiliateStatistics

Parameter                | Description
-------------------------| -----------
usersReferred            | Total number of users referred by this affiliate in all previous epochs.
revenue                  | Total amount of revenue this user has earned in all previous epochs. -->
