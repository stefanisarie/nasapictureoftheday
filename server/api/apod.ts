export default defineEventHandler(async (event) => {
  const { NASA_API_KEY } = useRuntimeConfig()
  
  const data = await $fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)

  console.log('New picture of the day from NASA successfully fetched!')
  
  const timestamp = new Date().toISOString();

  return {
    ...data,
    timestamp,
  };
})