var webapp = angular.module('webapp', []);
var a = JSON.parse(localStorage.getItem('userInfo'));
if(a == null){
	window.location.href = '../01Login/Login.html';
}else{
	if(a.houseId == '')
	{
		window.location.href = '../person/mydatahome.html';
	}
}
var userInfoDetail = JSON.parse(localStorage.getItem('userInfo'));
//判断是否登录
webapp.controller('isLoginStatus', function($scope) {
	
})

var pageStart, pageEnd, pageNum;
var currentNum = 1,
	currentSize = 4;

function calPageSize(pageNow, pageCount) {
	pageNum = 4;
	console.log(pageNow, pageCount);
	if (pageCount < pageNum) {
		pageNum = pageCount;
	}
	if (pageCount < pageNum) {
		pageCount = pageNum;
	}
	if (pageNow <= pageNum / 2 + 1) {
		pageStart = 1;
		pageEnd = pageNum;
	} else if (pageNow > pageNum / 2 + 1) {
		pageStart = pageNow - (pageNum / 2 + 1);
		if (parseInt(pageStart) < (pageNow - pageNum / 2) + 1) {
			pageStart = parseInt(pageStart) + 1;
		}
		pageEnd = pageNow + pageNum / 2 - 1;
		if (parseInt(pageEnd) < pageEnd) {
			pageEnd = parseInt(pageEnd) + 1;
		}

	}
	// 对pageEnd 进行校验，并重新赋值
	if (pageEnd > pageCount) {
		pageEnd = pageCount;
	}

	if (pageEnd <= pageNum) { // 当不足pageNum数目时，要全部显示，所以pageStart要始终置为1
		pageStart = 1;
	}

	if (pageCount == pageEnd) {
		pageStart = pageCount - pageNum + 1;
	}

	console.log(pageStart, pageEnd);
	var pageArray = [];
	for (var i = pageStart; i < pageEnd + 1; i++) {
		pageArray.push(i);
	}
	console.log(pageArray);
	return pageArray;

}

