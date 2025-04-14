import { defineConfig } from 'vocs'

export default defineConfig({
    title: 'dYdX Documentation',
    basePath: '/dydx-documentation',
    sidebar: [
        {
            text: 'Getting Started',
            link: '/client',
            items: [
                {
                    text: 'Quick start with Python 🚧',
                    link: '/client/quick-start-py',
                },
                {
                    text: 'Quick start with Rust 🚧',
                    link: '/client/quick-start-rs',
                },
                {
                    text: 'Quick start with TypeScript 🚧',
                    link: '/client/quick-start-ts',
                },
                {
                    text: 'Getting the mnemonic phrase',
                    link: '/todo',
                },
            ],
        },
        {
            text: 'Interaction',
            link: '/todo',
            items: [
                {
                    text: 'Wallet Setup',
                    link: '/todo',
                },
                {
                    text: 'Available clients',
                    link: '/todo',
                },
                {
                    text: 'Trading',
                    link: '/todo',
                    items: [
                        {
                            text: 'Placing an order',
                            link: '/todo',
                        },
                        {
                            text: 'Cancelling an order',
                            link: '/todo',
                        },
                    ],
                },
                {
                    text: 'Asset management',
                    link: '/todo',
                },
                {
                    text: 'Data',
                    link: '/todo',
                    items: [
                        {
                            text: 'Account balance',
                            link: '/todo',
                        },
                        {
                            text: 'List orders',
                            link: '/todo',
                        },
                        {
                            text: 'List positions',
                            link: '/todo',
                        },
                        {
                            text: 'List fills',
                            link: '/todo',
                        },
                        {
                            text: 'List markets',
                            link: '/todo',
                        },
                        {
                            text: 'Block height',
                            link: '/todo',
                        },
                        {
                            text: 'Trading rewards',
                            link: '/todo',
                        },
                        {
                            text: 'Fee tiers',
                            link: '/todo',
                        },
                        {
                            text: 'Reward parameters',
                            link: '/todo',
                        },
                        {
                            text: 'Watch an Orderbook',
                            link: '/todo',
                        },
                    ],
                },
                {
                    text: 'MegaVault',
                    link: '/todo',
                    items: [
                        {
                            text: 'Deposit',
                            link: '/todo',
                        },
                        {
                            text: 'Withdraw',
                            link: '/todo',
                        },
                    ],
                },
                {
                    text: 'Permissioned Keys',
                    link: '/todo',
                    items: [
                        {
                            text: 'Creating an authenticator',
                            link: '/todo',
                        },
                        {
                            text: 'Add authenticator',
                            link: '/todo',
                        },
                        {
                            text: 'Remove authenticator',
                            link: '/todo',
                        },
                        {
                            text: 'Permissioned trading',
                            link: '/todo',
                        },
                    ],
                },
                {
                    text: 'Noble client',
                    link: '/todo',
                },
                {
                    text: 'Faucet client',
                    link: '/todo',
                },
                {
                    text: '',
                    link: '/todo',
                    items: [
                        {
                            text: '',
                            link: '/todo',
                        },
                    ],
                },





                {
                    text: '',
                    link: '/todo',
                },
            ],
        },
        {
            text: 'Architecture',
            link: '/todo',
            items: [
                {
                    text: 'Structure',
                    link: '/todo',
                    items: [
                        {
                            text: 'Validators (aka Nodes)',
                            link: '/todo',
                        },
                        {
                            text: 'Indexer',
                            link: '/todo',
                        },
                        {
                            text: 'Networks',
                            link: '/todo',
                        },
                    ],
                },
                {
                    text: 'Trading / Perpetual Contracts',
                    link: '/todo',
                    items: [
                        {
                            text: 'Accounts and Subaccounts',
                            link: '/todo',
                        },
                        {
                            text: 'Assets and Perpetuals',
                            link: '/todo',
                        },
                        {
                            text: 'Orders',
                            link: '/todo',
                        },
                        {
                            text: 'Margin',
                            link: '/todo',
                        },
                        {
                            text: 'Funding',
                            link: '/todo',
                        },
                        {
                            text: 'Price data',
                            link: '/todo',
                        },
                        {
                            text: 'Permissioned keys / Authenticators',
                            link: '/todo',
                        },
                        {
                            text: 'MegaVault',
                            link: '/todo',
                        },
                        {
                            text: 'Markets',
                            link: '/todo',
                        },
                    ],
                },
            ],
        },
        /*
        {
            text: 'Full API',
            link: '/todo',
            items: [
                {
                    text: 'HTTP API',
                    link: '/todo',
                },
                {
                    text: 'WebSockets',
                    link: '/todo',
                },
                {
                    text: 'gRPC',
                    link: '/todo',
                },
            ],
        },
        */
        {
            text: 'Full API',
            link: '/api',
            items: [
                {
                    text: 'Node API',
                    link: '/node-client',
                },
                {
                    text: 'Indexer API',
                    link: '/indexer-client',
                },
            ],
        },
        {
            text: 'Policies',
            link: '/todo',
            items: [
                {
                    text: 'Security',
                    link: '/todo',
                },
                {
                    text: 'Terms of Service and Privacy',
                    link: '/todo',
                },
            ],
        },
        /*
        {
            text: 'Setup',
            link: '/setup',
            items: [
                {
                    text: 'Endpoints',
                    link: '/endpoints',
                },
                {
                    text: 'Wallet Setup',
                    link: '/wallet-setup',
                },
                {
                    text: 'Clients',
                    link: '/clients',
                },
            ]
        },
        {
            text: 'API Map',
            link: '/api-map',
        },
        {
            text: 'Node Client',
            link: '/node-client/intro',
            items: [
            ],
        },
        {
            text: 'Trading',
            link: '/api',
            items: [
                {
                    text: 'Order Parameters 🚧',
                    link: '/api/order_parameters',
                },
                {
                    text: 'Placing An Order 🚧',
                    link: '/api/place_order',
                },
                {
                    text: 'Cancelling An Order 🚧',
                    link: '/api/cancel_order',
                },
            ]
        },
        */
    ],
})

