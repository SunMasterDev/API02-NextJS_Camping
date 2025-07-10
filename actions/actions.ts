"use server";
// ฝั่งหลังบ้าน
import { imageSchma, landmarkSchema, profileSchema, validateWithZod } from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import { uploadFile } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

const getAuthUser = async () => {
  //ตรวจสอบว่า login หรือยัง ก่อนสร้าง profile
  const user = await currentUser();
  if (!user) {
    throw new Error("You must logged!!");
  }
  if (!user.privateMetadata.hasProfile) redirect("/profile/create"); //ถ้าไม่มี user ให้ไปที่หน้า create
  return user;
};

// const profileSchema = z.string().min(2,{message:"ตัวอักษรต้องมากกว่า 2 ตัว"})

const renderError = (error: unknown): { message: string } => {
  //จัด Error ที่ส่งมาจาก utils schemas
  //codeBody
  return {
    message: error instanceof Error ? error.message : "an Error!!!",
  };
};

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await currentUser(); //เรียกใช้ตรวจสอบ user
    if (!user) throw new Error("Please Login!!!");

    const rawData = Object.fromEntries(formData); //ดึงข้อมูลที่ส่งมาจาก form
    const validateField = validateWithZod(profileSchema, rawData); //ตรวจสอบข้อมูลที่ส่งมาจาก form
    // console.log(validateField);

    await db.profile.create({
      //ส่งข้อมูลไปยังฐานข้อมูล
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "", //null list กัน undefined
        ...validateField, //หลังตรวจสอบกระจายข้อมูลไปยังฐานข้อมูล
      },
    });

    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      //ถ้าสร้าง Profile แล้วให้ Update ว่ามีแล้ว เพื่อไม่ต้องไปหน้าสร้าง profile
      privateMetadata: {
        hasProfile: true,
      },
    });
    // return { message: "Create profile success!!" };
  } catch (error) {
    // console.log(error);
    return renderError(error);
  }
  redirect("/"); //หลังสร้าง profile กลับไปหน้าแรก

  //validate
  //insert to db
  //return
};

export const createLandmarkAction = async (
  prevState: any,
  formData: FormData
): Promise<{message:string}> => {
  try {
    const user = await getAuthUser(); //เรียกใช้ตรวจสอบ user เรียกใช้ฟังช์ชัน
    const rawData = Object.fromEntries(formData); //ดึงข้อมูลที่ส่งมาจาก form
    const file=formData.get('image') as File
    // const validateField = validateWithZod(profileSchema, rawData); //ตรวจสอบข้อมูลที่ส่งมาจาก form
    //step 1 validate data 
    const validateFile=validateWithZod(imageSchma,{image:file})
    const validateField=validateWithZod(landmarkSchema,rawData)
  //step 2 upload img to supabase 
    const fullPath=await uploadFile(validateFile.image)
    console.log(fullPath);
    

   //step 3 Inser to DB
   await db.landmark.create({
    data:{
      ...validateField,
      image:fullPath,
      profileId:user.id
    }
   })
    // return { message: "Create Landmark success!!" };
  } catch (error) {
    // console.log(error);
    return renderError(error);
  }
  redirect("/"); //หลังสร้าง profile กลับไปหน้าแรก

  //validate
  //insert to db
  //return
};

export const fetchLandmarks=async({search = '',category}:{search?:string,category?:string})=>{ //= '' รับเป็นค่าว่างได้ ? คือเป็น null ได้
  //seacrh
  const landmarks = await db.landmark.findMany({
    where:{
      category,
      OR:[
        {name:{contains:search , mode:'insensitive'}}, //mod ค้นโดยไม่สนใจพิมเล็กพิมใหญ่ contains ให้ค้นหา
        {description:{contains:search , mode:'insensitive'}}, //mod ค้นโดยไม่สนใจพิมเล็กพิมใหญ่
      ]
    },
    orderBy:{
      createdAt:'desc'
    }
  })
  return landmarks
}

export const fetchLandmarksHero=async()=>{ //สำหรับ hero หน้าแรก
  //seacrh
  const landmarks = await db.landmark.findMany({
    orderBy:{
      createdAt:'desc'
    },
    take:5
  })
  return landmarks
}

export const fetchFavoriteId=async({LandmarkId}:{LandmarkId:string})=>{
  // ตรวจสอบไว้กดถูกใจแล้วหรือยัง
    const user = await getAuthUser()
    const favorite= await db.favorite.findFirst({
      where:{
        landmarkId:LandmarkId,
        profileId:user.id
      },
      select:{
        id:true
      }
    })
    return favorite?.id || null
}
//action ที่ถูกส่งไปที่ formcontainer
export const toggleFavoriteAction=async(prevState:{
  favoriteId:string | null
  LandmarkId:string
  pathname:string
})=>{
  const {favoriteId,LandmarkId,pathname} = prevState
  const user = await getAuthUser()
  try {
    //delete เคยถูกใจแล้ว ก็ลบออก
    if(favoriteId){
      await db.favorite.delete({
        where:{
          id:favoriteId
        }
      })
    }else{
      //create สร้างถูกใจ
      await db.favorite.create({
        data:{
          landmarkId:LandmarkId,
          profileId:user.id
        }
      })
    }
    revalidatePath(pathname) //update ข้อมูลอยู่เสมอ
    return {message:favoriteId? 'Remove Favorite Success': 'Add Favorite Success'}
  } catch (error) {
    return renderError(error)
  }
}

export const fetchFavorites=async()=>{
  const user= await getAuthUser()
  const favorites=await db.favorite.findMany({
    where:{
      profileId:user.id
    },
    select:{
      landmark:{
        select:{
          id:true,
          name:true,
          image:true,
          description:true,
          price:true,
          province:true,
          category:true,
          lat:true,
          lng:true
        }
      }
    }
  })
  //ติดไว้ก่อนจ้า
  return favorites.map((favorite)=>favorite.landmark)
}

export const fetchLandmarkDetail=async({id}:{id:string})=>{
  //code body
  return db.landmark.findFirst({
    where:{
      id:id,
    },
    include:{
      profile:true
    }
  })
}