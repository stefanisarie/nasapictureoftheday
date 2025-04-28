export default defineEventHandler(async (event) => {
  const url = `https://api.nasa.gov/planetary/apod?api_key=KCm6d8pOtE3x31aeG9nnJWo1bplj0tOHwUVecddX`
  const data = await $fetch(url,{
    method: "GET",
  })

  console.log('New picture of the day from NASA successfully fetched!')
  
  const timestamp = new Date().toISOString();

  return {
    ...data,
    timestamp,
  };
})