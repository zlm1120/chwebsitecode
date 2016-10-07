

var currentNum=1,currentSize=1
webapp.controller('govCtrl',function($scope,$http){
	
	var userInfo = JSON.parse(localStorage.getItem('userInfo'));
	var communityId = userInfo.communityId;
	
	
	if(communityId == ''){
		alert('communityId为空，zhangyongSB');
		return false;
	}
	
	$scope.user = userInfo;
	
	
	
	if(userInfo.avatar != ''){
		$scope.avator = userInfo.avatar; 
	}else{
		$scope.avator = '../img/avator.png';
	}
	
	var pageStart,pageEnd,maxLength=4,pageNum = 4;
	
	function calPageSize(pageNow,pageCount){

		if(pageCount < pageNum){
			pageCount = pageNum;
		}
		 if (pageNow <= pageNum / 2 + 1) {
		   pageStart = 1;
		   pageEnd = pageNum;
		 } else if (pageNow > pageNum / 2 + 1) {
		   pageStart= pageNow - pageNum / 2;
		   pageEnd = pageNow + pageNum / 2 - 1;
		 }
		  // 对pageEnd 进行校验，并重新赋值
		 if (pageEnd > pageCount) {
		   pageEnd = pageCount;
		 }
		 if (pageEnd <= pageNum) {// 当不足pageNum数目时，要全部显示，所以pageStart要始终置为1
		   pageStart= 1;
		 }
		 console.log(pageStart,pageEnd);
	}
	
	
	//周边政务
	$scope.govList = function(){
		$http({
			method:'GET',
			url:ip+'api/convenience/government/list',
			params:{
				communityId:communityId,
				pageNumber:1,
				pageSize:1
			}
		})
		.success(function(json){
			if(json.api_code == 0){
				$scope.govs = json.api_data; 
			}
		})
		.error(function(){
			
		})
	}
	$scope.govList();
	
	//应急开锁
	$scope.locksmith = function(){
		$http({
			method:'GET',
			url:ip+'api/convenience/locksmith/list',
			params:{
				communityId:communityId,
				pageNumber:currentNum,
				pageSize:currentSize
			}
		})
		.success(function(json){
			console.log(json);
			if(json.api_code == 0){
				$scope.locks = json.api_data;
			}
//			if(){}
		})
		.error(function(){
			
		})
	}
	
	//快递公司
	$scope.deliveryCorp = function(getCommunityId){
		$http({
			method:'GET',
			url:ip+'api/convenience/deliveryCorp/list',
			params:{
				communityId:communityId,
				pageNumber:currentNum,
				pageSize:currentSize
			}
		})
		.success(function(json){
			if(json.api_code==0){
				$scope.delivers = json.api_data;
			}
		})
		.error(function(){
			
		})
	};
	
	//新闻资讯
	$scope.article = function(getCommunityId){
		$http({
			method:'GET',
			url:ip+'api/convenience/article/list',
			params:{
				communityId:communityId,
				pageNumber:currentNum,
				pageSize:currentSize
			}
		})
		.success(function(json){
			console.log(json);
			if(json.api_code == 0){
				$scope.news = json.api_data;
			}
		})
		.error(function(){
			
		})
	};
	//新闻详情跳转
	$scope.articleDetail = function(id){
		window.location.href = 'newDetail.html?id='+id;
	}
	
})
.controller('newsDetail',function($scope,$http){
	$http({
		method:'GET',
		url:ip+'api/convenience/article/view',
		params:{
			articleId:getUrlParam('id')
		}
	})
	.success(function(json){
		if(json.api_code == 0){
			var data = json.api_data;
			console.log(data.content)
			$scope.aaa = data.content;
			$scope.title = data.title;
			$scope.dateTime = data.date;
			$scope.author = data.author;
		}
	})
	.error(function(){
		
	})
})