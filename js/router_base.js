//サンプルデータ
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

/*************************
 * 擬似API群
 *************************/
//ユーザー一覧
var getUsers = function(callback){
    console.log("getUsersコールバック")
    setTimeout(function(){
        console.log("seTimeoutメソッド")
        callback(null, userData)
    }, 1000)
}
//ユーザー詳細
var getUser = function(userId, callback){
    setTimeout(function(){
        var filteredUsers = userData.filter(function(user){
            return user.id === parseInt(userId, 10)
        })
        callback(null, filteredUsers && filteredUsers[0])
    }, 1000)
}
//ユーザー作成
var postUser = function(params, callback){
    setTimeout(function(){
        params.id = userData.length + 1
        console.log('登録する名前: ' + params.name)
        console.log('登録する説明文: ' + params.description)
        userData.push(params)
        console.log('userData: ' + userData)
        callback(null, params)
    }, 1000)
}
//認証
var Auth = {
    login: function(email, pass, cb){
        setTimeout(function(){
            if(email === 'vue@example.com' && pass === 'vue'){
                localStorage.token = Math.random().toString(36).substring(7)
                if(cb){ cb(true) }
            }else{
                if(cb){ cb(false) }
            }
        }, 0)
    },
    logout: function(){
        delete localStorage.token
    },
    loggedIn: function(){
        //!!（反転しないで、オブジェクトが存在すればtrue、存在しなければfalse
        return !!localStorage.token
    }
}

/*************************
 * コンポーネント群
 *************************/
//ユーザー一覧
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
//ユーザー詳細
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
//ユーザー作成
var UserCreate = {
    template: '#user-create',
    data: function(){
        return{
            sending: false,
            user: this.defaultUser(),
            error: null
        }
    },
    created: function(){},
    methods: {
        defaultUser: function(){
            return{
                name: '',
                description: ''
            }
        },
        createUser: function(){
            if(this.user.name.trim() === ''){
                this.error = 'Nameは必須です。'
                return
            }
            if(this.user.description.trim() === ''){
                this.error = 'Descriptionは必須です。'
                return
            }
            postUser(this.user, (function(err, user){
                this.sending = false
                if(err){
                    this.error = err.toString()
                }else{
                    this.error = null
                    this.user = this.defaultUser()
                    alert('新規ユーザーが登録されました。')
                    this.$router.push('/users')
                }
            }).bind(this))
        }
    }
}
//ログイン
var Login = {
    template: '#login',
    data: function(){
        return{
            email: 'vue@example.com',
            pass: '',
            error: false
        }
    },
    methods: {
        login: function(){
            Auth.login(this.email, this.pass, (function(loggedIn){
                if(!loggedIn){
                    console.log('ログイン失敗')
                    this.error = true
                }else{
                    console.log('ログイン成功')
                    this.$router.replace(this.$route.query.redirect || '/')
                }
            }).bind(this))
        }
    }
}

/*************************
 * VueRouterインスタンス
 *************************/
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
            path: '/users/new',
            component: UserCreate,
            beforeEnter: function(to, from, next){
                if(!Auth.loggedIn()){
                    next({
                        path: '/login',
                        query: { redirect: to.fullPath }
                    })
                }else{
                    next()
                }
            }
        },
        {
            path: '/users/:userId',
            component: UserDetail
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/logout',
            beforeEnter: function(to, from, next){
                Auth.logout()
                next('/')
            }
        },
        {
            path: '*',
            redirect: '/top'
        }
    ]
})

/*************************
 * Vueインスタンス
 *************************/
var app = new Vue({
    data: {
        Auth: Auth
    },
    router: router
}).$mount('#app')