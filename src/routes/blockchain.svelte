<script lang="ts">
    import Divider from '../components/UI/Divider/Divider.svelte';
    import Container from '../components/UI/Container/Container.svelte';
    import ProjectSection from '../components/Projects/ProjectSection.svelte';
    const web3Projects = [
        {
            projectName: '0xWolfpack Finance NFT',
            projectWebsite: 'https://pl7yg-5aaaa-aaaad-qbwiq-cai.ic.fleek.co/',
            projectRepoLink: 'https://github.com/0xD4V1NC1/nft-minting-site',
            projectDescription: `0xWF NFT is a Web3.0 NFT minting dapp built on the polygon network with React 18, TailwindCSS v3, Solidity 0.8.4, Mocha Testing Framework, TypeScript and Storybook`, 
            projectImageUrl: '/Images/projectImages/0xWFNFT.webp',
            projectLabelYear: '2022',
            omitDivider: true,
        },
    ];
    const h2classes = `font-bold text-3xl text-black dark:text-white mb-4`;
    const h3classes = `font-semibold text-xl text-black dark:text-white mb-4`;
    const sectionClasses = `m-8`;
</script>
<div class="mt-16">
    <Container>
        <div class="mb-4">
            <h1 class="pt-16 pb-8 text-5xl font-normal text-dh-secondary-dark-500 text-center">Blockchain</h1>
            <p class="dark:text-white text-black text-center font-medium">Most of my Web 3.0 Projects are located on my new <a class="text-dh-secondary-dark-500" target="_blank" href="https://www.github.com/0xD4V1NC1">Github Repository</a> under the alias <i>0xD4V1NC1</i></p>
        </div>
        <Divider />
        <div id="web-3-projects" class={sectionClasses}>
            <h2 class={h2classes}>My Web 3.0 Projects</h2>
            <ProjectSection projects={web3Projects} />
        </div>
        <Divider />
        <div id="defi" class={sectionClasses}>
            <h2 class={h2classes}>DeFi (Decentralized Finance) </h2>
            <div class="mb-4">
                <h3 class={h3classes}>Flash Loans</h3>
                <p> What are Flash Loans?</p>
                <br/>
                <p>
                    Flash Loans allow users to borrow funds returned within seconds in a single transaction.
                    A smart contract determines where to borrow the flash loan from, what to do with those funds, 
                    and performs "instant trades" on the borrower's behalf using the loaned capital.
                    If the flash loan yields a profit, it is typically charged by the loan provider.
                </p>
                <br/>
                <p> 
                    Flash loans are often used by people in DeFi in order to conduct an Arbitrage Trade, Front Running Trade or to help prevent being Liquidated when over leveraged while borrowing from a protocol such as Abracadabra.
                    In the example of Arbitrage. Say we have Coin A on Exchange 1 at the price of $1. And we have Coin A on Exchange 2 at the price of $1.01. There is now a price discrepency that allows for an arbitrage trade.
                    However, to make the trade worth ones time you would need a large some of capital. A $10 trade buying on Exchange 1, and selling on Exchange 2 would yield a .10 cent profit (not including gas fees). However
                    if you could have borrowed thousands, hundreds of thousands or even millions of dollars... you would profit much more off of the trade. Arbitrage is actually a critical factor in keeping the price of a token accurate
                    amonst multiple exchanges. Arbitrage is actually one of the main components of one of the most popular stable coins in DeFi, the MIM or Magic Internet Money token. Arbitrage is one of the key pieces, that help the token maintain its PEG of $~1
                </p>
                <br />
                <p>
                    In the case of Front Running, a trader may listen to a transaction Mem pool where transactions are stored before being mined into the next block for confirmation.
                    If a front runner trader sees a rather large trade that is waiting to execute, he/she can "front run" the transaction buy paying a miner a higher gas/transaction fee to be mined onto the blockchain
                    before the large transaction goes through in order to "guarantee" price increase of a particular token, in which he/she can then sell to realize their profits. To maximize profits, some Front Running Traders
                    will utilize flash loans to increase their holding of an asset when they see an opportunity to profit. Often times front runners love high slippage and low level liquidity pools to make their profits.

                </p>
                <br/>
                <p>Some common flash loan providers include Aave Lending, Cream Finance, & Equilizer Finance but there are many other DeFi protocols out their that provide this service</p>
            </div>
            <div>
                <h3 class={h3classes}>Aggregators, and why you should use them</h3>
                <p></p>
            </div>
            
        </div>
        <Divider />
        <div id="nfts" class={sectionClasses}>
            <h2 class={h2classes}>NFTs</h2>
        </div>
        <Divider />
        <div id="nfts" class={sectionClasses}>
            <h2 class={h2classes}>Projects Worth Watching</h2>
            <ul>
                <li class="mb-4">
                    <h3 class={h3classes}><a class="text-dh-secondary-dark-500" href="https://lens.xyz/">Lens Protocol</a></h3>
                    <p class="font-semibold">What is Lens Protocol? </p>
                    <br />
                    <p>
                        As quoted by the Lens team, "The Lens Protocol is a Web3 social graph on the Polygon Proof-of-Stake blockchain. 
                        It is designed to empower creators to own the links between themselves and their community, forming a fully composable, 
                        user-owned social graph. The protocol is built from the ground up with modularity in mind, 
                        allowing new features and fixes to be added while ensuring immutable user-owned content and social relationships."
                    </p>
                    <br/>
                    <p class="font-semibold">What makes Lens Special?</p>
                    <br/>
                    <p>
                        Lens is a framework that can have many social media applications built upon them that will allow a unique opportunity for users to monetize their communities across multiple platforms.
                        In todays day and age, content creators merley get a fraction of the revenue they help generate on social media platforms, and have to build their audiences individually across each social media application.
                        One of the many things Lens can allow for is you to bring your following with you from each app that is built onto the protocol. 
                    </p>

                </li>
                <li class="mb-4">
                    <h3 class={h3classes}><a class="text-dh-secondary-dark-500" href="https://betswap.gg/">Betswap GG</a></h3>
                    <p>Betswap is a "Sports Trading Exchange" or better known as a Decnetralized online gambling platform</p>
                </li>
                <li class="mb-4">
                    <h3 class={h3classes}><a class="text-dh-secondary-dark-500" href="https://wonderland.money">Wonderland DAO & wMemo</a></h3>
                    <p></p>
                </li>
            </ul>
        </div>
    </Container>
</div>