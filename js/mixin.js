var Shareble = {
    data: function(){
        return{
            _isProcessing: false
        }
    },
    methods: {
        share: function(){
            if(this._isProcessing){
                return
            }
            if(!window.confirm('シェアしますか？')){
                return
            }
            this._isProcessing = true
            //実際はここでSNSのSDKを呼び出す
            setTimeout(() => {
                window.alert('シェアしました')
                this._isProcessing = false
            }, 300)
        }
    }
}

var IconShareButton = {
    mixins: [Shareble],
    template: `
        <button @click="share"><i class="fas fa-share-square"></i></button>
    `
}

var TextShareButton = {
    mixins: [Shareble],
    template: `
        <button @click="share">{{ buttonLabel }}</button>
    `,
    data: function(){
        return {
            buttonLabel: 'シェアする'
        }
    }
}

new Vue({
    el: '#app',
    components: {
        IconShareButton,
        TextShareButton
    }
})