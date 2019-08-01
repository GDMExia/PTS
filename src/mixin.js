const mixin = {
    methods: {
        // toast显示函数
        toastShow: function(text, fn) {
            var that = this;
            that.$vux.toast.show({
                type: 'text',
                time: 3000,
                // position: 'top',
                text: text,
                width: 'auto',
                onHide: function() {
                    fn && fn();
                }
            })
        },
        GetQueryString: function (name) {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        }
    }
}

export default mixin