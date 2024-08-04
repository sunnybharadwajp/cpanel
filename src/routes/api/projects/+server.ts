import type { ProjectRequest } from '$db/models/Project'
import { json } from '@sveltejs/kit'

import { ObjectId } from 'mongodb'
import db from '$db/mongo'

const ProjectCollection = db.collection('projects')

export async function GET({ url }) {
   const slug = url.searchParams.get('slug')
   if (!slug) {
      let projects = await ProjectCollection.find({})
         .sort({ createdAt: -1 })
         .toArray()

      return json(projects, {
         status: 200
      })
   } else {
      let payload = await ProjectCollection.findOne({ slug: slug })
      return json(payload, {
         status: 200
      })
   }
}

export async function POST({ request }) {
   const payload: ProjectRequest = await request.json()
   let dbResponse = await ProjectCollection.insertOne(payload)
   return json({
      status: 200,
      body: {
         message: 'got it!',
         record: payload,
         response: dbResponse
      }
   })
}

export async function DELETE({ url }) {
   const id = url.searchParams.get('id')
   if (id) {
      try {
         await ProjectCollection.deleteOne({ _id: new ObjectId(id) })
         return json({
            status: 200,
            body: {
               message: 'project deleted'
            }
         })
      } catch (e) {
         return json({
            status: 500,
            body: {
               message: 'error deleting project',
               error: e
            }
         })
      }
   }
}

export async function PUT({ request, url }) {
   const id = url.searchParams.get('id')

   if (id) {
      const payload: ProjectRequest = await request.json()
      try {
         await ProjectCollection.replaceOne({ _id: new ObjectId(id) }, payload)
         return json({
            status: 200,
            body: {
               message: 'project updated'
            }
         })
      } catch (e) {
         return json({
            status: 500,
            body: {
               message: 'error updating project',
               error: e
            }
         })
      }
   }
}
