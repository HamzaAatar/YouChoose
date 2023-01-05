<template>
    <span class="subheading">Select Quality</span>
      <v-chip-group
      v-model="options.quality"
      selected-class="text-secondary"
      class="py-0"
      mandatory
      >
        <v-col
          cols="12"
          md="12"
        >
          <v-chip
              v-for="quality in Object.keys(qualities)"
              :key="quality"
              :value="quality"
              class="text-center"
          >
              {{ quality }}
          </v-chip>
        </v-col>
      </v-chip-group>
</template>

<script>
  import { useVideoDataStore } from '@/videoData';
  import { useClipsStore } from '@/clips';

  export default {
    setup() {
      const qualities = useVideoDataStore().currentData.Qualities
      const options = useClipsStore().currentClip.options
      return { qualities, options }
    }
  }
</script>