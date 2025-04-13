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
          text: 'Quick start with Rust 🚧',
          link: '/client/quick-start-rs',
        },
        {
          text: 'Quick start with TypeScript 🕙',
          link: '/client/quick-start-ts',
        },
        {
          text: 'Quick start with Python 🚧',
          link: '/client/quick-start-py',
        },
      ],
    },
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
        link: '/node-client',
    },
    {
        text: 'Indexer Client',
        link: '/indexer-client',
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
  ],
})
