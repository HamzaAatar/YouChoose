<template>
    <span class="subheading">Select Frame Rate</span>
    <v-chip-group
    v-model="options.fps"
    selected-class="text-secondary"
    class="pb-2"
    mandatory
    >
        <v-chip
            v-for="f in fps"
            :key="f"
            :value="f"
        >
            {{ f }}
        </v-chip>
    </v-chip-group>
</template>

<script>
  import { useClipsStore } from '@/clips';

  export default {
    setup () {
      const options = useClipsStore().currentClip.options
      return { options }
    },
    props: {
      fps: {
        type: Array,
        required:true,
      }
    }
  }
</script>
