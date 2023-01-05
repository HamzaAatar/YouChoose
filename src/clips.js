import { defineStore } from 'pinia'
import { useVideoDataStore } from './videoData'



export const useClipsStore = defineStore('clips', {
    state: () => {
        const videoData = useVideoDataStore().currentData
        return {
            currentClip: {
                options: {
                    v_id: videoData.Video_ID,
                    start: 0,
                    end: videoData.Duration.duration_in_seconds,
                    quality: Object.keys(videoData.Qualities)[0],
                    fps: videoData.Qualities[Object.keys(videoData.Qualities)[0]].fps[0],
                    format: videoData.Qualities[Object.keys(videoData.Qualities)[0]].ext[0],
                },
                URL: ''
            },
            prevClips: [],
            dialog: false
        }
    },
    getters: {
        getAvailableURL(state) {
            return state.prevClips.filter((item) =>  JSON.stringify(item.options) === JSON.stringify(state.currentClip.options))
        },
    },
    actions: {
        async getURL(audioOnly=false) {
            if (audioOnly) {
                // make api call to the audio only endpoint
            } else {
                if (this.getAvailableURL.length == 0 || !this.getAvailableURL[0].URL) {
                    const requestOptions = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "accept": "application/json",
                        },
                        body: JSON.stringify(this.currentClip.options)
                    };
                    const fileResponse = await fetch("http://127.0.0.1:8000/trimVideo/", requestOptions)
                    this.currentClip.URL = URL.createObjectURL(await fileResponse.blob())
                    this.prevClips.push(JSON.parse(JSON.stringify(this.currentClip)))
                } else {
                    this.currentClip.URL = this.getAvailableURL[0].URL
                }
            }
            this.dialog = true
            return this.currentClip.URL
        },
    }
})