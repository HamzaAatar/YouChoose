<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card
                elevation="20"
                color="accent"
                class="d-flex flex-column pa-5 justify-center"
                variant="outlined"
                max-width="700"
                min-width="300"
                >
                    <v-card color="secondary" class="pa-5 mx-0">
                        <span class="heading">{{ videoData.Title }}</span>
                        <v-img
                            :src="videoData.Thumbnail_Url"
                            :alt="videoData.Title"
                            aspect-ratio="16/9"
                            cover   
                        ></v-img>
                    </v-card>
                </v-card>
            </v-col>
            <v-col>
                <VCard
                elevation="20"
                color="accent"
                class="pa-5 mx-auto"
                variant="outlined"
                max-width="700"
                min-width="300"
                >
                    <TimeLine />
                    <v-divider color="accent" class="mb-5 mx-2"></v-divider>
                    <QualityLabel />
                    <v-divider color="accent" class="mb-5 mx-2"></v-divider>
                    <FpsSelection :fps="fps" />
                    <v-divider color="accent" class="mb-5 mx-2"></v-divider>
                    <ExtSelection :formats="formats" />
                    <v-divider color="background" class="mb-5 mx-2"></v-divider>
                    <PreviewButton />
                </VCard>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import TimeLine from './TimeLine.vue';
import QualityLabel from './QualityLabel.vue';
import FpsSelection from './FpsSelection.vue';
import ExtSelection from './ExtSelection.vue';
import PreviewButton from './PreviewButton.vue'
import { ref, watch } from "vue";

import { useClipsStore } from '@/clips';
import { useVideoDataStore } from '@/videoData';


const videoData = useVideoDataStore().currentData
const Clips = useClipsStore()

let options = ref(Clips.currentClip.options)
let fps = ref(videoData.Qualities[options.value.quality].fps);
let formats = ref(videoData.Qualities[options.value.quality].ext);

watch(() => options.value, () => {
    Clips.$patch({currentClip: {
        options: options.value,
        URL: ''
    }})
    fps.value = videoData.Qualities[options.value.quality].fps;
    formats.value = videoData.Qualities[options.value.quality].ext;
}, {deep: true})

</script>

<style scoped>
</style>