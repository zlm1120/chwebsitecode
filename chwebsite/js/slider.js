$(function() {
	/*代码初始化,动态生成小圆点*/
	var imgsize = $(".sliderparent .imglists li").size();
	for (var i = 0; i < imgsize; i++) {
		var li = "";
		li = "<li></li>";
		$(".cicreList").append(li);
		$(".cicreList li").first().addClass("numactive");
	}
	/*手动控制*/
	$(".imglists li").first().show();
	/*圆点鼠标移上*/
	var indexli = 0;
	$(".cicreList li").mouseover(function() {
		$(this).addClass("numactive").siblings().removeClass("numactive");
		var index = $(this).index();
		indexli = index;
		$(".imglists li").eq(index).fadeIn().siblings().fadeOut();
	});
	/*自动控制*/
	var timer = null;
	timer = setInterval(function() {
		moverigth();
	}, 2000);
	/*鼠标移入移除*/
	$(".sliderparent").mouseover(function() {
		clearInterval(timer);
	});
	$(".sliderparent").mouseout(function() {
		timer = setInterval(function() {
			moverigth();
		}, 2000);
	});
	/*move left*/
	function moveleft() {
		indexli--;
		if (indexli == -1) {
			indexli = (imgsize - 1);
		}
		$(".imglist li").eq(indexli).stop().fadeIn(500).siblings().stop().fadeOut(500);
		$(".cicreList li").eq(indexli).addClass("numactive").siblings().removeClass("numactive");
	}
	/*move rigth*/
	function moverigth() {
		indexli++;
		if (indexli == imgsize) {
			indexli = 0;
		}
		$(".imglists li").eq(indexli).stop().fadeIn(500).siblings().stop().fadeOut(500);
		$(".cicreList li").eq(indexli).addClass("numactive").siblings().removeClass("numactive");
	}
});