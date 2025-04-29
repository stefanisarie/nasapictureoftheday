<script setup lang="ts">
  type ApodData = {
    copyright: string;
    date: string; // Format: YYYY-MM-DD
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
    timestamp: number; // Unix timestamp
  };

  // loading is by default true
  const loading = ref(true)
  
  // Make the call to the API
  const { data: apod, error, status } = await useFetch<ApodData>(() => '/api/apod')

  // Change the loading state to false
  if ( status === 'success' && apod.value ) {
    loading.value = false
  } 

  // Format the date in a human readable format
  const useFormatDate = (timestamp) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat('en-UK', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date)
  }

  // Theme toggle logic
  const isDarkMode = ref(false)

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Low-resolution image handler
  const lowResImage = ref(true)
  const handleImageLoad = () => {
    lowResImage.value = !lowResImage.value
  }
</script>

<template>
  <div class="dark:bg-black dark:text-white">
    <div class="container max-w-7xl mx-auto py-6 px-3 sm:px-5 md:px-8 xl:px-0">
      <!-- Loading indicator -->
      <div v-if="!loading">
        Loading images from NASA...
      </div>

      <!-- Image of the day successfully fetched -->
      <div class="aspect-w-16 aspect-h-9 flex flex-col space-y-6" v-else-if="apod">
        <div class="flex items-end justify-between w-full">
          <!-- Theme toggle button -->
          <div>
            <button @click="toggleTheme" class="self-end px-4 py-2 bg-gray-800 dark:bg-gray-200 text-gray-200 dark:text-gray-800 rounded-md shadow-md">
              Toggle {{ isDarkMode ? 'Light' : 'Dark' }} Mode
            </button>
          </div>
          <!-- Image resolution toggle button -->
          <div>
            <button @click="handleImageLoad" class="self-end px-4 py-2 bg-gray-800 dark:bg-gray-200 text-gray-200 dark:text-gray-800 rounded-md shadow-md">Change to {{ lowResImage ? 'HD' : 'SD' }} resolution</button>
          </div>
        </div>

        <!-- Image or video display -->
        <div>
          <img v-if="apod.media_type === 'image' && lowResImage" :src="apod.url" :alt="apod.title" class="object-cover w-full h-full rounded-2xl shadow-2xl dark:shadow-gray-700 shadow-gray-800" />
          <img v-if="apod.media_type === 'image' && !lowResImage" :src="apod.hdurl" :alt="apod.title" class="object-cover w-full h-full rounded-2xl shadow-2xl dark:shadow-gray-700 shadow-gray-800" />
          <iframe v-else-if="apod.media_type === 'video'" :src="apod.url" class="w-full h-full" frameborder="0" allowfullscreen ></iframe>
        </div>

        <!-- Image details -->
        <h1 class="text-3xl font-bold">{{ apod.title }} @ {{ apod.date }} ({{ lowResImage ? 'Low' : 'High' }} resolution)</h1>
        <p class="italic">{{ apod.explanation }}</p>
        <p v-show="apod.copyright">&copy; {{ apod.copyright }}</p>
        <p class="text-gray-300 dark:text-gray-600 text-xs">Last fetched at: {{ useFormatDate(apod.timestamp) }}</p>
      </div>

      <!-- Error grabing the image for NASA API -->
      <div class="text-red-500" v-else>
        <p class="font-bold">There is an issue getting the image of the day from NASA.</p>
        <p>{{ error }}</p>
      </div>
    </div>
  </div>
</template>