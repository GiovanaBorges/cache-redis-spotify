const api = require("./api")
const cache = require("./cache")

class Spotify{
    async recommendation(options){
        const params = new URLSearchParams(options)
        const cached = await cache.get(params.toString())

        if(cached){
            return cached
        }

        const {data} = await api.get(`/recommendations?${params}`)

        const response = data.tracks.map((album)=>{
            return{
                artist:album.artists[0].name,
                url:album.artists[0].external_urls.spotify
            }
        })

        cache.set(params,response,60 * 15)

        return response
    }
}

module.exports = new Spotify()