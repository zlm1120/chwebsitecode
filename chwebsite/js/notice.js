var webapp = angular.module('webapp', ['ngRoute']);
//通知通告
webapp.controller('mynoticeCtr', function($scope, $http) {
	$scope.uerdata = JSON.parse(localStorage.getItem('userInfo'));
	//物业公告
	$scope.wuyeNotice = function() {
		$http({
				method: 'GET',
				url: ip + 'api/member/notice/list',
				params: {
					memberId: $scope.uerdata.memberId,
					houseId: $scope.uerdata.houseId
				}
			})
			.success(function(json) {
				$scope.consize = json.api_data.length;
				$scope.noticedata = json.api_data;
				//			$scope.aa = 2;
			});
	}
	$scope.wuyeNotice();

	//通知消息
	$scope.notices = function() {}
		//绑定点击事件
	$scope.clickspans = function(type) {
		if(type == 1) {
			$scope.wuyeNotice();
		} else if(type == 2) {
			//$scope.notices();
		} else {

		}
	}

})

//我的资料
webapp.controller('mypersoncenter', function($scope) {
	var avatar = localStorage.getItem('avatar'); //头像
	var userinfor = JSON.parse(localStorage.getItem('userInfo'));

	$(".labelGroup label").click(function() {
		$(".labelGroup label").removeClass('checked');
		$(this).addClass('checked');
	})

	$(".leftnav a").click(function() {
		$(this).addClass("clickclass").siblings().removeClass("clickclass");
	});
	//鼠标移上样式
	$(".imgBox img").mouseenter(function() {
		$(this).next().show().addClass('hoverimg');
	});
	$(".imgBox .imgGrey").mouseleave(function() {
		$(".imgBox img").next().hide().removeClass('hoverimg');
	});
	//点击编辑按钮出现input
	$(".editeBtn").click(function() {
		userinfor = JSON.parse(localStorage.getItem('userInfo'));
		if($(this).html() == '编辑') {

			$(this).css("text-decoration", "none").text("保存");

			if(userinfor.name == '') {
				$(".usrnamediv input").val(userinfor.username)
			} else {
				$(".usrnamediv input").val(userinfor.name)
			}

			//$(".imgBox img").attr("src",data.)
			$(".phonediv input").val(userinfor.mobile);

			$(".listdata label").hide();
			$("#account").show();
			$("b").hide();
			$(".labelGroup").css('display', 'inline-block');
			$(".labelGroup label").show();
			$(".listdata input").show();
		} else {
			getdata();
		}

	});
	//页面打开的时候请求数据，调用接口
	var uersinformatio = JSON.parse(localStorage.getItem('userInfo'));

	function getUserData() {
		$.ajax({
			type: "get",
			url: ip + '/api/member/profile/index',
			async: false,
			data: {
				memberId: userinfor.memberId
			},
			dataType: "json",
			success: function(json) {
				var data = json.api_data;
				localStorage.removeItem("userInfo");
				localStorage.setItem("userInfo", JSON.stringify(data));
				$(".imgBox img").attr('src', data.avatar);

				if(userinfor.name === "") {
					$(".usrnamediv label").html(data.username);
				} else {
					$(".usrnamediv label").html(data.name);
				}
				$(".account label").html(data.username)
				if(userinfor.gender == "0") {
					$(".genderdiv b").html('男');
					$(".labelGroup label").eq(0).addClass('checked')
				} else {
					$(".genderdiv b").html('女');
					$(".labelGroup label").eq(1).addClass('checked')
				}
				$(".phonediv label").html(data.mobile);
			},
			error: function() {}
		});
	}
	getUserData();
	//点击保存按钮保存数据
	function getdata() {

		var memberId = userinfor.memberId;
		var name = $(".usrnamediv input").val();
		var $name = $(".usrnamediv");
		var $phone = $(".phonediv");
		var $em = $(".listdata em");
		var phone = $(".phonediv input").val();

		var sex = $(".genderdiv .labelGroup label.checked").data('index');

		if(name.length < 1 || name.length > 12) {
			$name.find('em').show();
			return false;
		}
		if(!isMobile.test(phone)) {
			$em.hide();
			$phone.find('em').show();
			return false;
		}

		$.ajax({
			type: "get",
			url: ip + '/api/member/profile/edit',
			async: true,
			dataType: "json",
			data: {
				memberId: memberId,
				name: name,
				mobile: phone,
				gender: sex
			},
			success: function(json) {
				console.log(json);
				if(json.api_code == 0) {
					getUserData();
					window.location.reload();
				}
			},
			error: function() {}
		});
	}
})

//修改头像
webapp.controller('updatauserimg', function($scope) {
	$("#upLoadBtn").click(function(){
		$("#fileBtn").trigger('click');
	})
	$(".baocunbtn").click(function() {
		if($('#fileBtn').val().length == 0) {
			alert('请上传照片')
		} else {
			$("#form1").ajaxSubmit({
				type: 'post',
				url: ImgIp+'upload/submit',
				dataType: "json",
				success: function(json) {
					if(json.api_code == 0) {
						updatimg(json.api_data.url[0]);
						window.location.href = '#/center/9'
					}

				},
				error: function() {}
			});
		}
	});
});

var imgs = JSON.parse(localStorage.getItem('userInfo'));

function addPreview(source, className) {

	var file = source.files[0];
	console.log(source);
	if(window.FileReader) {
		var fr = new FileReader();
		fr.onloadend = function(e) {
			$("." + className).attr("src", e.target.result);
		};
		fr.readAsDataURL(file);
	}
}

function updatimg(img) {

	$.ajax({
		type: "get",
		url: ip + '/api/member/profile/edit',
		async: true,
		dataType: "json",
		data: {
			memberId: imgs.memberId,
			avatar: img
		},
		success: function(json) {
			console.log(json);
		},
		error: function() {}
	});

}

