<template>
  <div class="px-4" >
    <v-card
      elevation="20"
      class="mx-auto mt-2"
      color="secondary"
      max-width="500"
      min-width="300"
    >
      <v-card-text>
        <v-text-field
        density="compact"
        variant="solo"
        label="Enter Video URL or video ID"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="onClick"
        @keyup.enter="onClick"
        v-model="videoData.currentURL"
        ></v-text-field>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { useVideoDataStore } from '@/videoData';

  export default {
    setup() {
      const videoData = useVideoDataStore()
      return { videoData }
    },
    methods: {
      onClick () {
        this.$emit("submited", true)
      }
    }
  }
</script>