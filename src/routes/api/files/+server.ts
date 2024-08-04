import { json } from '@sveltejs/kit'
import { storage } from '$db/firebaseApp'
import { put, del } from '@vercel/blob'
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private'

import db from '$db/mongo'
const FilesCollection = db.collection('files')

import { File, FileType } from '$db/models/File'
import { generateId } from '$lib/utilities'

export async function GET({ url }) {
   const id = url.searchParams.get('id')
   if (!id) {
      try {
         const dbResponse = await FilesCollection.find({})
            .sort({ createdAt: -1 })
            .toArray()
         return json({
            status: 200,
            body: {
               message: 'got it!',
               response: dbResponse
            }
         })
      } catch (err) {
         return json({
            status: 500,
            body: {
               message: 'server error',
               errorObj: err
            }
         })
      }
   }
}

export async function POST({ request }) {
   const formData = await request.formData()
   const file: any = formData.get('file')
   const filename = generateId() + '.' + file.name.split('.').pop()

   let fileRecord = new File()
   let title = String(formData.get('title'))
   if (title.length) {
      fileRecord.title = String(formData.get('title'))
   } else {
      fileRecord.title = 'Untitled File'
   }
   fileRecord.filename = filename
   fileRecord.comments = String(formData.get('comments'))
   fileRecord.size = Number(formData.get('file-size'))
   console.log(fileRecord.size)

   const uploadFile = await put(`mainsite/${fileRecord.filename}`, file, {
      access: 'public',
      token: BLOB_READ_WRITE_TOKEN
   })

   fileRecord.url = uploadFile.url
   console.log('Image Uploaded at: ' + uploadFile.url)

   try {
      const dbResponse = await FilesCollection.insertOne(fileRecord)
      return json({
         status: 200,
         body: {
            message: 'Added a record!',
            response: dbResponse
         }
      })
   } catch (err) {
      return json({
         status: 500,
         body: {
            message: 'server error',
            errorObj: err
         }
      })
   }
}

export async function DELETE({ url }) {
   const fileURL: any = url.searchParams.get('url')

   try {
      const deleteFile = await del(fileURL, {
         token: BLOB_READ_WRITE_TOKEN
      })
      console.log(deleteFile)
      const dbResponse = await FilesCollection.deleteOne({ url: fileURL })
      console.log('deleted')
      return json({
         status: 200,
         response: dbResponse
      })
   } catch (err) {
      console.log(err)
      return json(err)
   }
}
