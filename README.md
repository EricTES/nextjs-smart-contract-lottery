This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.





## React Moralis package
installation - yarn add react react-dom moralis react-moralis

Moralis is a leading web3 development platform that offers everything a user needs to create, launch and grow great decentralized applications (dapps) in one place. React acts as a wrapper on top for us to work with Moralis using our react app.



## Using --dev and no --dev when installing
When we install prettier we use --dev because it is only needed to help us write code easier. In other words we only need it when we develop. However for packages such as Moralis, we actually need to it run our website therefore we install it without --dev


## Manual way of connecting to Metamask using Moralis
1. Wrap app using  Moralis Provider in root folder
2. use useMoralis( ) hook
3. get the enableWeb3 function and call it

Additinoally , you can check for if an account is connected, if web3 is enable and etc. Look at ManualHeader.tsx


## web3uikit
This is a web3 frontend package that allows us to work along side Moralis. For example, the point above could be done with just importing the ConnectButton

## moralis knows our chainID
The reason why Moralis knows about our chainId in LotteryEntrance.tsx is because in Header.tsx we used the Connect Button which passes information into the MoralisProvider (index.tsx) and then the provider passes it into all the other components.


## chainID in moralis is in HEX form
To transform chainID (hex form) to numbers, we need to use javescript built in function , parseInt(hex_number_in_string)


## call contract function in front end component using runContractFunction

import { useWeb3Contract } from 'react-moralis'

useWeb3Contract is what allows us to call a function of a contract. It takes:
- abi
- contract address
- functionName
- params
- msgValue (optional)

and returns runContractFunction: //assign a name

e.g 
 const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: JSON.parse(abi),
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })


## logging error in runContractFunction
It is good practise to always set the onError parameter when calling a funciton from runContractFunction

e.g 
 const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: JSON.parse(abi),
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

getEntranceFee({
    onError: (error) => console.log(error)
})


## Tailwind

Tailwind is like Bootstrap but more freedome according to google

Extensions to add (optional):
- Tailwind CSS IntelliSense
- PostCSS Language Support


## IPFS
IPFS is a decentralised network for uploading your website
It's similar to a blockchain in the sense that it is decentralised
but different because nodes on the IPFS network can optional choose to remember your data in their recordings.
Also  IPFS network is extremely lightweight in comparison to the blockchain network because there are no things such as
smart contracts, transactions and etc.


## Adding code to IPFS manually
1. yarn run build
2. yarn next export
3. import the "out" folder into the IPFS desktop app
4. copy the CID and paste it into the browser: http://ipfs.io/ipfs/{CID}


## Easier way using FLeek
Fleek allows us to deloy our code from github directly and make it a website
1. Go to fleek.co
2. sign up or sign in with Github account
3. Connect with Github 
4. Select the repository you want
5. Install and Authorise