//我的家
var memberId = JSON.parse(localStorage.getItem('userInfo'));
webapp.controller("homeCtrl", function($scope, $http) {
		//点击option
		$scope.memberInfo = memberId;
		
		$scope.selectOption = function(name, id, type) {
				if (type == 1) {
					$scope.InputProVal = name;
					$scope.InputProid=id;
					$scope.InputCityVal = '';
					$scope.InputCityId= '';
					$scope.InputcommnityId='';
					$scope.InputcommnityVal = '';
					$scope.getCityId(id);
				} else if (type == 2) {
					$scope.InputCityVal = name;
					$scope.InputCityId=id;
					$scope.getAreaId(id);
					$scope.InputcommnityId='';
					$scope.InputcommnityVal = '';
				} else if (type == 3) {
					$scope.InputcommnityId=id;
					$scope.InputcommnityVal = name;
				}
			}
		//点击input
		$scope.clickinput=function(id,type){
			console.log(id+"djfdufh");
			if(type==1){
				if(id==null || id==""){
					$scope.proMessage="请选择省份";
					$scope.isshow=false;
				}else{
					$scope.proMessage="";
					$scope.isshow=true;
				}
			}else if(type==2){
				if(id==null || id==""){
					$scope.cityMessage="请选择城市";
				}else{
					$scope.cityMessage="";
				}
			}
		}
			//省
		$scope.getProId = function() {
			$http({
					method: 'GET',
					url: ip + 'api/common/getProvinces',
				})
				.success(function(json) {
					$scope.pros = json.api_data;
				})
		}
		$scope.getProId();
		//市
		$scope.getCityId = function(id) {
				$http({
						method: 'GET',
						url: ip + 'api/common/getAreas',
						params: {
							areaId: id
						}
					})
					.success(function(json) {
						console.log(json);
						$scope.citys = json.api_data;
					})
			}
		//小区
		$scope.getAreaId = function(id) {
			$http({
					method: 'GET',
					url: ip + 'api/community/list',
					params: {
						areaId: id
					}
				})
				.success(function(json) {
					console.log(json);
					$scope.commnitynames = json.api_data;
				})
		}
		//点击添加
		$scope.personame="";
		$scope.number="";
		$scope.type=0;
		$scope.gettype=function(n){
			$scope.type=n;
		}
		var numbers = /(\d{2})-(\d{2})-(\d{4})/;
		
		
		
		var privice="";
		var citys=""
		
		$scope.addhouse=function(){
			$scope.communityId=$scope.InputcommnityId;
			privice=$(".privoce").val();
			citys=$(".citys").val();
			//判断
			if(privice=="" || privice==undefined){
				$scope.proMessage="请选择省份";
				return false;
			}else{
				$scope.proMessage="";
			}
			if(citys=="" || citys==undefined){
				$scope.cityMessage="请选择城市";
				return false;
			}else{
				$scope.cityMessage="";
			}
			
			if($scope.communityId=="" || $scope.communityId==undefined){
				$scope.commnityinfor="请选择小区";
				return false;
			}else{
				$scope.commnityinfor="";
			}
			if($scope.personame=="" && $.trim($scope.personame) == "" && $scope.personame.length > 1 && $scope.personame.SVGAnimatedLengthList <12){
				$scope.nameinfor="请填写真实姓名，姓名长度1-12个字符";
				return false;
			}else{
				$scope.nameinfor="";
			}
			
			if($scope.number=="" || $scope.number.indexOf('-') == 0 || $scope.number.indexOf('-') == ($scope.number.length -1) || $scope.number.indexOf('-') == -1 ){
				$scope.numberinfor="填写格式1-3-1702";
				return false;
			}else{
				$scope.numberinfor="";
			}
			//else{
				$scope.numberinfor="";
				$http({
					method:'GET',
					url:ip+'api/member/house/submit',
					params:{
						memberId:memberId.memberId,
						communityId:$scope.communityId,
						name:$scope.personame,
						number:$scope.number,
						type:$scope.type
					}
				})
				.success(function(json){
					if(json.api_code == 0){
						$scope.ishowshade=false;
						window.location.reload();
					}else{
						alert(json.api_message);
					}
				})
			//}
		}
		//我的家
		$scope.muhouse=function(){
			$http({
				method:'GET',
				url:ip+'api/member/house/myHome',
				params:{
					memberId:memberId.memberId,
				}
			})
			.success(function(json){
				console.log(json);
				$scope.housesdata=json.api_data;
				
				$scope.relation = [
					{id:0,name:"业主",class:'greenBg'},
					{id:1,name:"家属",class:'blue'},
					{id:2,name:"租客",class:'redtext'}
				]
			})
		}
		$scope.muhouse();
		
		
		//业主授权&重新授权
		//重新授权
		$scope.setAllowed = function(n,type){
			alertBox('您确定要授权吗？',2)
			$(".confirm").click(function(){
				$http({
					method:'GET',
					url:ip+'api/member/house/accredit',
					params:{
						memberId:memberId.memberId,
						memberHouseId:n,
						status:type
					}
				})
				.success(function(json){
					console.log(json)
					$(".alertBox").remove();
					$scope.muhouse();
				})				
			})
			$(".cancel").click(function(){
				$(".alertBox").remove();
			})
			
		}
		
		$scope.reAllowed = function(n){
			alertBox('您确定要重新申请授权吗？',2)
			$(".confirm").click(function(){
				$http({
					method:'GET',
					url:ip+'api/member/house/reApply',
					params:{
						memberId:memberId.memberId,
						memberHouseId:n,
					}
				})
				.success(function(json){
					console.log(json)
					$(".alertBox").remove();
					$scope.muhouse();
				})				
			})
			$(".cancel").click(function(){
				$(".alertBox").remove();
			})
		}
		
		//解绑
		$scope.cancelAllowed = function(n){
			alertBox('您确定要对该用户解绑吗？',2)
			$(".confirm").click(function(){
				$http({
					method:'GET',
					url:ip+'api/member/house/unbind',
					params:{
						memberId:memberId.memberId,
						memberHouseId:n
					}
				})
				.success(function(json){
					console.log(json)
					$(".alertBox").remove();
					$scope.muhouse();
				})				
			})
			$(".cancel").click(function(){
				$(".alertBox").remove();
			})
			
		}
		
		//删除房产关系
		$scope.deleteRelation = function(n){
			alertBox('您确定要删除吗？',2)
			$(".confirm").click(function(){
				$http({
					method:'GET',
					url:ip+'api/member/house/delete',
					params:{
						memberId:memberId.memberId,
						memberHouseId:n
					}
				})
				.success(function(json){
					console.log(json)
					$(".alertBox").remove();
					$scope.muhouse();
				})				
			})
			$(".cancel").click(function(){
				$(".alertBox").remove();
			})
		}
		
		//租户退出房产关系
		$scope.quitRelation = function(n){
			alertBox('您确定要退出吗？',2)
			$(".confirm").click(function(){
			$http({
				method:'GET',
				url:ip+'api/member/house/quit',
				params:{
					memberId:memberId.memberId,
					memberHouseId:n
				}
			})
			.success(function(json){
				$(".alertBox").remove();
				$scope.muhouse();
				console.log(json);
			})
			});
			$(".cancel").click(function(){
				$(".alertBox").remove();
			})
		}
		
		
			
$(function() {
	//点击 添加房产出现弹出框，和点击shade和取消隐藏弹出框
	$(".conwrapperTitle a").click(function() {
		$(".mydelog").css("display", "block");
		$(".shade").show();
	});
	//弹框影藏
	$(".shade").click(function() {
		$(".shade").hide();
		$(".mydelog").hide();
	});
	$(".closebtn").click(function() {
			$(".shade").hide();
			$(".mydelog").hide();
		})
		//点击input，下拉框显示和 再次点击 input下拉框影藏
	$(".commnityname input").click(function() {
		var $this = $(this);
		var alertBox = $this.next();
		alertBox.css('display') == 'block' ? alertBox.hide() : alertBox.show();
	});
	//鼠标离开下拉框和 鼠标离开input， 下拉框隐藏
	var clickclose;
	$(".commnityname input").mouseenter(function() {
		clickclose = true;
	});

	$(".commnityname input").mouseout(function() {
		clickclose = false;
		hideoption(clickclose);
	});

	$(".commnityname .selectGroup").mouseenter(function() {
		clickclose = true;
	});

	$(".commnityname .selectGroup").mouseout(function() {
		clickclose = false;
		hideoption(clickclose);
	});

	//点击外面隐藏下拉框
	function hideoption(clickclose) {
		$(".mydelog").click(function() {
			if (!clickclose) {
				$(".commnityname").find(".selectGroup").css("display", "none");
			}
			clickclose = true;
		});
	}
	//点击左边导航添加样式
	$(".leftnav a").click(function() {
		$(this).addClass("clickclass").siblings().removeClass("clickclass");
	});
	//模拟单选框
	$('.checkboxcomm label').click(function() {
		var radioId = $(this).attr('name');
		$('.checkboxcomm label').removeAttr('class') && $(this).attr('class', 'checked');
		$('input[type="radio"]').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked');
	});
	
	
	
});
		
})

