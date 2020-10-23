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
            component: {
                template: '<div>ユーザー一覧ページです。</div>'
            }
        }
    ]
})

var app = new Vue({
    router: router
}).$mount('#app')