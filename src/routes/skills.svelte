<script lang="ts">
    import Container from '../components/UI/Container/Container.svelte';
    
    const iconNameClasses = "text-md font-semibold text-black dark:text-white flex justify-center";
    const iconContainerClasses = "my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-24";
    const sectionClasses = "pt-16 text-lg font-bold text-dh-primary-dark-500 dark:text-white text-center";
    const sectionContainerClasses = "flex justify-center";
    const iconWrapperClasses = "flex flex-col";

</script>
<div class="mt-16">
    <Container>
        <h1 class="pt-16 text-5xl font-normal text-dh-secondary-dark-500 text-center">Technical Skills</h1>
        
        <!-- Used Most Frequently Section -->
        <h2 class={`${sectionClasses}`}>Used Most Frequently</h2>
        <div class={`${sectionContainerClasses}`}>
            <div class={`${iconContainerClasses}`}>
                <div class={`${iconWrapperClasses}`}>
                    <i class="devicon-react-original colored text-9xl"></i>
                    <h3 class={`${iconNameClasses}`}> ReactJS </h3>
                </div>
                <div class={`${iconWrapperClasses}`}>
                    <i class="devicon-javascript-plain colored text-9xl"></i>
                    <h3 class={`${iconNameClasses}`}> JavaScript </h3>    
                </div>
                <div class={`${iconWrapperClasses}`}>
                    <i class="devicon-nodejs-plain colored text-9xl"></i>
                    <h3 class={`${iconNameClasses}`}> NodeJS </h3>
                </div>
                <div class={`${iconWrapperClasses}`}>
                    <i class="devicon-tailwindcss-original-wordmark colored text-9xl"></i>
                    <h3 class={`${iconNameClasses}`}> TailwindCSS </h3>
                </div>  

                <div class={`${iconWrapperClasses}`}>
                    <i class="devicon-html5-plain colored text-9xl"></i>
                    <h3 class={`${iconNameClasses}`}> HTML5 </h3>
                </div>  
                <div class={`${iconWrapperClasses}`}>
                    <i class="devicon-github-original colored dark:text-white text-9xl"></i>
                    <h3 class={`${iconNameClasses}`}> Github </h3>
                </div>

            </div>
        </div>

        <!-- Familiar With Section -->
        <h2 class={`${sectionClasses}`}>Familiar With</h2>
        <div class={`${sectionContainerClasses}`}>
            <div class={`${iconContainerClasses}`}>
                <div class={`${iconWrapperClasses}`}>
                    <i class="devicon-svelte-plain colored text-9xl"></i>
                    <h3 class={`${iconNameClasses}`}> Svelte </h3>
                </div>
                <div class={`${iconWrapperClasses}`}>
                    <i class="devicon-python-plain colored text-9xl"></i>
                    <h3 class={`${iconNameClasses}`}> Python </h3>
                </div>
                <div class={`${iconWrapperClasses}`}>
                    <i class="devicon-mongodb-plain colored text-9xl"></i>
                    <h3 class={`${iconNameClasses}`}> MongoDB </h3>
                </div>
                <div class={`${iconWrapperClasses}`}>
                    <i class="devicon-mysql-plain colored text-9xl"></i>
                    <h3 class={`${iconNameClasses}`}> MySQL </h3>
                </div>

                <div class={`${iconWrapperClasses}`}>
                    <i class="devicon-google-plain colored text-9xl"></i>
                    <h3 class={`${iconNameClasses}`}> Google App Script </h3>
                </div>
                <div class={`${iconWrapperClasses}`}>
                    <i class="devicon-drupal-plain colored text-9xl"></i>
                    <h3 class={`${iconNameClasses}`}> Drupal CMS </h3>
                </div>
                <div class={`${iconWrapperClasses}`}>
                    <i class="devicon-java-plain colored text-9xl"></i>
                    <h3 class={`${iconNameClasses}`}> Java </h3>
                </div>
                <div class={`${iconWrapperClasses}`}>
                    <i class="devicon-express-original colored text-9xl"></i>
                    <h3 class={`${iconNameClasses}`}> ExpressJS </h3>
                </div>

                <div class={`${iconWrapperClasses}`}>
                    <i class="devicon-bootstrap-plain colored text-9xl"></i>
                    <h3 class={`${iconNameClasses}`}> Boostrap </h3>
                </div>
                <div class={`${iconWrapperClasses}`}>
                    <i class="devicon-heroku-original colored text-9xl"></i>
                    <h3 class={`${iconNameClasses}`}> Heroku </h3>
                </div>
            </div>
        </div>
       

        <!-- Future Interests Section -->
        <h2 class={`${sectionClasses}`}>Future Interests</h2>
        <div class={`${sectionContainerClasses}`}>
            <div class={`${iconContainerClasses}`}>
                <div class={`${iconWrapperClasses}`}>
                    <i class="devicon-go-original-wordmark colored text-9xl"></i>
                    <h3 class={`${iconNameClasses}`}> GoLang </h3>
                </div>
                <div class={`${iconWrapperClasses}`}>
                    <i class="devicon-rust-plain colored dark:text-white text-9xl"></i>
                    <h3 class={`${iconNameClasses}`}> Rust </h3>
                </div>
                <div class={`${iconWrapperClasses}`}>
                    <i class="devicon-react-original colored text-9xl"></i>
                    <h3 class={`${iconNameClasses}`}> React Native </h3>
                </div>
                <div class={`${iconWrapperClasses}`}>
                    <i class="devicon-swift-plain colored text-9xl"></i>
                    <h3 class={`${iconNameClasses}`}> Swift </h3>
                </div>
            </div>
        </div>

    </Container>
</div>