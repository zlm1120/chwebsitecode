$(function(){
$('.checkboxcomm label').click(function() {
	var radioId = $(this).attr('name');
	$('.checkboxcomm label').removeAttr('class') && $(this).attr('class', 'checked');
	$('input[type="radio"]').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked');
});
//点击出现弹出框
$(".conwrapperTitle a").click(function() {
	$(".mydelog").css("display", "block"); //弹窗显示
	$(".shade").show();
});
$(".shade").click(function() {
	$(".shade").hide();
	$(".mydelog").hide();
});
$(".closebtn").click(function() {
	$(".shade").hide();
	$(".mydelog").hide();
})
$(".commnityname input").click(function(){
	$this = $(this);
	var alertBox = $this.next();
	alertBox.css('display') == 'block'?alertBox.hide():alertBox.show();
})

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
});
var webapp = angular.module('webapp',[]);
webapp.controller('homeCtrl',function($http,$scope){
	//省
	$scope.getProId = function(){
		$http({
			method:'GET',
			url:ip+'api/common/getProvinces',
			
		})
		.success(function(json){
			console.log(json);
			$scope.pros = json.api_data;				
		})
	}
	$scope.getProId();
	
	//点击option
	$scope.selectOption = function(name,id,type){
		if(type==1){
			$scope.InputProVal = name;
			$scope.getCityId(id);	
		}else if(type==2){
			$scope.InputCityVal = name;
			$scope.getAreaId(id);	
		}else if(type==3){
			$scope.InputAreaVal = name;
//			$scope.getAreaId(id);	
		}
		
	}
	//市
	$scope.getCityId = function(id){
		$http({
			method:'GET',
			url:ip+'api/common/getAreas',
			params:{
				areaId:id
			}
		})
		.success(function(json){
			console.log(json);
			$scope.citys = json.api_data;				
		})
	}
	
	//区
	$scope.getAreaId = function(id){
		$http({
			method:'GET',
			url:ip+'api/community/list',
			params:{
				areaId:id
			}
		})
		.success(function(json){
			console.log(json);
			$scope.areas = json.api_data;				
		})
	}
	
})