//便民
webapp.controller('govCtrl', function($scope, $http, $timeout) {

		$scope.user = JSON.parse(localStorage.getItem('userInfo'));
		if ($scope.user != null) {
			console.log($scope.user)
		} else if ($scope.user.communityId == '') {
			$scope.emptyMsg = '您未还没有绑定小区，页面为自动跳转至绑定小区。'
		}

		$scope.emptyMsg = '您未还没有绑定小区，页面为自动跳转至绑定小区。'
		var userInfo = JSON.parse(localStorage.getItem('userInfo'));

		if (userInfo == null) {
			$scope.emptyMsg = '暂时没有数据！';
			return false;
			$timeout(function() {
				window.location.href = '../index.html';
			}, 1000)
		} else {

			var communityId = userInfo.communityId;
			$scope.user = userInfo;
			if (userInfo.avatar != '') {
				$scope.avator = userInfo.avatar;
			} else {
				$scope.avator = '../img/avator.png';
			}

			//周边政务
			$scope.pageActive = 1;
			var govCount;
			$scope.govBack = function() {
				if ($scope.pageActive - 1 >= 1) {
					$scope.govList($scope.pageActive - 1);
				}
			}
			$scope.govForward = function() {
				console.log(govCount);
				if ($scope.pageActive + 1 <= govCount) {
					$scope.govList($scope.pageActive + 1);
				}
			}
			$scope.govList = function(currentNum) {
				$scope.pageActive = currentNum;
				$http({
						method: 'GET',
						url: ip + 'api/convenience/government/list',
						params: {
							communityId: communityId,
							pageNumber: currentNum,
							pageSize: currentSize
						}
					})
					.success(function(json) {
						if (json.api_code == 0) {
							$scope.govs = json.api_data;
							//				console.log(calPageSize(pageNum,json.api_page.total_pages));
							$scope.pages = calPageSize(currentNum, json.api_page.total_pages);
							govCount = json.api_page.total_pages;
						}
					})
					.error(function() {

					})
			}
			$scope.govList(1);

			//应急开锁
			var lockCount;
			$scope.lockBack = function() {
				if ($scope.lockpageActive - 1 >= 1) {
					$scope.locksmith($scope.lockpageActive - 1);
				}
			}
			$scope.lockForward = function() {
				if ($scope.lockpageActive + 1 <= lockCount) {
					$scope.locksmith($scope.lockpageActive + 1);
				}
			}
			$scope.locksmith = function(currentNum) {
				$scope.lockpageActive = currentNum;
				$http({
						method: 'GET',
						url: ip + 'api/convenience/locksmith/list',
						params: {
							communityId: communityId,
							pageNumber: currentNum,
							pageSize: currentSize
						}
					})
					.success(function(json) {
						console.log(json);
						if (json.api_code == 0) {
							$scope.locks = json.api_data;
							$scope.lockpages = calPageSize(currentNum, json.api_page.total_pages);
							lockCount = json.api_page.total_pages;
						}
						//			if(){}
					})
					.error(function() {

					})
			}
			$scope.locksmith(1);

			//快递公司
			var deliverCount;
			$scope.deliverBack = function() {
				if ($scope.deliverActive - 1 >= 1) {
					$scope.deliveryCorp($scope.deliverActive - 1);
				}
			}
			$scope.deliverForward = function() {
				if ($scope.deliverActive + 1 <= deliverCount) {
					$scope.deliveryCorp($scope.deliverActive + 1);
				}
			}
			$scope.deliveryCorp = function(currentNum) {
				$scope.deliverActive = currentNum;
				$http({
						method: 'GET',
						url: ip + 'api/convenience/deliveryCorp/list',
						params: {
							communityId: communityId,
							pageNumber: currentNum,
							pageSize: currentSize
						}
					})
					.success(function(json) {
						if (json.api_code == 0) {
							$scope.delivers = json.api_data;
							$scope.deliverpages = calPageSize(currentNum, json.api_page.total_pages);
							deliverCount = json.api_page.total_pages;
						}
					})
					.error(function() {

					})
			};
			$scope.deliveryCorp(1);

			//新闻资讯
			var newCount;
			$scope.newBack = function() {
				if ($scope.articleactive - 1 >= 1) {
					$scope.article($scope.articleactive - 1);
				}
			}
			$scope.newForward = function() {
				if ($scope.articleactive + 1 <= newCount) {
					$scope.article($scope.articleactive + 1);
				}
			}

			$scope.article = function(currentNum) {
				$scope.articleactive = currentNum;
				$http({
						method: 'GET',
						url: ip + 'api/convenience/article/list',
						params: {
							communityId: communityId,
							pageNumber: currentNum,
							pageSize: currentSize
						}
					})
					.success(function(json) {
						console.log(json);
						if (json.api_code == 0) {
							$scope.news = json.api_data;
							$scope.articlepages = calPageSize(currentNum, json.api_page.total_pages);
							newCount = json.api_page.total_pages;
						}
					})
					.error(function() {

					})
			};
			$scope.article(1);
			//新闻详情跳转
			$scope.articleDetail = function(id) {
				window.open('newDetail.html?id=' + id);
			}
		}
	})
webapp.controller('newsDetail', function($scope, $http) {
		$http({
				method: 'GET',
				url: ip + 'api/convenience/article/view',
				params: {
					articleId: getUrlParam('id')
				}
			})
			.success(function(json) {
				if (json.api_code == 0) {
					var data = json.api_data;
					console.log(data.content)
					$scope.aaa = data.content;
					$scope.title = data.title;
					$scope.dateTime = data.date;
					$scope.author = data.author;
				}
			})
			.error(function() {
				
			})
	})
	


