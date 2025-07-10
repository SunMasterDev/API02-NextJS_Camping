export type actionFunction=(
    prevState:any,
    formData:FormData
)=>Promise<{message:string}> //return message

export type LandmarkCardProps={
    id:string
    name:string
    description:string
    image:string
    category:string
    province:string
    price:number
    lat:number
    lng:number
}