webapp.directive('gethouseuser',function($http){
	return{
		link:function(scope,elem,attrs){
			console.log(attrs.dataid)
			$http({
				method:'GET',
				url:ip+'api/member/house/members',
				params:{
					memberId:memberId.memberId,
					memberHouseId:attrs.dataid
				}
			})
			.success(function(json){
				console.log(json);
				//
				if(json.api_code == 0){
					scope.relmembers =json.api_data.members;
				}
				scope.actStatus = [
					{id:0,name:'未授权'},
					{id:1,name:'已授权'},
					{id:2,name:'拒接'},
					{id:3,name:'已解绑'},
					{id:4,name:'已退出'}
				];
				
				scope.allows = [
					{rel:0,status:0,text:'物业还没有通过授权，请耐心等待吧！'},
					{rel:1,status:0,text:'业主还没有通过授权，请耐心等待吧！'},
				]
			})
		}
	}
})



//修改登录密码
webapp.controller('loginpwd',function($scope){
	var userInfo = JSON.parse(localStorage.getItem('userInfo'));
		$(".pwd label").html(userInfo.username);
		$(".valiInput").next().click(function() {
			getvali();
		})

		function getvali() {
			var inputphone = $(".item label").html();
			secEndTime($('.item button'))
			$.ajax({
				type: "post",
				url: ip + 'api/common/getCode',
				async: true,
				cache: false,
				dataType: "json",
				data: {
					mobile: inputphone
				},
				success: function(json) {
					if(json.api_code == "0") {
						$(".valiInput").val(json.api_data);
						console.log(json);

					} else {
						$("#mycode").html("<font color='red'>" + json.api_message + "</font>");
					}
				},
				error: function(json) {}
			});
		}

		var sec, int;
		var cutdown = function() {
			sec--;
			$(".item button").html(sec + 's');
			if(sec < 1) {
				$(".item button").css('background', '#01BF71');
				$(".item button").html('获取验证码');
				clearInterval(int);
				$(".item button").removeClass('mui-disabled');
			}
		}

		function secEndTime(obj) {
			obj.addClass('mui-disabled')
			sec = 59;
			$(".item button").html(sec + 's');
			//  obj.off();
			int = setInterval(function() {
				cutdown();
			}, 1000);
			$(".item button").css('background', '#cccccc');
		}

		
		var regs = /^[a-zA-Z]\w{6,12}$/;
		
		
		function correctVali(){
			var inputphone = $(".item label").html();
			$.ajax({
				type: "post",
				url: ip + 'api/common/validateCode',
				async: true,
				cache: false,
				dataType: "json",
				data: {
					mobile: inputphone,
					code:$(".valiInput").val()
				},
				success: function(json) {
					if(json.api_code == 0){
						$(".pwd .item").eq(1).find('em').html('')

					}else{
						$(".pwd .item").eq(1).find('em').html(json.api_message)
						return false;
					}
				}
			});
		}
		
		
		function resetLoginPwd() {
			var $pwd = $(".pwd .item").eq(2).find('input');
			var $confirm = $(".pwd .item").eq(3).find('input');
			correctVali();
			
			if(!regs.test($pwd.val())){
				$pwd.next().html('请输入以字母开头的6-12位字母和数字');
				return false;
			}
			$pwd.next().html('');
			if($pwd.val() != $confirm.val()){
				$confirm.next().html('两次密码输入不一致，请重新输入');
				return false;
			}
			$confirm.next().html('');
			$.ajax({
				type: "get",
				url: ip + 'api/member/profile/loginPassword',
				async: true,
				cache: false,
				dataType: "json",
				data: {

					username: userInfo.username,
					password: $('.confirmPwd').val(),
					validateCode: $('.valiInput').val()
				},
				success: function(json) {
					if(json.api_code == "0") {

						console.log(json);

					} else {
						$("#mycode").html("<font color='red'>" + json.api_message + "</font>");
					}
				},
				error: function(json) {}
			});
		}

		$(".opera .confirm").click(function() {
			resetLoginPwd()
		})
})

