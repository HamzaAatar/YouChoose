<template>
  <v-app theme="light">
    <Header theme="light" />
    <v-main>
      <Search @submited="getData" />
      <div class="d-flex flex-column align-center pa-5"
      v-if="loading">
          <v-progress-circular
                size="70"
                indeterminate
                color="secondary"
                class="ma-5"
            >
          </v-progress-circular>
      </div>
      <VideoDetails v-if="submited && !loading"/>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  import Search from '@/components/Search.vue';
  import VideoDetails from '@/components/VideoDetails.vue';
  import { ref } from 'vue';
  import { useVideoDataStore } from './videoData';

  const videoData = useVideoDataStore()
  let url = ref(videoData.currentURL)
  let data = ref(Boolean(url.value) ? videoData.videoData[url.value]: {})
  let submited = ref(!!Object.keys(data.value).length)
  let loading = ref(false)

  async function getData(value) {
    if (value) {
      loading.value = true
      data.value = await videoData.getData()
      loading.value = false
      submited.value = !!Object.keys(data.value).length
    }
  }
</script>
