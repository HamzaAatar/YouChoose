<template>
  <span class="subheading">Select Start/End</span>
  <v-range-slider
    color="secondary"
    v-model="range"
    :max="videoData.Duration.duration_in_seconds"
    :min="0"
    :step="1"
    hide-details
    class="py-5 ma-0"
    @update:modelValue="$emit('getRange', range)"
  >
    <template v-slot:prepend>
      <v-text-field
        :model-value="toTimeStamp(range[0])"
        single-line
        type="text"
        letiant="outlined"
        density="compact"
        style="width: 100px"
        @change="changeRange($event, 0)"
        :messages="['Start']"
      ></v-text-field>
    </template>
    <template v-slot:append>
      <v-text-field
        :model-value="toTimeStamp(range[1])"
        single-line
        type="text"
        letiant="outlined"
        style="width: 100px"
        density="compact"
        @change="changeRange($event, 1)"
        :messages="['End']"
      ></v-text-field>
    </template>
  </v-range-slider>
</template>

<script>
    import { useClipsStore } from '@/clips';
    import { useVideoDataStore } from '@/videoData';

    export default {
      setup() {
        const videoData = useVideoDataStore().currentData
        const options = useClipsStore().currentClip.options
        return { videoData, options }
      },
      data () {
      return {
          range: [0, this.videoData.Duration.duration_in_seconds],
      }
      },
      methods: {
        toTimeStamp(seconds) {
          if (seconds < 3600) {
            return new Date(seconds * 1000).toISOString().slice(14, 19)
          } else {
            return new Date(seconds * 1000).toISOString().slice(11, 19)
          }
        },
        hmsToSecondsOnly(str) {
          let p = str.split(':'),
              s = 0, m = 1;

          while (p.length > 0) {
              s += m * parseInt(p.pop(), 10);
              m *= 60;
          }
          return s;
        },
        changeRange(event, i) {
          let v = event.target.value
          this.range[i] = this.hmsToSecondsOnly(v)
          this.options.start = this.range[0]
          this.options.end = this.range[1]
        },
      }
    }

</script>