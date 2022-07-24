<script lang="ts">
    import Divider from '../components/UI/Divider/Divider.svelte';
    import Container from '../components/UI/Container/Container.svelte';
    import ProjectSection from '../components/Projects/ProjectSection.svelte';
import Button from '../components/UI/Button/Button.svelte';
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
    const h2classes = `font-bold text-3xl mb-4 text-black dark:text-white`;
    const h3classes = `font-semibold text-xl pb-4 text-black dark:text-white`;
    const pClasses = `text-black dark:text-white pb-8`;
    const linkClasses = `text-dh-secondary-dark-500`;
    const sectionClasses = `my-8`;
</script>
<div class="mt-16">
    <Container>
        <div class="mb-4">
            <h1 class="pt-16 pb-8 text-5xl font-normal text-dh-secondary-dark-500 text-center">Blockchain</h1>
            <p class="dark:text-white text-black text-center font-medium">Most of my Web 3.0 Projects are located on my new <a class={linkClasses} target="_blank" href="https://www.github.com/0xD4V1NC1">Github Repository</a> under the alias <i>0xD4V1NC1</i></p>
        </div>
        <Divider />
        <div id="web-3-projects" class={sectionClasses}>
            <h2 class={h2classes}>My Web 3.0 Projects</h2>
            <ProjectSection projects={web3Projects} />
        </div>
        <Divider />
        <div id="defi" class={sectionClasses}>
            <h2 class={h2classes}>DeFi (Decentralized Finance)</h2>
            <div id="flash-loans" class="mb-4">
                <h3 class={h3classes}>Flash Loans</h3>
                <p class={`font-semibold ${pClasses}`}> What are Flash Loans?</p>
                
                <p class={pClasses}>
                    Flash Loans allow users to borrow funds returned within seconds in a single transaction.
                    A smart contract determines where to borrow the flash loan from, what to do with those funds, 
                    and performs "instant trades" on the borrower's behalf using the loaned capital.
                    If the flash loan yields a profit, it is typically charged by the loan provider.
                </p>
                
                <p class={`font-semibold ${pClasses}`}> What is the point if you have to return it "instantly" ?</p>
                
                <p class={pClasses}> 
                    Flash loans are often used by people in DeFi in order to conduct an Arbitrage Trade, Front Running Trade or to help prevent being Liquidated when over leveraged while borrowing from a protocol such as Abracadabra.
                    In the example of Arbitrage. Say we have Coin A on Exchange 1 at the price of $1. And we have Coin A on Exchange 2 at the price of $1.01. There is now a price discrepency that allows for an arbitrage trade.
                    However, to make the trade worth ones time you would need a large some of capital. A $10 trade buying on Exchange 1, and selling on Exchange 2 would yield a .10 cent profit (not including gas fees). However
                    if you could have borrowed thousands, hundreds of thousands or even millions of dollars... you would profit much more off of the trade. Arbitrage is actually a critical factor in keeping the price of a token accurate
                    amonst multiple exchanges. Arbitrage is actually one of the main components of one of the most popular stable coins in DeFi, the MIM or Magic Internet Money token. Arbitrage is one of the key pieces, that help the token maintain its PEG of $~1
                </p>
                
                <p class={pClasses}>
                    In the case of Front Running, a trader may listen to a transaction Mem pool where transactions are stored before being mined into the next block for confirmation.
                    If a front runner trader sees a rather large trade that is waiting to execute, he/she can "front run" the transaction buy paying a miner a higher gas/transaction fee to be mined onto the blockchain
                    before the large transaction goes through in order to "guarantee" price increase of a particular token, in which he/she can then sell to realize their profits. To maximize profits, some Front Running Traders
                    will utilize flash loans to increase their holding of an asset when they see an opportunity to profit. Often times front runners love high slippage and low level liquidity pools to make their profits.

                </p>
                
                <p class={pClasses}>Some common flash loan providers include Aave Lending, Cream Finance, & Equilizer Finance but there are many other DeFi protocols out their that provide this service</p>
            </div>
            <div id="aggregators">
                <h3 class={h3classes}>Aggregators, and why you should use them</h3>
                <p class={pClasses}>
                    In DeFi most transactions are done on chain via a DEX (Decentralized Exchanges). However with there being a multitude of Crypto Curriencies,
                    liquidity levels, and blockchain solutions... it can be difficult knowing which exchange will get you the best price.
                    This is where aggregators come in. A DEX aggregator like <a href="https://app.firebird.finance/swap" target="_blank" class={linkClasses}>firebird finance</a> 
                    will "aggregate" the available DEXs of an ecosystem and calculate how to get you the best possible swap for the asset you are trying to aquire.
                    It will calculate the best "route" (which currency conversion or conversions to perform a swap) and it will calculate the DEXs with the best liquidity levels to get the most out of your swap.
                </p>
                
                <p class={pClasses}>
                    There is also now a multichain DEX aggregator called <a href="https://rango.exchange/" target="_blank" class={linkClasses}>Rango Exchance</a> which will
                    calculate the best way to bridge assets cross chain to maximize your return and help you easily figure out how to get one asset from one chain
                    swapped into another asset on another chain.
                </p>
            </div>
            <div id="defi-resources">
                <h3 class={h3classes}>DeFi Resources:</h3>
                <p class={pClasses}><a class={linkClasses} href="https://app.apy.vision/search" target="_blank">Apy Vision</a> or <a href="https://dexscreener.com/" target="_blank" class={linkClasses}>Dex Screener</a> - I personally use these for finding liquidity pools and the most liquidable pairs, but they provider a numerous amount of token analytics that will help you with various needs you may have</p>
                <p class={pClasses}><a class={linkClasses} href="https://tornadocash.eth.limo/" target="_blank">Tornado.Cash</a> - non-custodial privacy solution aka allows you to move money around privately. Supports multiple chains</p>
                <p class={pClasses}><a class={linkClasses} href="https://defillama.com" target="_blank">DeFi Llama</a> - DeFi Llama is a DeFi Aggregator most often used to track TVL for multiple protocols across multiple chains, finding potential upcomming airdrops, and best yield farms </p>
                <p class={pClasses}><a class={linkClasses} href="https://synapseprotocol.com">Synapse Protocol</a> - this is a cross chain bridge and personally one of my favorites. For me they usually have the most pairs and are good for getting to some of the more difficult EVM chains and L2's</p>
                <p class={pClasses}><a class={linkClasses} href="https://apeboard.finance/" target="_blank">Apeboard Finance</a> - advanced DeFi wallet tracker/monitor. Common uses would be to explore a popular wallet in attempt to follow smart money</p>
                <p class={pClasses}><a class={linkClasses} href="https://pro.nansen.ai/" target="_blank">Nansen AI</a> - very... very... advanced blockchain analytics platform allowing you to find trending tokens, NFTs and projects before they have blown up</p>
                <p class={pClasses}><a class={linkClasses} href="https://app.firebird.finance/swap" target="_blank">Firebird Finance</a> - as mentioned previously this is a DEX Aggregator and one of my personal favorites. There are others out there but this one best serves most of my needs</p>
                <p class={pClasses}><a class={linkClasses} href="https://koinly.io" target="_blank">Koinly</a> - this was recommended to me, although I have not personally used it. Koinly is known for being able to easily compute/handle your taxes for crypto</p>
                <p class={pClasses}><a class={linkClasses} href="https://nftcalendar.io" target="_blank">NFT Calendar</a> - easy way to track when very hyped up NFT projects are set to release and start minting</p>
                <p class={pClasses}><a class={linkClasses} href="https://chainlist.org/" target="_blank">Chain List</a> - allows you to quickly add any blockchain to your wallet </p>
                <p class={pClasses}><a class={linkClasses} href="https://dailydefi.org/tools/impermanent-loss-calculator/" target="_blank">Impermanent Lost Calculator </a> - helps you calculate potential risk of a yield farming or liquidity providing opportunity</p>
                <p class={pClasses}><a class={linkClasses} href="https://wiki.rugdoc.io/docs/how-to-revoke-permissions/" target="_blank">RugDoc Wallet Security</a> - Here you will learn how to mitigate risk to your wallet by revoking smart contract approvals.</p>
                <p class={pClasses}><a class={linkClasses} href="https://www.marketcapof.com/fantom/solana" target="_blank">Market Cap Simulator</a> - Ever wonder how rich you would be if a particular token reached a certain market cap? Looking to dream about the what-ifs and hypotheticals? This calculator helps you compare if your asset grew to the level of another asset and what it would be worth</p>
                <p class={pClasses}><a class={linkClasses} href="https://gains.trade/" target="_blank">Gains Network</a> - decentralized trading platform allowing you to conduct leveraged day trades for advanced traders</p>
                <p class={pClasses}><a class={linkClasses} href="https://debank.com/" target="_blank">Debank</a> - great wallet analyzer tool to see what your overall wallet value is across multiple chains, staked protocols and while providing liquidity</p>
            </div>
        </div>
        <Divider />
        <div id="interesting-projects" class="mt-8 pb-24">
            <h2 class={h2classes}>Projects Worth Watching <i>(NOT FINANCIAL ADVICE)</i></h2>
            <ul>
                <li class="mb-4">
                    <h3 class={h3classes}><a class={linkClasses} href="https://lens.xyz/" target="_blank">Lens Protocol</a></h3>
                    <p class={`font-semibold ${pClasses}`}>What is Lens Protocol? </p>
                    
                    <p class={pClasses}>
                        As quoted by the Lens team, "The Lens Protocol is a Web3 social graph on the Polygon Proof-of-Stake blockchain. 
                        It is designed to empower creators to own the links between themselves and their community, forming a fully composable, 
                        user-owned social graph. The protocol is built from the ground up with modularity in mind, 
                        allowing new features and fixes to be added while ensuring immutable user-owned content and social relationships."
                    </p>
                    
                    <p class={`font-semibold ${pClasses}`}>What makes Lens Special?</p>
                    
                    <p class={pClasses}>
                        Lens is a framework that can have many social media applications built upon them that will allow a unique opportunity for users to monetize their communities across multiple platforms.
                        In todays day and age, content creators merley get a fraction of the revenue they help generate on social media platforms, and have to build their audiences individually across each social media application.
                        One of the many things Lens can allow for is you to bring your following with you from each app that is built onto the protocol. Checkout the different their <a class={linkClasses} href="https://ideas.lens.xyz/" target="_blank">ideas page</a> to see some very interesting
                        potential future projects.
                    </p>
                    <div class="py-4">
                        <Button href="https://discord.gg/dGPxPBMsgx" target="_blank" text="Lens Discord" classes="py-2 px-4" color="primary"/>
                    </div>
                </li>
                <li class="mb-4">
                    <h3 class={h3classes}><a class={linkClasses} href="https://betswap.gg/" target="_blank">Betswap GG</a></h3>
                    <p class={pClasses}>
                        Betswap is a "Sports Trading Exchange" or better known as a Decnetralized online gambling platform currently on the Ethereum and Avalanche Blockchains.
                    </p>
                    
                    <p class={pClasses}>
                        Being a decentralized sports betting platform, Betswap offers a variety of advantages, such as:
                    </p>
                    
                    <p class={pClasses}> 1. Anonymity: Clients can deposit and withdraw their funds anonymously and instantly. Safety and lower fees: Crypto sportsbooks are powered by safe payment methods with lower or zero transaction fees</p>
                    
                    <p class={pClasses}> 2. Flexibility: As users can interact with the platform using a variety of cryptocurrencies such as USDT and MIM.</p>
                    
                    <p class={pClasses}> 3. Decentralization: Being a decentralized sports betting platform, Betswap offers users a higher degree of safety of user funds and transparency.</p>
                    
                    <p class={pClasses}>
                        With the World Cup being just around the corner and the mainnet launch of the application being around the corner, I think this platform will have a very 
                        good chance at succeeding. Betswap is one of the few Web 3.0 betting platforms and by far the most superior.
                    </p>
                    <div class="py-4">
                        <Button href="https://discord.gg/DhvyaxTE3b" target="_blank" text="BSGG Discord" classes="py-2 px-4" color="primary"/>
                    </div>
                </li>
                <li class="">
                    <h3 class={h3classes}><a class={linkClasses} href="https://wonderland.money" target="_blank">Wonderland DAO & wMemo</a></h3>
                    <p class={pClasses}> 
                        Wonderland DAO (Decentralized autonomous organization) is argubably one of the biggest social and financial experiments that exist in DeFi today.
                        Wonderland was orginally a fork of the very famous Olympus DAO that originated out of the Ethereum ecosystem. Olympus DAO became very popular for
                        its innovation with creating bonding-as-a-service for other protocol, and its ponzi like tokenomics paying out insane APYs. However overtime, Wonderland 
                        started getting away from the similarities of Olympus and began focusing on essentially being the biggest "Retail Investor Hedge Fund" or "Decentralized VC". By being a member of Wonderland
                        you get to vote on member roles, the future of the DAO, and invest collectively in Web 3.0 start ups. Wonderland has supported projects like BSGG, and Cross The Ages and a few others by providing
                        its technical expertise, massive community to help other projects grow quicker, and necessary capital to help these other Web 3.0 start ups grow.
                    </p>
                    
                    <p class={pClasses}>
                        It is no secret that Wonderland has had its fair share of drama and growing pains but through out all the adversity it still is growing and remains afloat and one of the most popular DAOs.
                        By investing in wMemo you can stake it to receive revenue share from the DAOs investments. In previous iterations wMemo used to be used on multiple chains (hence it being wrapped) which would allow you gain 
                        your revenue share, while you could borrow against the value of it to do other activities in DeFi. This turned out to be a disatorious idea and is no longer used for that due to multiple cascading liquidations that almost
                        sent the WonderlandDAO into the after life. 
                    </p>
                    
                    <p class={pClasses}>
                        I personally believe Wonderlands biggest strengths are also some of its biggest weaknesses and vulnerabilities. Its community. One thing that often separates Retail Investors and VC Investors is emotional intelligence.
                        Naturally there are more inexperience traders/investors then there is experienced investors. This allows for inexperienced people to have say on certain topics that aren't qualified on, and easily allows for the spread
                        of FUD throughout the community for members of the DAO who are unfamiliar with investing. Wonderlands token price walked off a cliff b/c one of its co-founders 0xSifu, was doxxed. Whether or not
                        you believe the aqusations against him is a different matter but fast forward 3 months, he has been ousted from the DAO BUT the DAO voted to invest in him. Where it is even "more risky",
                        then it would have been to keep him in the DAO. Ironic nonetheless but sometimes it is very difficult to run an organization with so many people that are allowed to have a say in how it should be run. I personally still invest in Wonderland b/c I have
                        met a lot of great people in the community and it is one of the projects that I think is at the bleeding edge of innovation.
                    </p>
                    <div class="py-4">
                        <Button href="https://discord.gg/jNRrwKAwrC" target="_blank" text="Wonderland Discord" classes="py-2 px-4" color="primary"/>
                    </div>
                </li>
            </ul>
        </div>
    </Container>
</div>