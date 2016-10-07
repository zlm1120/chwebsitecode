$(function() {
	if(window.location.href.indexOf('page01-1') > 0){
		$.ajax({
			type: "get",
			url: 'http://' + window.location.host + "/chwebsite/person/body01-1.html",
			async: true,
			success: function(json) {
				$(".contentwrapper").html(json);
				$(".orderdatail").click(function() {
					var _$borther = $(this).siblings().text();
					if(_$borther==="取消订单"){	
						window.location.href="../person/page01-3.html";
					}else if(_$borther==="完成订单"){
						window.location.href="../person/page01-2.html";
					}else if(_$borther==="去评价"){
						window.location.href="../person/page01-4.html";
					}else{
						window.location.href="../person/page01-6.html";
					}
				});
			}
		});
	}
	/*
	 * 模拟复选框
	 */
	$('.checkboxcomm label').click(function() {
		var radioId = $(this).attr('name');
		$('.checkboxcomm label').removeAttr('class') && $(this).attr('class', 'checked');
		$('input[type="radio"]').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked');
	});

});