//修改支付密码
webapp.controller('paymentPwdCtr', function($scope, $http) {
	$scope.uerdatas = JSON.parse(localStorage.getItem('userInfo')); //获取登录时存的localStorage
	//判断用户是否设置了支付密码，如果没有显示setPayPwd的内容，如果有就显示modeChange的内容
	if($scope.uerdatas.hasPayPassword) { //有支付密码
		$(".setPayPwd").css("display", 'none'); //设置支付密码div隐藏
		//给modeChange下的title的span绑定点击事件，如果点击了记得原支付密码Originalpwdx显示，忘记原支付密码content显示
		$(".modeChange .title span").click(function() {
			var dataindex;
			$(this).addClass("active").siblings().removeClass("active");
			if($(this).hasClass("active")) {
				dataindex = $(this).data("index");
			}
			if(dataindex == '1') {
				$(".modeChange .content").hide();
				$(".modeChange .Originalpwd").show();
				$(".modeChange .Originalpwd .confirm").click(function() {
					$scope.btnclick('Originalpwd');
				})
			} else {
				$(".modeChange .Originalpwd").hide();
				$(".modeChange .content").show();
			}
		});
	} else {
		$(".setPayPwd").show();
		$(".modeChange").hide();
	}
	//点击验证码的时候调用验证码接口
	$scope.verCodeClick = function() {
			$http({
					method: 'GET',
					url: ip + 'api/common/getCode',
					params: {
						mobile: $scope.uerdatas.username
					}
				})
				.success(function(json) {
					$scope.valicode = json.api_data;
					$(".changePayPwd .code input").next().next().text('');
				})
		}
		//input blur事件验证验证码
	function VerificationBlyr(type) {
			$http({
				method: 'GET',
				url: ip + 'api/common/validateCode',
				params: {
					mobile: $scope.uerdatas.username,
					code: $scope.valicode
				}
			})
			.success(function(json) {
				if(json.api_code == '0') {
					$(".changePayPwd .code input").next().next().text('');
					setPayPwd(type);
				} else {
					$(".changePayPwd .code input").next().next().text(json.api_message);
				}

			});

	}
	//验证密码是否输入格式正确，长度为6到12位
	var regs = /^[a-zA-Z]\w{6,12}$/;
	$(".payPwd").delegate(".inputpwd input[type=password]", 'blur', function() {
		if(regs.test($(this).val())) {
			$(this).next().text('');
		} else {
			$(this).next().text("请输入以字母开头的6-12位子母和数字");
		}
	});
	//验证再次输入支付密码
	$(".payPwd").delegate(".secoundpwd input[type=password]", 'blur', function() {
		var scoundpwd = $(this).val();
		var firstpwd = $(this).parent().prev().find("input[type=password]").val();
		console.log("firstpwd=" + firstpwd + "scoundpwd" + scoundpwd);
		if(scoundpwd != firstpwd) {
			$(this).next().text("两次输入密码不一样");
		} else {
			$(this).next().text('');
		}
	});
	//点击确定按钮,如果没用支付密码
	$scope.btnclick = function(type) {
		if(type == 1) {

			if($(".changePayPwd .code input").val() == '' || $(".changePayPwd .code input") == undefined) {
				$(".changePayPwd .code input").next().next().text("请输入验证码！");
			} else {
				VerificationBlyr(type);
			}
		} else if(type == 2) {
			if($(".changePayPwd .foreverPwd input").val() == '' || $(".changePayPwd .foreverPwd input").val() == undefined) {
				$(".changePayPwd .foreverPwd input").next().next().text("请输入原密码！");
			} else {
				valiForeverPwd(type);

			}
		} else {
			setPayPwd(type);
		}
	}

	function valiForeverPwd(type) {
		var status;
		$(".changePayPwd .foreverPwd input").next().next().text('');
		$http({
				method: 'GET',
				url: ip + 'api/member/profile/validatePayPassword',
				params: {
					memberId: $scope.uerdatas.memberId,
					password: $(".changePayPwd .foreverPwd input").val()
				}
			})
			.success(function(json) {

				if(json.api_code == 0) {
					status = true;
					$(".changePayPwd .foreverPwd input").next().text('');
					setPayPwd(type);
				} else {
					status = false;
					$(".changePayPwd .foreverPwd input").next().text(json.api_message);

				}
			})
		return status;
	}

	function setPayPwd(type) {
		if(!regs.test($(".changePayPwd .inputpwd input").eq(type).val())) {
			$(".changePayPwd .inputpwd input").next().text("请输入以字母开头的6-12位子母和数字");
		} else if($(".changePayPwd .secoundpwd input").eq(type).val() != $(".changePayPwd .inputpwd input").eq(type).val()) {
			$(".changePayPwd .inputpwd input").next().text(" ");
			$(".changePayPwd .secoundpwd input").eq(type).next().text("两次输入密码不一样！");
		} else {
			$(".changePayPwd .secoundpwd input").eq(type).next().text("");
			$http({
					method: 'GET',
					url: ip + 'api/member/profile/payPassword',
					params: {
						memberId: $scope.uerdatas.memberId,
						password: $(".changePayPwd .inputpwd input").eq(type).val()
					}
				})
				.success(function(json) {
					console.log(json);
					if(json.api_code == 0) {
						alert('成功')
					}
				})
		}
	}

});