//报修
webapp.controller('repairCtrl',function($scope,$http){
	$scope.myinfor=JSON.parse(localStorage.getItem("userInfo"));
	//切换房产
	$scope.changeHouse = function(id){
//		getDate(id);
		$http({
			method:'GET',
			url:ip+'api/index/cutHouse',
			params:{
				memberId:$scope.myinfor.memberId,
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
				memberId:$scope.myinfor.memberId
			}
		})
		.success(function(json){
			localStorage.setItem('userInfo',JSON.stringify(json.api_data));
			window.location.reload();
		})
		}
	}
	
	function getMoreList(){
		$http({
			method:'GET',
			url:ip+'api/member/house/myHome',
			params:{
				memberId:$scope.myinfor.memberId
			}
		})
		.success(function(json){
			$scope.address = json.api_data;
			console.log($scope.address+"dkfidj");
			$scope.defalut = $scope.myinfor.houseId;
		})
	}
	getMoreList();
	
	/*//进到页面先判断
	$scope.getpersondata=function(){
		$http({
			method:'GET',
			url:ip+'api/member/profile/index',
			params:{
				memberId:$scope.myinfor.memberId
			}
		})
		.success(function(json){
			console.log(json);
		})
	}
	$scope.getpersondata();*/
	//监听报修内容的输入字数
//	$scope.
	//获取保修类型
	$http({
		method:'GET',
		url:ip+'api/common/getRepairType',
		params:{
			communityId:userInfoDetail.communityId
		}
	})
	.success(function(json){
		console.log(json);
		if(json.api_code == 0){
			$scope.repairNames = json.api_data;
						
		}
	});
	
	$scope.type =1;
	$scope.repairType = function(n){
		$scope.type = n;
		console.log(n);
	};
	
	//获取报修对接人
//	$scope.getcontacts=function(houseid){
		$http({
			method:'GET',
			url:ip+'api/member/repair/contacts',
			params:{
				houseId:userInfoDetail.houseId
			}
		})
		.success(function(json){
			$scope.contacts=json.api_data;
		})
//	}

	$scope.relations = [
		{id:0,name:'业主'},
		{id:1,name:'家属'},
		{id:2,name:'租户'}
	];
	
	//预约报修，选择位置
	$http({
		method:'GET',
		url:ip+'api/member/house/myHome',
		params:{
			memberId:$scope.myinfor.memberId
		}
	})
	.success(function(json){
		console.log(json);
		$scope.myhousedata=json.api_data;
	})
	//点击下拉框赋值
	$scope.clickoption=function(name,id,type){
		if(type==1){
			$scope.inputselect=name;
			$scope.inputid=id;
			$scope.getcontacts($scope.inputid);
		}else{
			$scope.inputname=name;
			$scope.inputuserid=id;
		}
	}
	
	//新增报修
	$scope.content="";
	$scope.addrepair=function(){
		$scope.repairtime=$(".inputSelect input").val();
		if($scope.type=="" || $scope.type==undefined){
			$scope.typeinfor="请选择报修类型";
			return false;
		}else{
			$scope.typeinfor="";
		}
		
		if($scope.inputuserid=="" || $scope.inputuserid==undefined){
			$scope.userinfor="请选择报修对接人";
			return false;
		}else{
			$scope.userinfor="";
		}
		
		if($scope.repairtime=="" || $scope.repairtime==undefined){
			$scope.timeinfor="请选择预约报修时间";
			return false;
		}else{
			$scope.timeinfor="";
		}
		
		var getJsonImg = '';
		$("#form1").ajaxSubmit({
			type: 'post',
			url: ImgIp+'upload/submit',
			dataType: "json",
			async:false,
			success: function(json) {
				if (json.api_code == 0) {
					getJsonImg = json.api_data.url;
//					urlBase = json.api_data.url[0];

				}
			},
			error: function() {}
		});
//		var $img = $('.uploadBox img');
		if(getJsonImg.length>0){
			var imgArray = ''; 	
			if(getJsonImg.length > 1){
				for(var i = 0;i<getJsonImg.length;i++){
					imgArray += getJsonImg[i]+',';
				}
				imgArray = imgArray.substr(0,imgArray.length-1);	
			}else{
				imgArray = getJsonImg[0];
			}
			
			console.log(imgArray);
		};
		
		$http({
			method:'GET',
			url:ip+'api/member/repair/submit',
			params:{
				memberId:$scope.myinfor.memberId,
				houseId:userInfoDetail.houseId,
				repairTypeId:$scope.type,
				contactsId:$scope.inputuserid,
				content:$scope.content,
				presetDate:$scope.repairtime + $("#timeArea").prev().html(),
				images:imgArray,
				memo:$('.tips').val()
			}
		})
		.success(function(json){
			console.log(json);
			if(json.api_code == 0){
				alertBox('您提交的报修内容已成功发送到物业中心，请耐心等待。您也可以在个人中心查看自己的报修内容',1);
				$(".opera .onlyConfirm").click(function(){
					window.location.href="../person/index.html#/repair/6";
				})
			}else{
				alert(json.api_message);
			}
			
		})
	}
	
})


