<script lang="ts">
    import Container from '../components/UI/Container/Container.svelte';
    
    const iconNameClasses = "text-md font-semibold text-black dark:text-white";
</script>
<div class="mt-16">
    <Container>
        <h1 class="pt-16 text-5xl font-normal text-dh-secondary-dark-500 text-center">Technical Skills</h1>
        
        <h2 class="pt-16 text-lg font-bold text-dh-primary-dark-500 dark:text-white text-center">Used Most Frequently</h2>
        <div class="flex justify-center">
            <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
                <i class="devicon-react-original colored text-9xl"></i>
                <h3 class={`${iconNameClasses}`}> ReactJS </h3>

                <i class="devicon-javascript-plain colored text-9xl"></i>
                <h3 class={`${iconNameClasses}`}> JavaScript </h3>

                <i class="devicon-nodejs-plain colored text-9xl"></i>
                <h3 class={`${iconNameClasses}`}> NodeJS </h3>

                <i class="devicon-tailwindcss-original-wordmark colored text-9xl"></i>
                <h3 class={`${iconNameClasses}`}> TailwindCSS </h3>


                <i class="devicon-html5-plain colored text-9xl"></i>
                <h3 class={`${iconNameClasses}`}> HTML5 </h3>

                <i class="devicon-github-original colored dark:text-white text-9xl"></i>
                <h3 class={`${iconNameClasses}`}> Github </h3>

            </div>
        </div>


        <h2 class="pt-16 text-lg font-bold text-dh-primary-dark-500 dark:text-white text-center">Familiar With</h2>
        <div class="flex justify-center">
            <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
                <i class="devicon-svelte-plain colored text-9xl"></i>
                <h3 class={`${iconNameClasses}`}> Svelte </h3>
                <i class="devicon-python-plain colored text-9xl"></i>
                <h3 class={`${iconNameClasses}`}> Python </h3>
                <i class="devicon-mongodb-plain colored text-9xl"></i>
                <h3 class={`${iconNameClasses}`}> MongoDB </h3>
                <i class="devicon-mysql-plain colored text-9xl"></i>
                <h3 class={`${iconNameClasses}`}> MySQL </h3>

    
                <i class="devicon-google-plain colored text-9xl"></i>
                <h3 class={`${iconNameClasses}`}> Google App Script </h3>
                <i class="devicon-drupal-plain colored text-9xl"></i>
                <h3 class={`${iconNameClasses}`}> Drupal CMS </h3>
                <i class="devicon-java-plain colored text-9xl"></i>
                <h3 class={`${iconNameClasses}`}> Java </h3>
                <i class="devicon-express-original colored text-9xl"></i>
                <h3 class={`${iconNameClasses}`}> ExpressJS </h3>


                <i class="devicon-bootstrap-plain colored text-9xl"></i>
                <h3 class={`${iconNameClasses}`}> Boostrap </h3>
                <i class="devicon-heroku-original colored text-9xl"></i>
                <h3 class={`${iconNameClasses}`}> Heroku </h3>
            </div>
        </div>
       


        <h2 class="pt-16 text-lg font-bold text-dh-primary-dark-500 dark:text-white text-center">Future Interests</h2>
        <div class="flex justify-center">
            <div class="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
                <i class="devicon-swift-plain colored text-9xl"></i>
                <h3 class={`${iconNameClasses}`}> Swift </h3>
                <i class="devicon-go-original-wordmark colored text-9xl"></i>
                <h3 class={`${iconNameClasses}`}> GoLang </h3>
                <i class="devicon-rust-plain colored dark:text-white text-9xl"></i>
                <h3 class={`${iconNameClasses}`}> Rust </h3>
                <i class="devicon-react-original colored text-9xl"></i>
                <h3 class={`${iconNameClasses}`}> React Native </h3>

            </div>
        </div>
        



        <!-- 
            Boostrap
            Javascript

            MongoDB
            Heroku 
            Drupal
            ExpressJS
            JAVA
            Github
            Contentful
            Svelte

            Google App Script
            MySQL
            Python

            Future Interests:
            React Native
            

        -->

    </Container>
</div>