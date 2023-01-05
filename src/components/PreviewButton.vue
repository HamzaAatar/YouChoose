<template>
    <div class="d-flex justify-center">
        <v-btn
        color="secondary"
        class="mx-auto"
        size="large"
        elevation="20"
        @click="previewClip"
        >
            Clip/Preview
            <v-dialog
                v-model="dialog"
                activator="parent"
                max-width="700"
                width="50%"
                min-width="300"
                transition="dialog-top-transition"
            >
                <v-card
                color="secondary"
                class="pa-3"
                elevation="20"
                >
                    <v-card
                    color="background"
                    >
                        <div class="d-flex flex-column align-center pa-5"
                        v-if="!!Clips.currentClip.URL == false">
                            <span class="subheading text-center pb-1" >We are preparing you clip<br>please stand by</span>
                            <v-progress-circular
                            size="70"
                            indeterminate
                            color="secondary"
                            class="ma-5"
                        ></v-progress-circular>
                        </div>

                        <div v-if="!!Clips.currentClip.URL" class="d-flex flex-column justify-center pa-5" >
                            <span class="subheading pb-1">{{ title }}</span>
                            <video :src="Clips.currentClip.URL" controls></video>
                            <div class="d-flex justify-center">
                                <v-btn
                                color="error"
                                class="mx-2 mt-3"
                                elevation="20"
                                @click="dialog = false">
                                    Delete
                                </v-btn>
                                <a
                                :href="Clips.currentClip.URL"
                                :download="filename"
                                :style="{ textDecoration: 'none' }"
                                >
                                    <v-btn
                                    color="secondary"
                                    class="mx-2 mt-3"
                                    elevation="20"
                                    >
                                        Download Clip
                                    </v-btn>
                                </a>
                            </div>
                        </div>
                    </v-card>
                </v-card>
            </v-dialog>
        </v-btn>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useClipsStore } from '@/clips';
import { useVideoDataStore } from '@/videoData';

const Clips = useClipsStore()
const videoData = useVideoDataStore()
const title = videoData.currentData.Title

let options = Clips.currentClip.options
let dialog = ref(Clips.dialog)
let filename = ref(options.v_id + '-' + options.format)

async function previewClip() {
    await Clips.getURL()  
}
</script>