//我的抢相应
webapp.controller('listCtr',function($http,$scope){
	$scope.userdatas=JSON.parse(localStorage.getItem('userInfo'));
	$http({
		method:'GET',
		url:ip+'api/member/cheap/list',
		params:{
			memberId:$scope.userdatas.memberId,
			communityId:$scope.userdatas.communityId
		}
	})
	.success(function(json){
		console.log(json);
		$scope.data=json.api_data;
	})
})

var userInfoDetail = JSON.parse(localStorage.getItem('userInfo'));
webapp.directive('aaa', function(){
	return function(scope,$element,attr){

		$element.bind('click',function(){

			$element.parent().children().removeClass('active');
			$element.addClass('active');
			
		})
	}
})

//报修列表
webapp.controller('userJF',function($scope,$http){
	//菜单
	$scope.liIndex = 0;
	$scope.menus = [
		//{id:0,status:'全部'},
		{id:0,status:'未确认',Text:'待处理',color:'repairGreen',btns:[{btnName:'提醒物业',color:'btnOrange'},{btnName:'取消报修',color:'btnGreen'}]},
		{id:1,status:'已确认',Text:'处理中',color:'repairGreen',btns:[{btnName:'取消报修',color:'btnGreen'},{btnName:'催促物业',color:'btnOrange'}]},
		{id:2,status:'处理中',Text:'处理中',color:'repairGreen',btns:[{btnName:'取消报修',color:'btnGreen'},{btnName:'催促物业',color:'btnOrange'}]},
		{id:3,status:'未支付',Text:'待支付',color:'repairOrange',btns:[{btnName:'去支付',color:'btnOrange'}]},
		{id:4,status:'部分支付',Text:'待支付',color:'repairOrange',btns:[{btnName:'继续支付',color:'btnOrange'}]},
		{id:5,status:'已支付',Text:'已支付',color:'repairBlack',btns:[{btnName:'去评价',color:'btnOrange'}]},
		{id:6,status:'处理完成',Text:'处理完成',color:'repairBlack'},
		{id:7,status:'已取消',Text:'已取消',color:'repairBlack'}
	];
	//列表内容
	$scope.items = '';

	$scope.mydata=JSON.parse(localStorage.getItem("userInfo"));
	getpersondata();
	
	console.log($scope.mydata)
	getData($scope.mydata.houseId);
	
	$scope.tabSwitch = function(a){
		$scope.liIndex = a;
	}
	function getData(houseId){
		$http({
			method:'GET',
			url:ip+'api/member/repair/list',
			params:{
				'memberId':$scope.mydata.memberId,
				'houseId':houseId
			}
		})
		.success(function(json){
			$scope.items = json.api_data;
		})
		.error(function(json){
			console.log(json);
		})
	}
//	getData($scope.mydata.houseId);
	
	
	//预约报修，选择位置
	$http({
		method:'GET',
		url:ip+'api/member/house/myHome',
		params:{
			memberId:$scope.mydata.memberId
		}
	})
	.success(function(json){
		console.log(json);
		$scope.myhousedata=json.api_data;
	})
	
	//点击下拉框赋值
	$scope.clickoption=function(id){
		console.log(id);
			$scope.inputselect=name;
			$scope.inputid=id;
			getData(id);
	}
	
	//获取个人资料
	function getpersondata(){
		$http({
			method:'GET',
			url:ip+'api/member/profile/index',
			params:{
				memberId:$scope.mydata.memberId
			}
		})
		.success(function(json){
			console.log(json+"dkifjf");
			$scope.balance=json.api_data.balacne;
			if(json.api_code=='0'){
				$scope.houseid=json.api_data.houseId;
				localStorage.setItem('userInfo',JSON.stringify(json.api_data));

			}
		})
	}

	
	//页面跳转
	$scope.itemDetail = function(id){
		window.location.href = '#/repairInfo/'+id;
	}
	//获取支付类型
	$scope.paytype=1;
	$scope.typefun=function(n,type){
		if(type==0){
			$scope.amountMoney = $scope.balance - $scope.moneys;
		}else{
			$scope.amountMoney = $scope.balance;
		}
		$scope.paytype=n;
	}
	//提醒报修
	$scope.Remind=function(id,name,money){
		if(name=="提醒物业"){
			//提醒报修
			$http({
				method:'GET',
				url:ip+'api/member/repair/remind',
				params:{
					memberId:$scope.mydata.memberId,
					repairId:id
				}
			})
			.success(function(json){
				$(".remind").show();
				$(".shade").show();
				$scope.clickinfor();
				getData($scope.mydata.houseId);
			})
		}
		if(name=="取消报修"){
			$http({
				method:'GET',
				url:ip+'api/member/repair/cancel',
				params:{
					memberId:$scope.mydata.memberId,
					repairId:id
				}
			})
			.success(function(json){
				$(".closediv").show();
				$(".shade").show();
				$scope.clickinfor();
				getData($scope.mydata.houseId);
			})
		}
		if(name=="催促物业"){
			$http({
				method:'GET',
				url:ip+'api/member/repair/urge',
				params:{
					memberId:$scope.mydata.memberId,
					repairId:id
				}
			})
			.success(function(json){
				$(".urge").show();
				$(".shade").show();
				$scope.clickinfor();
				getData($scope.mydata.houseId);
			})
		}
		if(name=="去支付" || name=="继续支付"){
			$(".shade").show();
			$(".paydiv").show();
			$scope.moneys=money;
			console.log($scope.moneys);
			$(".btnpay").click(function(){
				$http({
					method:'GET',
					url:ip+'api/member/repair/payment',
					params:{
						memberId:$scope.mydata.memberId,
						repairId:id,
						paymentMethod:$scope.paytype
					}
				})
				.success(function(json){
					$(".paydiv").hide();
					$(".shade").hide();
					alert('支付成功');
					getData($scope.mydata.houseId);
				})
			})
		}
		if(name=="去评价"){
			window.location.href="repairestimate.html?id=" + id+"&memberid="+$scope.mydata.memberId;
		}
	}
	$scope.clickinfor=function(){
		$(".shade").click(function(){
			$(".commentinfor").hide();
			$(this).hide();
		});
	}
	
	
	//点击图片放大
	$scope.setbigimg=function(imgsrc){
		var html = '<div class="shade" style="display:block"></div>'+
					'<div class="imgbig commentinfor" style="width: 200px; height: 200px;display:block">'+
						'<img src="'+ imgsrc +'" style="width: 100%;height: 100%;" />'+
					'</div>'
		$('body').append(html);			
		$(".shade").click(function(){
			$(this).remove();
			$(".imgbig").remove();
		});
	}
})
//投诉留言
webapp.controller('personAdCtrl',function($scope,$http){
	$scope.mydata=JSON.parse(localStorage.getItem("userInfo"));
	$scope.infor=JSON.parse(localStorage.getItem("userInfo"));
	$scope.getDataslist=function(id){
		$http({
			method:'GET',
			url:ip+'api/member/complaint/list',
			params:{
				memberId:$scope.infor.memberId,
				houseId:id,
				pageNumber:1
			}
		})
		.success(function(json){
			console.log(json);
			if(json.api_code == 0){
				$scope.itemAds = json.api_data;
			}
		})
		
	}
	$scope.getDataslist($scope.mydata.houseId);
	//预约报修，选择位置
	$http({
		method:'GET',
		url:ip+'api/member/house/myHome',
		params:{
			memberId:$scope.infor.memberId
		}
	})
	.success(function(json){
		console.log(json);
		$scope.myhousedata=json.api_data;
	})
	
	//点击下拉框赋值
	$scope.clickoption=function(id){
		console.log(id);
			$scope.inputselect=name;
			$scope.inputid=id;
			$scope.getDataslist(id);
			$scope.userHouseId = id;
	}
	
	$scope.evalStatus = [
		{id:0,name:"无语"},
		{id:1,name:"抠鼻"},
		{id:2,name:"已哭瞎"},
		{id:3,name:"已给跪"},
		{id:4,name:"火大"},
		{id:5,name:"吃一拳"}
	]
	
	//点击图片放大
	$scope.setbigimg=function(imgsrc){
		var html = '<div class="shade" style="display:block"></div>'+
					'<div class="imgbig commentinfor" style="width: 200px; height: 200px;display:block">'+
						'<img src="'+ imgsrc +'" style="width: 100%;height: 100%;" />'+
					'</div>'
		$('body').append(html);			
		$(".shade").click(function(){
			$(this).remove();
			$(".imgbig").remove();
		});
	}
})

