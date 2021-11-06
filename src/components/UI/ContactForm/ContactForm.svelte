<script lang="ts">
    import axios from 'axios';
    import { user } from '../../../stores/store';
    import { notifications } from '../../../stores/notifactions';

    import Toast from '../Toast/Toast.svelte';
    import Button from '../Button/Button.svelte';

    function submitContactForm(){
        axios({
          method: "POST", 
          url:`${import.meta.env.VITE_API_URL}/api/contact`, 
          data:  {
            name:$user.name,
            email:$user.email,
            message:$user.message, 
            subject:"Contact Form Email"
        }
        }).then((response)=>{
          if (response.data.status === 'success'){
            notifications.success('Message Sent!', 3000)
            resetForm()
          }else if(response.data.status === 'fail'){
            notifications.danger('Message Failed!', 3000)
          }
        })
    }
    function resetForm(){
            $user.name = '';
            $user.email = '';
            $user.message = '';
    }

    const inputClasses = "border border-gray-200 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-900 text-black dark:text-white text-xl";
    const labelClasses = "text-black dark:text-white text-xl font-normal mb-2";
</script>
<form class="my-8" id="contact-form" method="POST" action={`${import.meta.env.VITE_API_URL}/api/contact`} enctype="multipart/form-data" on:submit|preventDefault={(data)=> submitContactForm()}>
    <div class="flex flex-col md:flex-row mb-8">
        <div class="flex flex-col md:mr-4">
            <label for="contact-form-name" class={`${labelClasses}`}>Name</label>
            <input id="contact-form-name" name="name" type="text" class={`${inputClasses} h-10 p-4`} bind:value={$user.name} required />
        </div>
        <div class="flex flex-col">
            <label for="contact-form-email" class={`${labelClasses}`}>Email</label>
            <input id="contact-form-email" name="email" type="text" class={`${inputClasses} h-10 p-4`} bind:value={$user.email} required />
        </div>        
    </div>
    <div class="flex flex-col">
        <label for="contact-form-message" class={`${labelClasses}`}>Message</label>
        <textarea id="contact-form-message" name="message" type="text" placeholder="How can I assist you?" class={`${inputClasses} p-4 h-56`} bind:value={$user.message} required />
    </div>
    <div class="mt-8 flex justify-center">
        <Button classes="border-2 py-2 px-12 border-dh-secondary-dark-500 text-dh-secondary-dark-500 hover:text-white hover:bg-dh-secondary-dark-500 dark:hover:text-black" text="Contact" type="submit" />
    </div>
</form>
<Toast/>

