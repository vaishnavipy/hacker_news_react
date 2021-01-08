

export default function calculateTime(time){
    const d = new Date();

    const createdAt = new Date(time)

    if(d.getFullYear() === createdAt.getFullYear()){
    if(d.getDate() === createdAt.getDate()){

        if(d.getHours() === createdAt.getHours()){
            return `${d.getMinutes() - createdAt.getMinutes()} minutes ago`
        }else{
            return `${d.getHours() - createdAt.getHours()} hours ago` 
        }

    }else{
        return  `${d.getDate() - createdAt.getDate()} days ago`;
    }
    }else{
        return  `${d.getFullYear() - createdAt.getFullYear()} years ago`;
    }
}