//报修详情
webapp.controller('repairDetail',function($scope,$http,$sce,$routeParams){
	$scope.repairId = getUrlParam('id');
	$http({
		method:'GET',
		url:ip+'api/member/repair/view',
		params:{
			repairId:$routeParams.id
		}
	}).success(function(json){
		var data = json.api_data;
		$scope.title = data.repair.repairTypeName;
		$scope.status=data.repair.repairStatus;
		$scope.repair = data.repair;
		$scope.repairIds=data.repairContactsId;
		$scope.records = data.records;
		$scope.reviews = data.review;
		if(data.review.reviewScore != undefined){
		var ahtml = '';
		for(var i = 0;i<data.review.reviewScore;i++){
			ahtml += '<i class="redHeart"></i>';
		}
		for(var i = 0;i>5-data.review.reviewScore;i++){
			ahtml += '<i class="greyHeart"></i>';
		}
		console.log(ahtml)
		$scope.starbox = $sce.trustAsHtml(ahtml);
		}
//		$(function(){
//			$("#starBox").html(ahtml)		
//			
//		})


	});
	//状态数组
	$scope.menus = [
		//{id:0,status:'全部'},
		{id:0,status:'未确认',Text:'待处理',color:'iconOrange',btns:[{btnName:'提醒物业',color:'btnOrange'},{btnName:'取消报修',color:'btnGreen'}]},
		{id:1,status:'已确认',Text:'处理中',color:'iconOrange',btns:[{btnName:'取消报修',color:'btnGreen'},{btnName:'催促物业',color:'btnOrange'}]},
		{id:2,status:'处理中',Text:'处理中',color:'iconGreen',btns:[{btnName:'取消报修',color:'btnGreen'},{btnName:'催促物业',color:'btnOrange'}]},
		{id:3,status:'未支付',Text:'待支付',color:'iconOrange',btns:[{btnName:'去支付',color:'btnOrange'}]},
		{id:4,status:'部分支付',Text:'待支付',color:'iconOrange',btns:[{btnName:'继续支付',color:'btnOrange'}]},
		{id:5,status:'已支付',Text:'已支付',color:'iconBlack',btns:[{btnName:'去评价',color:'btnOrange'}]},
		{id:6,status:'处理完成',Text:'处理完成',color:'iconBlack',btns:[{btnName:'去评价',color:'btnOrange'}]},
		{id:7,status:'已取消',Text:'已取消',colur:'iconBlack'}
	];
	//左边的状态数组
//	$scope.leftstatus=[
//		{id:0,status:'未确认',Text:'待处理',color:'iconOrange',btns:[{btnName:'提醒物业',color:'btnOrange'},{btnName:'取消报修',color:'btnGreen'}]},
//		{id:1,status:'已确认',Text:'处理中',color:'iconOrange',btns:[{btnName:'取消报修',color:'btnGreen'},{btnName:'催促物业',color:'btnOrange'}]},
//		{id:2,status:'处理中',Text:'处理中',color:'iconGreen',btns:[{btnName:'取消报修',color:'btnGreen'},{btnName:'催促物业',color:'btnOrange'}]},
//		{id:3,status:'未支付',Text:'待支付',color:'iconOrange',btns:[{btnName:'去支付',color:'btnOrange'}]},
//		{id:4,status:'部分支付',Text:'待支付',color:'iconOrange',btns:[{btnName:'继续支付',color:'btnOrange'}]},
//		{id:5,status:'已支付',Text:'已支付',color:'iconBlack',btns:[{btnName:'去评价',color:'btnOrange'}]},
//		{id:6,status:'处理完成',Text:'处理完成',color:'iconBlack',btns:[{btnName:'去评价',color:'btnOrange'}]},
//		{id:7,status:'已取消',Text:'已取消',colur:'iconBlack'}
//	]
	
	$scope.Remind=function(id,name){
		if(name=="提醒物业"){
			//提醒报修
			$http({
				method:'GET',
				url:ip+'api/member/repair/remind',
				params:{
					memberId:$scope.mydata.memberId,
					repairId:id
				}
			})
			.success(function(json){
				$(".remind").show();
				$(".shade").show();
				$scope.clickinfor();
				getData();
			})
		}
		if(name=="取消报修"){
			$http({
				method:'GET',
				url:ip+'api/member/repair/cancel',
				params:{
					memberId:$scope.mydata.memberId,
					repairId:id
				}
			})
			.success(function(json){
				console.log(json+"取消报修");
				//window.location.reload(true);
			})
		}
		if(name=="催促物业"){
			$http({
				method:'GET',
				url:ip+'api/member/repair/urge',
				params:{
					memberId:$scope.mydata.memberId,
					repairId:id
				}
			})
			.success(function(json){
				$(".urge").show();
				$(".shade").show();
				$scope.clickinfor();
				getData();
			})
		}
		if(name=="去支付" || name=="继续支付"){
			$(".shade").show();
			$(".paydiv").show();
			$(".btnpay").click(function(){
				$http({
					method:'GET',
					url:ip+'api/member/repair/payment',
					params:{
						memberId:$scope.mydata.memberId,
						repairId:id,
						paymentMethod:$scope.paytype
					}
				})
				.success(function(json){
					console.log(json+"dhfuhdf");
//					$(".paydiv").hide();
//					$(".shade").hide();
				})
			})
		}
		if(name=="去评价"){
//			sessionStorage.setItem("repaireid",id);
			window.location.href="repairestimate.html?id=" + id+"&memberid="+$scope.mydata.memberId;
		}
	}
	
	
	$(function(){
//		getLineHeight();
	})
	
	function getLineHeight(){
		var item = $('.tapGroup .item');
		console.log(item);
		if(item.length>1){
			var lineHeight = $(item[item.length-1]).find('.circle').offset().top - $(item[0]).find('.circle').offset().top; 
		}
		console.log(lineHeight);
		$('.line').css('height',lineHeight);
		$('.line').css('top',$(item[0]).find('.circle').offset().top)
	}
})

