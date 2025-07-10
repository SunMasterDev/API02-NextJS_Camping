import {z,ZodSchema} from 'zod'

export const profileSchema = z.object({
    firstName:z.string().min(2,{message:"ชื่อตัวอักษรมากกว่า 2 ตัว"}),
    lastName:z.string().min(2,{message:"นามสกุลตัวอักษรมากกว่า 2 ตัว"}),
    userName:z.string().min(2,{message:"ผู้ใช้ตัวอักษรมากกว่า 2 ตัว"}),
})

const validateImage=()=>{ //ตรวจสอบ type และ ขนาดไฟล์
  const maxFileSize=1024*1024
  return z.instanceof(File)
  .refine((file)=>{
   return file.size <= maxFileSize
  },'File size must be less than 1MB')
}

export const imageSchma = z.object({ //ตรวจสอบ type และ ขนาดไฟล์
  image:validateImage()
})

export const landmarkSchema=z.object({ //vaildate ข้อมูล
  name:z.string()
  .min(2,{message:'ชื่อต้องมากกว่า2อักษร'})
  .max(30,{message:'ชื่อต้องน้อยกว่า30อักษร'}),
  category:z.string(),
  description:z.string() //ชื่อไม่ตรงทำให้ขึ้นแค่ require
  .min(2,{message:'รายละเอียดต้องมากกว่า2อักษร'})
  .max(200,{message:'รายละเอียดน้อยกว่า200อักษร'}),
  price:z.coerce.number().int().min(0,{message:'ราคาต้องมากกว่า 0'}), //ชื่อไม่ตรงทำให้ขึ้นแค่ require
  province:z.string(),
  lat:z.coerce.number(),
  lng:z.coerce.number(),
})

export const validateWithZod =<T>(schema:ZodSchema<T>,data:unknown):T=>{
    const result=schema.safeParse(data)
    if(!result.success){ //!ตรงข้ามกันให้ทำอะไร //false
      const errors = result.error?.errors.map((error)=>error.message)
      throw new Error(errors.join(','))
    }
    return result.data // ถ้าทำงานสำเร็จ
}
