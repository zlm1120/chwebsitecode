var webapp=angular.module('webApp',[]);
webapp.controller('merViewController',function($scope,$http){
	$scope.userdata = JSON.parse(localStorage.getItem('userInfo'));
	//商家详情
	$http({
		method:'GET',
		url:ip+'api/product/merchantView',
		params:{
			merchantId:getUrlParam('merId'),
			memberId:$scope.userdata.memberId
		}
	})
	.success(function(json){
		if(json.api_code==0){
			$scope.merDetail=json.api_data;
		}
	})
})
webapp.directive('starnum',function(){
	return {
		link:function(scope,ele,attr){
			var str='';
			for (var i=0;i<attr.score;i++) {
				str+='<i class="redHeart" ></i>';
			}
			for (var i=0;i<5-attr.score;i++) {
				str+='<i class="greyHeart"></i>';
			}
			
			ele.html(str);
		}
	}
})
webapp.controller('merlistController',function($scope,$http){
	$scope.cateIndex=0;
	$http({
		method:'GET',
		url:ip+'api/product/list',
		params:{
			merchantId:getUrlParam('merId')
		}
	})
	.success(function(json){
		if(json.api_code==0){
			$scope.merList=json.api_data;
		}
	})
	
	$scope.goCon=function(index){
		$scope.cateIndex=index;
		var a = $('.filter').offset().top;
		var b = $('.slideBox').offset().top;
		var c = $('.slideBox section').eq(index).offset().top;
		console.log(a+" "+b+" "+c);
		
		
		var goTop = $(".slideBox section").eq(index).offset().top;
		$("html,body").animate({ scrollTop: goTop });
		
	}
	
	var filterTop = $(".filter").offset().top;
	function slideFun(){
		var curObj = null,classFlag = false,scrollTop = $(window).scrollTop();
		if(scrollTop > filterTop){
			$(".filter").css({
				'position':'fixed',
				'top':'0px',
				'background':'rgba(225,225,225)',
				'width':'100%'
			})
		}else{
			$(".filter").css({
				'position':'relative',
				'top':'0px',
				'background':'#fff'
			})
		}
		
	}
	
	$(window).scroll(function(){
		slideFun();
	})
	
})

webapp.filter('cut', function () {
    return function(input, capitalize_index, specified_char) {  
    	if(input.length<capitalize_index){
    		return input;
    	}else{
    		return input.substr(0,capitalize_index)+'...';
    	}
    };  
});


//$(Function(){
	hoverEval();
//})
function hoverEval(){
	var flag = false;
	$(".textTitle em").mouseenter(function(){
		flag = true
	});
	$(".textTitle em").mouseout(function(){

//					setTimeout(function(){
			flag = false;
//						console.log(flag)
//					},50);//
		
		
	})
	$(".evalFloat").mouseenter(function(){
		flag = true;
	})
	$(".evalFloat").mouseout(function(){
		flag = false;
	})
	
	$(".textTitle em").hover(
		function(){
			var $this = $(this);
			var left = 0,top = 0;
			top  = $this.offset().top - 10;
			left = $this.offset().left;
			var maxWidth = $('body').width();
			console.log(left,left+500)
			
			if((left + 500) < maxWidth){
				left = $this.offset().left + 80;
				$(".evalFloat .sanIcon").addClass('leftSanIcon');
				$(".evalFloat .sanIcon").removeClass('rightSanIcon');
				$(".evalFloat .sanIcon2").addClass('leftSanIcon2');
				$(".evalFloat .sanIcon2").removeClass('rightSanIcon2');
				$(".evalFloat").css({'left':left,'top':top,'display':'block'})
			}else{
				left = $this.offset().left - 510;
				$(".evalFloat .sanIcon").addClass('rightSanIcon');
				$(".evalFloat .sanIcon").removeClass('leftSanIcon');
				$(".evalFloat .sanIcon2").addClass('rightSanIcon2');
				$(".evalFloat .sanIcon2").removeClass('leftSanIcon2');
				$(".evalFloat").css({'left':left,'top':top,'display':'block'})
			}
			
			
		},
		function(){
			setTimeout(function(){
				console.log(flag);
				if(!flag){
					$(".evalFloat").hide();								
				}
			},10)
		}
	);
	$(".evalFloat").hover(
		function(){
			$(".evalFloat").show();
		},
		function(){
			$(".evalFloat").hide();
		}
	)
}
