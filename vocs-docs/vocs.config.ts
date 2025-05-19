import { defineConfig } from 'vocs'

export default defineConfig({
    title: 'dYdX Documentation',
    // basePath: '/dydx-documentation',
    basePath: '/',
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
            ],
        },
        {
            text: 'Guide',
            link: '/interaction',
            items: [
                {
                    text: 'Preparing to Trade',
                    link: '/interaction/endpoints',
                },
                {
                    text: 'Wallet Setup',
                    link: '/interaction/wallet-setup',
                },
                {
                    text: 'Trading',
                    link: '/interaction/trading',
                },
                {
                    text: 'Asset management',
                    link: '/interaction/asset-management',
                },
                {
                    text: 'Data',
                    link: '/interaction/data',
                    collapsed: true,
                    items: [
                        {
                            text: 'Feeds',
                            link: '/interaction/data/feeds',
                        },
                        {
                            text: 'Watch orderbook',
                            link: '/interaction/data/watch-orderbook',
                        },
                    ],
                },
                {
                    text: 'MegaVault',
                    link: '/interaction/megavault',
                },
                {
                    text: 'Permissioned Keys',
                    link: '/interaction/permissioned-keys',
                },
            ],
        },
        {
            text: 'Advanced',
            collapsed: true,
            items: [
                {
                    text: 'Running Your Node',
                    items: [
                        {
                            text: 'Setup',
                            link: '/advanced/running-node/setup',
                        },
                        {
                            text: 'Optimize',
                            link: '/advanced/running-node/optimize',
                        },
                    ],
                },
                {
                    text: 'Node Streaming',
                    link: '/advanced/full-node-streaming',
                },
                {
                    text: 'Network Constants',
                    link: '/advanced/network-constants',
                },
                {
                    text: 'Resources',
                    link: '/advanced/resources',
                },
            ],
        },
        {
            text: 'Full API',
            link: '/api',
            items: [
                {
                    text: 'Node API',
                    link: '/node-client',
                    collapsed: false,
                    items: [
                        {
                            text: 'Public API',
                            link: '/node-client/public',
                        },
                        {
                            text: 'Private API',
                            link: '/node-client/private',
                        },
                    ],
                },
                {
                    text: 'Indexer API',
                    link: '/indexer-client',
                    collapsed: false,
                    items: [
                        {
                            text: 'HTTP API',
                            link: '/indexer-client/http',
                        },
                        {
                            text: 'WebSockets API',
                            link: '/indexer-client/websockets',
                        },
                    ],
                },
                {
                    text: 'Noble API',
                    link: '/noble-client',
                },
                {
                    text: 'Faucet API',
                    link: '/faucet-client',
                },
            ],
        },
        {
            text: 'Concepts',
            items: [
                {
                    text: 'Architecture',
                    collapsed: true,
                    items: [
                        {
                            text: 'Overview',
                            link: '/concepts/architecture/overview',
                        },
                        {
                            text: 'Indexer',
                            link: '/concepts/architecture/indexer',
                        },
                    ],
                },
                {
                    text: 'Trading',
                    collapsed: true,
                    items: [
                        {
                            text: 'Perpetuals and Assets',
                            link: '/concepts/trading/assets',
                        },
                        {
                            text: 'Orders',
                            link: '/concepts/trading/orders',
                        },
                        {
                            text: 'Accounts and Subaccounts',
                            link: '/concepts/trading/accounts',
                        },
                        {
                            text: 'Rewards, Fees and Parameters',
                            link: '/concepts/trading/rewards',
                        },
                        {
                            text: 'Margin',
                            link: '/concepts/trading/margin',
                        },
                        {
                            text: 'Funding',
                            link: '/concepts/trading/funding',
                        },
                        {
                            text: 'Price Data',
                            link: '/concepts/trading/oracle',
                        },
                        {
                            text: 'Permissioned Keys',
                            link: '/concepts/trading/authenticators',
                        },
                        {
                            text: 'MegaVault',
                            link: '/concepts/trading/megavault',
                        },
                        {
                            text: 'Isolated Markets',
                            link: '/concepts/trading/isolated-markets'
                        },
                        {
                            text: 'Other Limits',
                            link: '/concepts/trading/other-limits'
                        },
                        {
                            text: 'Withdrawal Rate Limits and Gating',
                            link: '/concepts/trading/withdrawal-rate-limits-and-gating'
                        },
                    ],
                },
                {
                    text: 'Node Deployment',
                    collapsed: true,
                    items: [
                        {
                            text: 'Hardware Requirements',
                            link: '/concepts/node-deployment/hardware-requirement'
                        },
                        {
                            text: 'Required Node Configs',
                            link: '/concepts/node-deployment/required-node-configs'
                        },
                        {
                            text: 'Set up a full node',
                            link: '/concepts/node-deployment/set-up-a-full-node'
                        },
                        {
                            text: 'Optimize Your Full Node',
                            link: '/concepts/node-deployment/optimize-your-full-node'
                        },
                        {
                            text: 'Running a Validator',
                            link: '/concepts/node-deployment/running-a-validator'
                        },
                        {
                            text: 'Snapshots',
                            link: '/concepts/node-deployment/snapshots'
                        },
                        {
                            text: 'Full Node Streaming',
                            link: '/concepts/node-deployment/full-node-streaming'
                        },
                        {
                            text: 'Upgrades',
                            collapsed: true,
                            items: [
                                {
                                    text: 'Types of Upgrades',
                                    link: '/concepts/node-deployment/upgrades/types-of-upgrades'
                                },
                                {
                                    text: 'Performing Upgrades',
                                    link: '/concepts/node-deployment/upgrades/performing-upgrades'
                                },
                                {
                                    text: 'Cosmovisor',
                                    link: '/concepts/node-deployment/upgrades/cosmovisor'
                                },
                                {
                                    text: 'Using Cosmovisor to Stage dYdX Chain binary upgrade',
                                    link: '/concepts/node-deployment/upgrades/using-cosmovisor'
                                },
                                {
                                    text: 'Upgrading Sidecar',
                                    link: '/concepts/node-deployment/upgrades/upgrading-sidecar'
                                }
                            ]
                        },
                        {
                            text: 'Peering with Gateway',
                            link: '/concepts/node-deployment/peering-with-gateway'
                        }
                    ]
                }
            ],
        },
        {
            text: 'Policies',
            items: [
                {
                    text: 'Security',
                    link: '/policies/security',
                },
                {
                    text: 'Terms of Service & Privacy',
                    link: '/policies/terms',
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
