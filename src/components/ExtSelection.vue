<template>
    <span class="subheading">Select Extension</span>
    <v-chip-group
    v-model="options.format"
    selected-class="text-secondary"
    class="pb-2"
    mandatory
    >
        <v-chip
            v-for="ext in formats"
            :key="ext"
            :value="ext"
        >
            {{ ext }}
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
    props:{
      formats:{
        type: Array,
        required: true,
      }
    }
  }
</script>