//我的钱包
webapp.controller('mypackage',function($scope,$http){
	$(function(){
		$('.packagelist span.listpay i').each(function(){
			var _$this=$(this).text();
			var _$paaint=parseInt(_$this);
			if(_$paaint<0){
				$(this).addClass('greed')
			}else{
				$(this).addClass("red");
			}
		});
		var memberIds=JSON.parse(localStorage.getItem('userInfo'));
		//请求我的钱包余额和消费详情接口
		$.ajax({
			type:"get",
			url:ip+'/api/member/profile/balance',
			async:true,
			dataType:"json",
			data:{memberId:memberIds.memberId},
			success:function(json){
				var balance=json.api_data.balacne;
				$(".mymoney").html("&yen"+balance+"");
				/*mymoney*/
				var mymoney=$(".mypackage span.mymoney").text();
				localStorage.setItem("mymoney",mymoney);
			}
		});
		//消费明细
		$.ajax({
			type:"get",
			url:ip+'/api/member/deposit/list',
			async:true,
			dataType:"json",
			data:{memberId:1},
			success:function(json){
				if(json.api_code == 0){
					var data = json.api_data;
					var costList = '';
					for(var i = 1;i < data.length;i++){
						costList += '<span class="listpay">'+data[i].date+'<b>'+ data[i].memo +'</b><i>'+ data[i].amount +'</i></span>';
					}
					$(".packagelist").append(costList);
				}
			}
		});
	});
})

