$(function() {
	var avatar = localStorage.getItem('avatar');//头像
	var userinfor = JSON.parse(localStorage.getItem('userInfo'));
	
	$(".labelGroup label").click(function(){
		$(".labelGroup label").removeClass('checked');
		$(this).addClass('checked');
	})

	$(".leftnav a").click(function() {
		$(this).addClass("clickclass").siblings().removeClass("clickclass");
	});
	//鼠标移上样式
	$(".imgBox img").mouseenter(function(){
		$(this).next().show().addClass('hoverimg');
	});
	$(".imgBox .imgGrey").mouseleave(function(){
		$(".imgBox img").next().hide().removeClass('hoverimg');
	});
	//点击编辑按钮出现input
	$(".editeBtn").click(function(){
		userinfor = JSON.parse(localStorage.getItem('userInfo'));
		if($(this).html() == '编辑'){
			
		
		$(this).css("text-decoration","none").text("保存");
		
		if(userinfor.name == ''){
			$(".usrnamediv input").val(userinfor.username)
		}else{
			$(".usrnamediv input").val(userinfor.name)
		}
		
		//$(".imgBox img").attr("src",data.)
		$(".phonediv input").val(userinfor.mobile);

		
		$(".listdata label").hide();
		$("#account").show();
		$("b").hide();
		$(".labelGroup").css('display','inline-block');
		$(".labelGroup label").show();
		$(".listdata input").show();
		}else{
			getdata();
		}
		
	});
	//页面打开的时候请求数据，调用接口
	var uersinformatio=JSON.parse(localStorage.getItem('userInfo'));
	function getUserData(){
	$.ajax({
		type:"get",
		url:ip+'/api/member/profile/index',
		async:false,
		data:{memberId:userinfor.memberId},
		dataType:"json",
		success:function(json){
			var data=json.api_data;
			localStorage.removeItem("userInfo");
			localStorage.setItem("userInfo",JSON.stringify(data));
			$(".imgBox img").attr('src',data.avatar);				
			
			if(userinfor.name===""){
				$(".usrnamediv label").html(data.username);
			}else{
				$(".usrnamediv label").html(data.name);
			}
			$(".account label").html(data.username)
			if(userinfor.gender=="0"){
				$(".genderdiv b").html('男');
				$(".labelGroup label").eq(0).addClass('checked')
			}else{
				$(".genderdiv b").html('女');
				$(".labelGroup label").eq(1).addClass('checked')
			}
			$(".phonediv label").html(data.mobile);
		},
		error:function(){}
	});
	}
	getUserData();
	//点击保存按钮保存数据
	function getdata(){

		var memberId=userinfor.memberId;
		var name=$(".usrnamediv input").val();
		var $name = $(".usrnamediv");
		var $phone = $(".phonediv");
		var $em = $(".listdata em");
		var phone=$(".phonediv input").val();
		
		var sex=$(".genderdiv .labelGroup label.checked").data('index');

		
		if(name.length < 1 || name.length > 12){
			$name.find('em').show();
			return false;
		}
		if(!isMobile.test(phone)){
			$em.hide();
			$phone.find('em').show();
			return false;
		}
		
		$.ajax({
			type:"get",
			url:ip+'/api/member/profile/edit',
			async:true,
			dataType:"json",
			data:{
				memberId:memberId,
				name:name,
				mobile:phone,
				gender:sex
			},
			success:function(json){
				console.log(json);
				if(json.api_code == 0){
					getUserData();
					window.location.reload();
				}
			},
			error:function(){}
		});
	}
});