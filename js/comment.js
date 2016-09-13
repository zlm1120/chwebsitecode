$(function() {
	var ip = 'http://101.201.222.160:8083/lzj-api/';
//var ip = 'http://192.168.1.115:8080/lzj-api/';
	$.ajax({
		type: "get",
		url: 'http://' + window.location.host + "/chwebsite/person/header.html",
		async: true,
		success: function(json) {
			$(".headerwrapper").html(json);
			var userAbout = JSON.parse(localStorage.getItem('userInfo'));
			$(".userImg").attr('src',userAbout.avatar);
			$(".userName").html(userAbout.name);
			$(".headerperson .media-object").attr('src',userAbout.avatar);
			$(".headerperson b").html(userAbout.name);
			
			if(window.location.href.indexOf('page01-1') >0){
				$('.menuProduct span').eq(0).addClass('active');
			}
			if(window.location.href.indexOf('about') > 0){
				$('.menuProduct span').eq(1).addClass('active');
			}
			if(window.location.href.indexOf('page02') >0){
				$('.menuProduct span').eq(2).addClass('active');
			}
			if(window.location.href.indexOf('notice') >0){
				$('.menuProduct span').eq(3).addClass('active');
			}
			if(window.location.href.indexOf('repair') >0){
				$('.menuProduct span').eq(4).addClass('active');
			}
			if(window.location.href.indexOf('advance') >0){
				$('.menuProduct span').eq(4).addClass('active');
			}
			if(window.location.href.indexOf('paypackage') >0){
				$('.menuProduct span').eq(5).addClass('active');
			}
			if(window.location.href.indexOf('mydata') >0){
				$('.menuProduct span').eq(6).addClass('active');
			}
			
			var $menu = $(".menuBar .userName");
//			var $floatUser = $(".floatUser");
			var $logout = $("#logout");
//			
//			$menu.click(function(){
//				$floatUser.css('display') == "block" ? $floatUser.hide() : $floatUser.show();
//			})
			
			$logout.click(function(){
				localStorage.removeItem('userInfo');
				window.location.href = '../01Login/Login.html'
			})
			
//			$(".menuBar ul li").eq(3).click(function(){
//				$(this).find('.dropList').css('display')=="block"?$(this).find('.dropList').css('display','none'):$(this).find('.dropList').css('display','block');
//		//		console.log($(this).find('.dropList').css('display')== "block")
//			})
			
			$(".houseChoose").click(function(){
				$(".floatHouse").css('display') == 'block' ? $('.floatHouse').css('display','none') : $('.floatHouse').css('display','block');
			})
			
			var userMemberId = JSON.parse(localStorage.getItem('userInfo'));
			$(".houseChange").html(userMemberId.communityShortName+userMemberId.houseNumber)
			$.ajax({
				type: "get",
				url: ip + 'api/member/house/myHome',
				async: true,
				data:{
					memberId:userMemberId.memberId
				},
				success: function(json) {
					console.log(json);
					$(".footerwrapper").html(json);
					var html = '';
					for(var i = 0;i < json.api_data.length;i++){
						if(json.api_data[i].status == 1){
							if(json.api_data[i].houseId == userMemberId.houseId){
								html +='<dd data-id="'+ json.api_data[i].houseId +'" style="color:#01BF71">' + json.api_data[i].number+ '</dd>'
							}else{
								html +='<dd data-id="'+ json.api_data[i].houseId +'">' + json.api_data[i].number+ '</dd>'
							}
						}
					}
					$(".floatHouse dl").html(html);
					$(".floatHouse dl dd").click(function(){
						$(".houseChange").html($(this).html());
						$.ajax({
							type:"get",
							url:ip+"api/index/cutHouse",
							data:{
								memberId:userMemberId.memberId,
								houseId:$(this).data('id')
							},
							async:true,
							success:function(json){
								console.log(json);
								getUserInfo()
							}
						});
					})
					function getUserInfo(){
						$.ajax({
							type:"get",
							url:ip+"api/member/profile/index",
							async:true,
							data:{
								memberId:userMemberId.memberId	
							},
							success:function(json){
								console.log(json);
								localStorage.setItem('userInfo',JSON.stringify(json.api_data));
								window.location.reload();
							}
						});
					}
				}
			});
			
		}
	});
	$.ajax({
		type: "get",
		url: 'http://' + window.location.host + "/chwebsite/commentPage/footer.html",
		async: true,
		success: function(json) {
			$(".footerwrapper").html(json);
		}
	});
});