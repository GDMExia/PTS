const mixin = {
    methods: {
        // toast显示函数
        toastShow: function(text, fn) {
            var that = this;
            that.$vux.toast.show({
                type: 'text',
                time: 3000,
                position: 'top',
                text: text,
                width: 'auto',
                onHide: function() {
                    fn && fn();
                }
            })
        },
    }
}

export default mixin