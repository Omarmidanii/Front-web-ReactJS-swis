export default interface Notificationn{
    id : string;
    type? : string;
    notifiable_id? : number;
    data? : data;
    read_at? : string;
}

interface data{
    name? : string;
    job_name? : string;
    message? : string;
}