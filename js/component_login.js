Vue.component('user-login', {
    template: '#login-template',
    data: function (){
        return {
            userid: '',
            password: ''
        }
    },
    methods: {
        login: function(){
            auth.login(this.userid, this.password)
        }
    }
})

var auth = {
    login: function(id, password){
        window.alert("userid: " + id + "\n" + "password: " + password)
    }
}

new Vue({
    el: "#login-example"
})