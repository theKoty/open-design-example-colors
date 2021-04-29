# SDK hackathon starter

## How to start

- rename `.env.example` to `.env` and fill in your token generated from the [Auth docs section](https://opendesign.avocode.com/docs/getting-started)
- run `yarn` to install dependencies and then `yarn dev` to run local server
- your server starts on [http://localhost:3000](http://localhost:3000)

## How to work with Open Desing SDK

- **Open Design SDK** is considered to be used mainly in **Node.js** environemnt. **Next.js** allows you to create [custom API endpoints](https://nextjs.org/docs/api-routes/introduction) where you can build your API endpoints using OD SDK.
- These API endpoints need to be created under `/pages/api` folder. (see the example endpoint in `/pages/api/get-artbords.ts`)
- You can access data from these API endpoints using `fetch`, or any other libraries such as `Axios` or `SWR`.
