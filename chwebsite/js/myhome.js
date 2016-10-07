var memberId = JSON.parse(localStorage.getItem('userInfo'));
//angular
var webapp = angular.module('webapp', []);
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


//jquery
	
	
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