/*
Clients +
    JavaScript / TypeScript +
    Python +
    Rust +
    Getting the mnemonic phrase

API: functional
    Wallet setup
    Available clients
    Trading
        Placing an order
        Cancelling an order
    Asset management
    Data
        Account balance
        List orders
        List positions
        List fills
        List markets
        Block height
        Trading rewards
        Fee tiers
        Reward parameters
        Create orderbook?
    MegaVault
        Deposit
        Withdraw
    Permissioned Keys
        Creating an authenticator
        Add authenticator
        Remove authenticator
        Permissioned trading
    Noble client
    Faucet client

Architecture
    Structure
        Validators (aka Nodes)
        Indexer
        Networks
    Trading / Perpetual Contracts
        Accounts and Subaccounts
        Assets and Perpetuals
        Orders
        Margin
        Funding
        Price data
        Permissioned keys / Authenticators
        MegaVault
        Markets
API: doc all methods
    HTTP API
    WebSockets
    gRPC
Policies
    Security
    Terms of Service and Privacy
*/


/*
Onboarding
Configuring a Network
Initialize Client
Setup Mnemonic
Transfer
Deposit
Withdraw
Simulate a Transaction
Sign a Transaction
Send a Transaction
Selecting desired gas token
Get Account Balances
Placing an Order
Replacing an Order
Cancelling an Order
*/

/*
GetAddress
GetSubaccount
GetParentSubaccount
GetAssetPositions
GetAssetPositionsForParentSubaccount
GetCandles
Screen
GetFills
GetFillsForParentSubaccount
GetHeight
GetTradingRewards
GetHistoricalFunding
GetHistoricalPnl
GetHistoricalPnlForParentSubaccount
GetAggregations
GetPerpetualMarket
ListOrders
ListOrdersForParentSubaccount
GetOrder
ListPerpetualMarkets
ListPositions
ListPositionsForParentSubaccount
Get
GetTime
GetTrades
GetTransfers
GetTransfersForParentSubacc
*/
