//angular.module('webapp',[])
//.controller('loginCtrl',function($scope){
//	$scope.phone;
//	$scope.pass;
//	$scope.vail = 1;
//})
//.directive('vailPwd',function($http){
//	return {
//		require:'ngModel',
//		link:function(scope,ele,attrs,ngCtrl){
//
//				$('#login').click(function(){
//					if(scope.phone == undefined || scope.pass ==undefined){
//						scope.vail = '手机号或密码不能为空';
//						ngCtrl.$setValidity('pass', false);
//					}else{
//						ngCtrl.$setValidity('pass', true);
//						$http({
//							method:'GET',
//							url:ip+'api/member/login/submit',
//							params:{
//								username:scope.phone,
//								password:scope.pass
//							}
//						}).success(function(json){
//							console.log(json);
							
//							
//						}).error(function(){
//							console.log(json);
//							scope.vail = '手机号或密码不能为空';
//							ngCtrl.$setValidity('pass', false);
//							
//						})
//					}
//					
//	//				if($(".form-group span").css('display') == 'none'){
//	//					console.log(1)
//	//				}else{
//	//					console.log(2)
//	//				}
//				})
//
//		}
//	}
//})