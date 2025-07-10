'use client'
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from 'use-debounce'
const Search = () => {
  const searchParams = useSearchParams()
  const {replace} = useRouter()
  // ?.toString() || '' ตรวจสอบว่ามีค่าหรือไม่
  const [search,setSearch] = useState(searchParams.get('search')?.toString() || '')

  const handleSearch = useDebouncedCallback((value:string)=>{
    const params =new URLSearchParams(searchParams)
    if(value){
      //ถ้ามีค่าส่งมาก็ไปใส่ที่ url
      params.set('search',value)
    }else{
      //ถ้าไม่มีให้ลบออก
      params.delete('search')
    }
    replace(`/?${params.toString()}`)
    
  },500)
//มีการค้นหา การเปลี่ยนค่าตลอด
useEffect(()=>{
  if(!searchParams.get('search')){ //ถ้าไม่มีเซต ('')
    setSearch('')
  }
},[searchParams.get('search')])
  
  return (
    <Input 
    type="text"
    placeholder="Search.."
    className="max-w-xs"
    onChange={(e)=>{
      setSearch(e.target.value)
      handleSearch(e.target.value)
    }}
    value={search}
    />
  )
}
export default Search