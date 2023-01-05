import { defineStore } from 'pinia'

export const useVideoDataStore = defineStore('videoData', {
    state: () => {
        return {
            currentURL: '',
            prevURLs: [],
            videoData: {}, //this Object will have the video URL as key and the data object as value.
        }
    },
    getters: {
        isAvailable: (state) => state.prevURLs.includes(state.currentURL),
        currentData: (state) => state.videoData[state.currentURL]
    },
    actions: {
        async getData() {
            let data = {}
            if (this.isAvailable) {
                data = this.currentData
            } else if ( this.currentURL != '' ) {
                let headers = new Headers()
                headers.append('Content-Type', 'application/json')
                const res = await fetch('http://127.0.0.1:8000/videoData/?videoUrl='+ this.currentURL,
                                        {
                                            headers: headers,
                                        })
                const results = await res.json()
                this.videoData[this.currentURL] = results
                this.prevURLs.push(this.currentURL)
                data = results
            } else {
                console.log('Enter a valid URL')
            }
            return data
        }
    },
})