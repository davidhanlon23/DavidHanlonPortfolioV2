<script lang="ts">
    import Image from '../components/UI/Image/Image.svelte';
    import Container from '../components/UI/Container/Container.svelte';
    import Button from '../components/UI/Button/Button.svelte';
    const textClasses = "text-black dark:text-white text-xl";
</script>
<div class="py-16">
    <Container>
        <h1 class="pt-16 text-5xl font-normal text-dh-secondary-dark-500 text-center">About Me</h1>
        <div class="py-16 flex justify-center flex-col md:flex-row">
            <div class="flex justify-center my-8">
                <Image classes="w-72 h-72 border-none" src="/Images/davidHanlon.jpg" alt="Image of Me (David Hanlon)" circle />
            </div> 
            <div class="flex flex-col justify-items-center text-center md:text-left w-full sm:w-2/3 md:w-1/2 md:ml-16 my-8 m-auto md:m-0">
                <h2 class="text-black dark:text-white font-bold text-xl">Hi, I am David Hanlon.</h2>
                <br />
                <p class={`${textClasses}`}> I am an ambitious, optimistic, and dependable Junior Level Software Engineer with a passion for developing software and pushing the limits of my current programming and problem solving skillset.</p>
                <br/>
                <p class={`${textClasses}`}> I am seeking to become a versatile and selfless member of a high performing software engineering team that is passionate about developing and deploying quality software in order to help your organization to reach its optimal vision.</p>
            </div>
        </div>
        <div class="flex justify-center">
            <Button classes="border-2 py-2 px-4 border-dh-secondary-dark-500 text-dh-secondary-dark-500 hover:text-white hover:bg-dh-secondary-dark-500 dark:hover:text-black" text="Start a Conversation" href="/contact" />
        </div>
    </Container>
</div>