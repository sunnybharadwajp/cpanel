import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch, url }) => {
   const slug = url.searchParams.get('slug')
   let response = await fetch(`/data/articles/api?slug=${slug}`)
   let responseData = await response.json()

   return {
      article: responseData.body
   }
}
