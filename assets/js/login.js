

$(function(){
    //点击注册账号的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
   //点击注册账号的链接
   $('#link_login').on('click',function(){
    $('.login-box').show()
    $('.reg-box').hide()
 })
 
 //从layui 中获取 form对象
  var form=layui.form
  var layer=layui.layer
  //通过form.verify()函数自定义验证规则
  form.verify({
    //自定义了一个叫做pwd验证规则
    pwd:[/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格']
    ,
    //校验俩次密码是否一致的规则
    repwd:function(value){
        //通过形参拿到确认密码框中的内容

        //还需要拿到密码框中的内容
        //然后进行一次等于的判断
        //如果判断失败，放回return在发送一个消息
        var pwd=$('.reg-box [name=password]').val()
        if(pwd!=value){
            return '俩次密码不一致'
        }
    }
})
 
//  监听注册表单的提交事件 并且发起ajax请求

$('#form_reg').on('submit',function(e){
    var data={username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
    e.preventDefault()
    $.post('/api/reguser',data,function(res){
        if(res.status !==0){
            // return console.log(res.message)
            return layer.msg(res.message)
        }
       layer.msg('注册成功,请登录')
       //模拟人的点击行为
       $('#link_login').click()

    })
})

$("#form_login").submit(function(e){
    //阻止默认提交行为
    e.preventDefault()
    $.ajax({
        url:'/api/login',
        method:'POST',
        //快速获取表单中的数据
        // data:{username:$('#form_login [name=username]').val(),password:$('#form_login [name=password]').val()},
        data:$(this).serialize(),
        success:function(res){
            if(res.status !==0){
                return layer.msg('登录失败！')
            }
            layer.msg('登录成功')
            //登录成功得到token字符串，保存到localStorage中
            localStorage.setItem('token',res.token)
            // console.log(res.token)
            location.href='./index.html'
        }
    })
})
  
})
