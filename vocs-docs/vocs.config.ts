import { defineConfig } from 'vocs'

export default defineConfig({
    title: 'dYdX Documentation',
    basePath: '/',
    sidebar: [
        {
            text: 'Guide',
            collapsed: true,
            items: [
                {
                    text: 'Getting Started',
                    link: '/interaction/client',
                    collapsed: true,
                    items: [
                        {
                            text: 'Quick start with Python 🚧',
                            link: '/interaction/client/quick-start-py',
                        },
                        {
                            text: 'Quick start with Rust 🚧',
                            link: '/interaction/client/quick-start-rs',
                        },
                        {
                            text: 'Quick start with TypeScript 🚧',
                            link: '/interaction/client/quick-start-ts',
                        },
                    ],
                },
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
                    text: 'Asset Management',
                    link: '/interaction/asset-management',
                },
                {
                    text: 'Trading Data',
                    collapsed: true,
                    items: [
                        {
                            text: 'Market Data',
                            link: '/interaction/data',
                        },
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
                    text: 'Permissioned Keys',
                    link: '/interaction/permissioned-keys',
                },
                {
                    text: 'Deposits and Withdrawals',
                    link: '/interaction/deposits-and-withdrawals',
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
                            text: 'Hardware Requirements',
                            link: '/advanced/running-node/hardware-requirement'
                        },
                        {
                            text: 'Required Node Configs',
                            link: '/advanced/running-node/required-node-configs'
                        },
                        {
                            text: 'Setup',
                            link: '/advanced/running-node/setup',
                        },
                        {
                            text: 'Optimize',
                            link: '/advanced/running-node/optimize',
                        },
                        {
                            text: 'Running a Validator',
                            link: '/advanced/running-node/running-a-validator'
                        },
                        {
                            text: 'Snapshots',
                            link: '/advanced/running-node/snapshots'
                        },
                        {
                            text: 'Peering with Gateway',
                            link: '/advanced/running-node/peering-with-gateway'
                        },
                        {
                            text: 'Voting',
                            link: '/advanced/running-node/voting'
                        },
                    ],
                },
                {
                    text: 'Node Streaming',
                    link: '/advanced/full-node-streaming',
                    collapsed: true,
                    items: [
                        {
                            text: 'Example',
                            link: '/advanced/full-node-streaming/example'
                        }
                    ]
                },
                {
                    text: 'Upgrades',
                    collapsed: true,
                    items: [
                        {
                            text: 'Types of Upgrades',
                            link: '/advanced/upgrades/types-of-upgrades'
                        },
                        {
                            text: 'Performing Upgrades',
                            link: '/advanced/upgrades/performing-upgrades'
                        },
                        {
                            text: 'Cosmovisor',
                            link: '/advanced/upgrades/cosmovisor'
                        },
                        {
                            text: 'Using Cosmovisor to Stage dYdX Chain binary upgrade',
                            link: '/advanced/upgrades/using-cosmovisor'
                        },
                        {
                            text: 'Upgrading Sidecar',
                            link: '/advanced/upgrades/upgrading-sidecar'
                        }
                    ]
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
            text: 'API',
            collapsed: true,
            items: [
                {
                    text: 'Indexer API',
                    link: '/indexer-client',
                    collapsed: true,
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
                    text: 'Node API',
                    link: '/node-client',
                    collapsed: true,
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
                    text: 'Other API',
                    collapsed: true,
                    items: [
                         {
                            text: 'Noble API',
                            link: '/noble-client',
                        },
                        {
                            text: 'Faucet API',
                            link: '/faucet-client',
                        },
                    ]
                }
            ],
        },
        {
            text: 'Concepts',
            collapsed: true,
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
                    text: 'Orders',
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
                        {
                            text: 'Base Urls',
                            link: '/concepts/trading/base-urls'
                        },
                        {
                            text: 'Contract Loss Mechanism',
                            link: '/concepts/trading/contract-loss-mechanism'
                        },
                        {
                            text: 'Index Prices',
                            link: '/concepts/trading/index-prices'
                        },
                        {
                            text: 'Liquiditions',
                            link: '/concepts/trading/liquiditions'
                        },
                        {
                            text: 'Number Formats',
                            link: '/concepts/trading/number-formats'
                        },
                        {
                            text: 'Rate Limits',
                            link: '/concepts/trading/rate-limits'
                        },
                        {
                            text: 'Testnet',
                            link: '/concepts/trading/testnet'
                        }
                    ],
                },
                {
                    text: 'Advanced',
                    collapsed: true,
                    items: [
                        {
                            text: 'Running Your Node',
                            collapsed: true,
                            items: [
                                {
                                    text: 'Hardware Requirements',
                                    link: '/concepts/advanced/running-node/hardware-requirement'
                                },
                                {
                                    text: 'Required Node Configs',
                                    link: '/concepts/advanced/running-node/required-node-configs'
                                },
                                {
                                    text: 'Setup',
                                    link: '/concepts/advanced/running-node/setup',
                                },
                                {
                                    text: 'Optimize',
                                    link: '/concepts/advanced/running-node/optimize',
                                },
                                {
                                    text: 'Running a Validator',
                                    link: '/concepts/advanced/running-node/running-a-validator'
                                },
                                {
                                    text: 'Snapshots',
                                    link: '/concepts/advanced/running-node/snapshots'
                                },
                                {
                                    text: 'Peering with Gateway',
                                    link: '/concepts/advanced/running-node/peering-with-gateway'
                                },
                                {
                                    text: 'Voting',
                                    link: '/concepts/advanced/running-node/voting'
                                },
                            ],
                        },
                        {
                            text: 'Node Streaming',
                            link: '/concepts/advanced/full-node-streaming',
                        },
                        {
                            text: 'Upgrades',
                            collapsed: true,
                            items: [
                                {
                                    text: 'Types of Upgrades',
                                    link: '/concepts/advanced/upgrades/types-of-upgrades'
                                },
                                {
                                    text: 'Performing Upgrades',
                                    link: '/concepts/advanced/upgrades/performing-upgrades'
                                },
                                {
                                    text: 'Cosmovisor',
                                    link: '/concepts/advanced/upgrades/cosmovisor'
                                },
                                {
                                    text: 'Using Cosmovisor to Stage dYdX Chain binary upgrade',
                                    link: '/concepts/advanced/upgrades/using-cosmovisor'
                                },
                                {
                                    text: 'Upgrading Sidecar',
                                    link: '/concepts/advanced/upgrades/upgrading-sidecar'
                                }
                            ]
                        },
                        {
                            text: 'Network Constants',
                            link: '/concepts/advanced/network-constants',
                        },
                        {
                            text: 'Resources',
                            link: '/concepts/advanced/resources',
                        },
                    ],
                },
            ],
        },
        {
            text: 'Policies',
            collapsed: true,
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
    ],
})
