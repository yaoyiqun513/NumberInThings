define(['jquery'], function ($) {
    function ajaxError(jqXHR, textStatus, errorThrown) {
        alert( "服务器连接失败，"+errorThrown.message );
    }
    function responseError(json) {
        if (typeof(json.error)==='string') {
            alert(json.error);
        }else{
            for(var k in json.error){
            	    $('#'+k).addClass('has-error');
            	    $('#'+k).next().html(json.error[k]).show();
            }
        }
    }
    return {
        SubmitForm:function (url, form, btn, callback, put) {
            $('#'+form+' span.error-block').hide();
            $('#'+form+' div.input-group').removeClass('has-error');
            if(put){
                this.AjaxPut(url, $('#'+form).serialize(), btn, callback);
            }else{
                this.AjaxPost(url, $('#'+form).serialize(), btn, callback);
            }
        },
        
        AjaxPost:function (url, param, btn, callback) {
            var btnTitle = $(btn).html();
            $(btn).html('请稍候...').attr('disabled','disabled');
            $.post(url, param, function (json) {
            	if(json.success){
                    callback(json);
            	}else{
            	    responseError(json);
            	}
            }, 'json')
            .fail(ajaxError)
            .always(function() {
                $(btn).html(btnTitle).removeAttr('disabled');
            });
        },
       
        AjaxPut:function (url, param, btn, callback) {
            var btnTitle = $(btn).html();
            $(btn).html('请稍候...').attr('disabled','disabled');
            $.ajax(url, {data:param,dataType:'json',method:'PUT'})
                .done(function (json) {
                	if(json.success){
                        callback(json);
                	}else{
                	    responseError(json);
                	}
                })
                .fail(ajaxError)
                .always(function() {
                    $(btn).html(btnTitle).removeAttr('disabled');
                });
        },
        
        AjaxDelete:function (url, param, btn, callback) {
            var btnTitle = $(btn).html();
            $(btn).html('请稍候...').attr('disabled','disabled');
            $.ajax(url, {data:param,dataType:'json',method:'DELETE'})
                .done(function (json) {
                	if(json.success){
                        callback(json);
                	}else{
                	    responseError(json);
                	}
                })
                .fail(ajaxError)
                .always(function() {
                    $(btn).html(btnTitle).removeAttr('disabled');
                });
        },
        
        SetupPLUploadJS:function (field, value, name) {
            $('#'+field+' input').replaceWith('<input type="text" class="form-control" style="width:86%" name="'+field+'" id="'+field+'Field" value="'+value+'" readonly="readonly"/><a id="'+field+'Btn" class="btn btn-primary" href="#" style="display:inline-block;">上传文件</a>');
            $('#'+field).next().after('<img id="'+field+'Image" style="width:200px;height:auto;margin-top:2px"'+(value?' src="/file/'+value+'/'+name+'"':'')+'/>');
            
            var uploader = new plupload.Uploader({
        }
    }
});