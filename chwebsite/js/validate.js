/**
 * Created by Administrator on 2016/6/14 0014.
 */
var validator = new Validator('loginform', {
    fields: {
        phone: {
            rules: 'required | is_phone',
            messages: "不能为空 | 用户名错误"
        },
        code: {
            rules: 'required',
            messages: "不能为空 | 验证码错误"
        },
        pass: {
            rules: 'required | max_length(16)',
            messages: "不能为空 |不能超过 {{param}} 个字符 "
        }
    },
    // 参数：errorEl 错误信息节点，fieldEl 出现错误的表单节点
    errorPlacement: function (errorEl, fieldEl) {
        // 非 label 、radio 元素
        if (fieldEl.parentNode !== undefined) {
            fieldEl.parentNode.appendChild(errorEl);
        }
    },
    callback: function (event, errors) {
		console.log(errors);
        var submitButton = event.target['submit'];
        removeClass(submitButton, 'btn-primary');
        // 如果错误为空
        if (!errors) {
            // 演示阻止表单提交
            validator.preventSubmit();
            // 设置成功按钮样式
            removeClass(submitButton, 'btn-danger');
            addClass(submitButton, 'btn-success');
            submitButton.value = '验证成功';
        } else {
            // 设置错误按钮样式
            removeClass(submitButton, 'btn-success');
            addClass(submitButton, 'btn-danger');
            submitButton.value = '验证失败';
        }

    }

});