export async function load({ fetch }) {
   let response = await fetch('/api/projects')
   let payload = await response.json()

   return {
      projects: payload
   }
}