//投诉
webapp.controller('advanceCtrl',function($scope,$http,$timeout){
	$http({
		method:'GET',
		url:ip+'api/common/getComplaintType',
		params:{
			communityId:userInfoDetail.communityId
		}
	})
	.success(function(json){
		console.log(json);
		if(json.api_code == 0){
			$scope.types = json.api_data;
		}
	})
	
	//预约报修，选择位置
	$http({
		method:'GET',
		url:ip+'api/member/house/myHome',
		params:{
			memberId:userInfoDetail.memberId
		}
	})
	.success(function(json){
		console.log(json);
		$scope.myhousedata=json.api_data;
	})
	//点击下拉框赋值
	$scope.clickoption=function(name,id,type){
		if(type==1){
			$scope.inputselect=name;
			$scope.inputid=id;
			$scope.getcontacts($scope.inputid);
		}else{
			$scope.inputselect=name;
			$scope.inputid=id;
		}
	}
	
	
	//选择分类
	$scope.typeIndex = 0;
	$scope.typeClick = function(n){
		$scope.typeIndex = n;
	}
	
//	选择表情
	$scope.exp = 0;
	$scope.expression = function(n){
			$scope.exp = n;
	}
	
	
	$scope.advanceText = '';
	//发起吐槽
	$scope.advance = function(){
		var getJsonImg = '';
		$("#form1").ajaxSubmit({
			type: 'post',
			url: ImgIp+'upload/submit',
			dataType: "json",
			async:false,
			success: function(json) {
				if (json.api_code == 0) {
					getJsonImg = json.api_data.url;
//					urlBase = json.api_data.url[0];

				}
			},
			error: function() {}
		});
//		var $img = $('.uploadBox img');
		if(getJsonImg.length>0){
			var imgArray = ''; 	
			if(getJsonImg.length > 1){
				for(var i = 0;i<getJsonImg.length;i++){
					imgArray += getJsonImg[i]+',';
				}
				imgArray = imgArray.substr(0,imgArray.length-1);	
			}else{
				imgArray = getJsonImg[0];
			}
			
			console.log(imgArray);
		};
		if($scope.advanceText == '' && $.trim($scope.advanceText) == ''){
			alert('内容不能为空');
			return false;
		}
		$http({
			method:'GET',
			url:ip+'api/member/complaint/submit',
			params:{
				memberId:userInfoDetail.memberId,
				houseId:userInfoDetail.houseId,
				complaintTypeId:$scope.typeIndex+1,
				content:$scope.advanceText,
				images:imgArray,
				emoji:$scope.exp
			}
		})
		.success(function(json){
			console.log(json);
			if(json.api_code == 0){
				alert('吐槽成功');
				window.location.href = '../person/advance.html'
			}
		})
	}
})