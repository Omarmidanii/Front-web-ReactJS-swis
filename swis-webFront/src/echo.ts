import Echo from 'laravel-echo';  
import Pusher from 'pusher-js';  

window.Pusher = Pusher;  

const echo = new Echo({  
    broadcaster: 'pusher',  
    key: "4af6cf65d733e9c47f9d",  
    cluster: "ap2",  
    forceTLS: true,  
});  

export default echo;