var app = new Vue({
    el:"#player",
    data:{
        query:"",
        musicList:[],
        musicUrl: "",
        musicCover: "",
        commentList: [],
        isPlaying: false
    },
    methods: {
        searchMusic: function(){
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords="+this.query)
            .then(function(response){
                    // console.log(response);
                    that.musicList = response.data.result.songs;
            }, function(err){}
            )
        },
        playMusic: function(musicId){
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
            .then(function(response){
                that.musicUrl = response.data.data[0].url;
                console.log(that.musicUrl)
            }, function(err){ }),
            
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
            .then(function(response){
                // console.log(response.data.songs[0].al.picUrl);
                that.musicCover = response.data.songs[0].al.picUrl
            }, function(err){ }),

            // 歌曲评论获取
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
            .then(function(response){
                that.commentList = response.data.hotComments
            }, function(err){ })
        },

        play:function(){
            this.isPlaying = true;
        },
        pause:function(){
            this.isPlaying=false;
        }

    }
})