//余额充值页面
webapp.controller('recharge',function($scope,$http){
	$(function() {
			var mymoey = localStorage.getItem("mymoney");
			$(".paycontentinner span.firstspan b").text(mymoey);
			/*
			 * 单选框
			 */
			$('.methodimg label').click(function() {
					var radioId = $(this).attr('name');
					$('.methodimg label').removeAttr('class') && $(this).attr('class', 'checked');
					$('input[type="radio"]').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked');
			});
			$(".moneybtn").click(function(){
				var inputmoney=$(".inputmoney").val();
				var mothod=$(".methodimg label.checked").data("meys");
				var memberIds=JSON.parse(localStorage.getItem('userInfo'));
				if(!/^[0-9]*$/.test(inputmoney)){
					$("em.infor").html("请输入正确的充值金额");
					return false;
				}
				if(inputmoney==""){
					$("em.infor").html("充值金额不能为空");
					return false;
				}
				if(/^[0-9]*$/.test(inputmoney) || inputmoney !=""){
					$("em.infor").hide();
				}
				$.ajax({
					type:"post",
					url:ip+'/api/member/deposit/recharge',
					async:false,
					data:{memberId:memberIds.memberId, money:inputmoney, paymentMethod:mothod},
					dataType:"json",
					success:function(json){
						console.log(json);
						$(".ordernumber").val(json.api_data.sn);
						$(".paymethod").val(json.api_data.paymentMethod);
						$(".paymoney").val(json.api_data.amountPayable);
						$(".callback").val(json.api_data.callBackUrl);
					}
				});
			});
		});
})

//个人中心页面导航
webapp.controller('headerCtrl',function($scope,$http,$location,$route){
	$scope.menu = [
		{
			id:2,
			name:'订单中心',
			url:'',
			params:[
				{
					id:3,
					name:'我的订单',
					url:'#/order/3'
				},
				{
					id:4,
					name:'我的抢相应',
					url:'#/about/4'
				}
			]
		},
		{
			id:5,
			name:'投诉报修',
			url:'',
			params:[
				{
					id:6,
					name:'预约报修',
					url:'#/repair/6'
				},
				{
					id:7,
					name:'投诉留言',
					url:'#/advance/7'
				}
			]
		},
		{
			id:1,
			name:'通知通告',
			url:'#/1',
			params:[]
		},
		{
			id:8,
			name:'个人中心',
			url:'',
			params:[
				{
					id:9,
					name:'我的资料',
					url:'#/center/9'
				},
				{
					id:10,
					name:'我的家',
					url:'#/home/10'
				},
				{
					id:14,
					name:'我的钱包',
					url:'#/package/14'
				},
				{
					id:11,
					name:'登录密码',
					url:'#/pwd/11'
				},
				{
					id:12,
					name:'支付密码',
					url:'#/paypwd/12'
				}
			]
		},
		{
			id:13,
			name:'我的收藏',
			url:'#/collect/13',
			params:[]
		}
	]
	$scope.$on('$viewContentLoaded', function() {  
        $scope.index = $route.current.params.index;
    }); 
    if(userInfo.number != ''){
    		$scope.number = userInfo.number;	
    }else{
    		$scope.number = '请添加房产';
    }
    
    
    var flag = false;
	$(".location-change").hover(
		function(){
			$(".chooseHouse").show();
		},
		function(){
			if(flag == true){
				$(".chooseHouse").hide();
			}
		}
	)
	$(".location-change").mouseleave(function(){
		setTimeout(function(){
			flag = true;												
		},500)	
	})
    
    function	 getHouseLit(){
    		$http({
			method:'GET',
			url:ip+'api/member/house/myHome',
			params:{
				memberId:userInfo.memberId
			}
		})
		.success(function(json){
			$scope.address = json.api_data;
			$scope.defalut = userInfo.houseId;
		})
    }
    getHouseLit();
    
    
    $scope.changeHouse = function(id){
//		getDate(id);
		$http({
			method:'GET',
			url:ip+'api/index/cutHouse',
			params:{
				memberId:userInfo.memberId,
				houseId:id
			}
		})
		.success(function(json){
			console.log(json);
			refreshUserInfo();
		})
		
		function refreshUserInfo(){
		$http({
			method:'GET',
			url:ip+'api/member/profile/index',
			params:{
				memberId:userInfo.memberId
			}
		})
		.success(function(json){
			localStorage.setItem('userInfo',JSON.stringify(json.api_data));
			window.location.reload();
		})
		}
	}
})

//配置route
webapp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/center/:index', {
			templateUrl: 'center.html',
		})
		.when('/:index', {
			templateUrl: 'personnotice.html',
		})
		//修改头像
		.when('/userimg/9', {
			templateUrl: 'personImg.html',
		})
		//我的家
		.when('/home/:index', {
			templateUrl: 'personmyhome.html',
		})
		//登录密码
		.when('/pwd/:index', {
			templateUrl: 'personpwd.html',
		})
		//支付密码
		.when('/paypwd/:index', {
			templateUrl: 'personpaypwd.html',
		})
		//我的抢相应
		.when('/about/:index', {
			templateUrl: 'personabout.html',
		})
		//我的订单
		.when('/order/:index', {
			templateUrl: 'personorder.html',
		})
		//订单详情
		.when('/orderInfo/:index', {
			templateUrl: 'personorderDetail.html',
		})
		//报修列表
		.when('/repair/:index', {
			templateUrl: 'personrepair.html',
		})
		//投诉留言
		.when('/advance/:index', {
			templateUrl: 'personadvance.html',
		})
		//报修详情
		.when('/repairInfo/:id', {
			templateUrl: 'personrepairdetail.html',
		})
		//我的收藏
		.when('/collect/:index', {
			templateUrl: 'personcollect.html',
		})
		//我的钱包
		.when('/package/:index', {
			templateUrl: 'personpackage.html',
		})
		//余额充值
		.when('/recharge/:index', {
			templateUrl: 'personrecharge.html',
		})
		.otherwise({
			redirectTo: '/:index'
		});
}]);