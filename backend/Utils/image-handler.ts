import  path  from 'path';
import { UploadedFile } from "express-fileupload";
// v4 is the uuid that make string in uuid (32 letters)
import { v4 as uuid } from "uuid";
import fsPromises from "fs/promises";


//save the image  in UUID format
async function saveImage(image: UploadedFile): Promise<string> {

  //if admin didnt sent image
  if(!image) return "no-image.jpg";

    //take orginial image file type
  const extension = image.name.substring(image.name.lastIndexOf("."));
// create a uuid name
  const fileName = uuid() + extension;

  //save image (we go to the absolute path)
  const absolutePath = path.join(__dirname, ".." , "Assets","images" ,  fileName);
//mv=move - save the image
  image.mv(absolutePath);
//   return the uniqe name
  return fileName;
}



// edit image

async function editImage(image:UploadedFile , oldImage:string ) : Promise <string>{
  // remove old image:
  await deleteImage(oldImage);

  // save the new image
  const fileName = await saveImage(image);

  //return new image name:
  return fileName;
}

//delete image
async function deleteImage (oldImage: string) : Promise<void>{

  try{
if (!oldImage) return  ;
  // get the path loction to the image folder
  const absolutePath = path.join(__dirname, ".." , "Assets","images" ,  oldImage);

  //remove image
 await fsPromises.rm(absolutePath)

  }
  catch(err:any){
console.log(err.message);
  }

}

export default {
  editImage,
    saveImage,
    deleteImage
};