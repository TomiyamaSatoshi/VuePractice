var getUsers = function(callback){
    console.log("getUsersコールバック")
    setTimeout(function(){
        console.log("seTimeoutメソッド")
        callback(null, [
            {
                id: 1,
                name: "Takuya Tejima"
            },
            {
                id: 2,
                name: "Yohei Noda"
            }
        ])
    }, 1000)
}

var userData = [
    {
        id: 1,
        name: 'Takuya Tejima',
        description: '東南アジアで働くエンジニアです。'
    },
    {
        id: 2,
        name: 'Yohei Noda',
        description: 'アウトドア・フットサルが好きなエンジニアです。'
    }
]

var getUser = function(userId, callback){
    setTimeout(function(){
        var filteredUsers = userData.filter(function(user){
            return user.id === parseInt(userId, 10)
        })
        callback(null, filteredUsers && filteredUsers[0])
    }, 1000)
}

var UserList = {
    template: "#user-list",
    data: function(){
        return {
            loading: false,
            users: function(){ return [] },
            error: null
        }
    },
    created: function(){
        console.log("created")
        this.fetchData()
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData: function(){
            console.log("fetchData")
            this.loading = true
            getUsers((function(err, users){
                console.log("getUsersメソッド内")
                this.loading = false
                if(err){
                    this.error = err.toString()
                }else{
                    this.users = users
                }
            }).bind(this))
        }
    }
}

var UserDetail = {
    template: '#user-detail',
    data: function(){
        return{
            loading: false,
            user: null,
            error: null
        }
    },
    created: function(){
        this.fetchData()
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData: function(){
            this.loading = true
            getUser(this.$route.params.userId, (function(err, user){
                this.loading = false
                if(err){
                    this.error = err.toString()
                }else{
                    this.user = user
                }
            }).bind(this))
        }
    }
}

var router = new VueRouter({
    routes: [
        {
            path: '/top',
            component: {
                template: '<div>トップページです。</div>'
            }
        },
        {
            path: '/users',
            component: UserList
        },
        {
            path: '/users/:userId',
            component: UserDetail
        }
    ]
})

var app = new Vue({
    router: router
}).$mount('#app')