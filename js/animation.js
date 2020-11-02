new Vue({
    el: "#app",
    data: function(){
        return{
            animationClass: 'bounce',
            isShown: false
        }
    },
    computed: {
        ativeClass: function(){
            return this.animationClass + ' animated'
        }
    }
})