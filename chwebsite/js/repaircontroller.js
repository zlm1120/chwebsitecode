$(function() {
	//点击input，下拉框显示和 再次点击 input下拉框影藏
	$(".inputSelect").click(function() {
		var $this = $(this);
		var alertBox = $this.next();
		alertBox.css('display') == 'block' ? alertBox.hide() : alertBox.show();
	});
	//鼠标离开下拉框和 鼠标离开input， 下拉框隐藏
	var clickclose;
	$(".inputSelect").mouseenter(function() {
		clickclose = true;
	});

	$(".selectdiv").mouseenter(function() {
		clickclose = true;
	});

	$(".inputSelect").mouseout(function() {
		clickclose = false;
		hideoption(clickclose);
	});

	$(".selectdiv").mouseout(function() {
		clickclose = false;
		hideoption(clickclose);
	});

	//点击外面隐藏下拉框
	function hideoption(clickclose) {
		$(".subSelect").mouseleave(function() {
			if (!clickclose) {
				$(".selectdiv").css("display", "none");
			}
			clickclose = true;
		});
	}
});