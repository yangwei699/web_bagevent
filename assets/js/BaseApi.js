//每次调用$.get()或者$.post()或者$.ajax()时候，
//会先调用ajaxPrefilter这个函数
//在这个函数中,可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    // console.log(options.url)
    //在发起真正的ajax请求之前,同一凭借请求的根路径
    options.url='http://www.liulongbin.top:3007'+options.url
    // console.log(options.url)
})