import AWS from 'aws-sdk'

const s3 = new AWS.S3()

export const UploadImageAWS = async (file) => {
return await s3.putObject({
    Body: file.buffer,
    Bucket: process.env.CYCLIC_BUCKET_NAME,
    Key: `${file.originalname}`,
}).promise()
}

export const GetUploadedImageAWS = async (key) => {
    try{
 return await s3.getObject({
    Bucket: process.env.CYCLIC_BUCKET_NAME,
    Key: key
 })
}catch(e){
    console.log(e)
}
}
