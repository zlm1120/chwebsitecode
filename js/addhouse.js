//$(function() {
	$(".leftnav a").click(function() {
	$(this).addClass("clickclass").siblings().removeClass("clickclass");
});
//
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

var myapp = angular.module("webapp", []);
myapp.controller('homeCtrl', function($scope, $http) {
	var memverid = JSON.parse(localStorage.getItem('userInfo'));
	//点击图像显示下拉框
	$(".commnityname input").each(function() {
		$(this).click(function() {
			var index = $(this).parent().index();
			$(".commnityname").eq(index).find(".selectGroup").css('display') == 'block' ?
				$(".commnityname").eq(index).find(".selectGroup").hide() :
				$(".commnityname").eq(index).find(".selectGroup").show();
			$(".commnityname").eq(index).siblings().find(".selectGroup").hide();
		});
	});
	
	$(".commnityname input").click(function(){
		$this = $(this);
		var alertBox = $this.next();
		alertBox.css('display') == 'block'?alertBox.hide():alertBox.show();
	})

//	$(".commnityname").each(function() {
//		var index = $(this).parent().parent().index();
		var clickclose;
		$(".commnityname").mouseenter(function() {
			clickclose = true;
		});
		$(".commnityname").mouseout(function() {
			clickclose = false;
			hideoption(clickclose);
		});
//	});
	//点击外面隐藏下拉框
	function hideoption(clickclose) {
		$(".mydelog").click(function() {
			if (!clickclose) {
				$(".commnityname").find(".selectGroup").css("display", "none");
			}
			clickclose = true;
		});
	}
	//点击下拉框赋值和赋值input的属性
	function clickoption(elementclass) {
		$("." + elementclass + "").find("option").click(function() {
			$("." + elementclass + "").find("input").val($(this).val());
			$("." + elementclass + "").find("input").attr("data-id", $(this).attr("data-index"));
			//代码优化
			if ($("." + elementclass + "").find("input") !== " ") {
				$("." + elementclass + "").find(".selectGroup").hide();
			}
			if (elementclass == 'province') {
				$(".city .selectGroup").html('')
				getcity($(this).attr("data-index"));
			} else if (elementclass == 'city') {
				$(".community .selectGroup").html('')
				getcommnity($(this).attr("data-index"));
			}

		});
	}
	//页面加载完就加载小区和省以及市
	$.ajax({
		type: "get",
		url: ip + '/api/common/getProvinces',
		async: true,
		dataType: "json",
		success: function(json) {
			var provincehtml = "",
				provicedata = json.api_data;
			if (json.api_code == "0") {
				for (var i = 0; i < provicedata.length; i++) {
					provincehtml += "<option data-index=" + provicedata[i].areaId + ">" + provicedata[i].area + "</option>"
				}
			}
			$(".province .selectGroup").append(provincehtml);
			clickoption("province");
		}
	});
	//获取市区
	function getcity(proviceid) {
		$.ajax({
			type: "get",
			url: ip + '/api/common/getAreas',
			async: true,
			dataType: "json",
			data: {
				areaId: proviceid
			},
			success: function(json) {
				var cityhtml = "",
					citydata = json.api_data;
				if (json.api_code == "0") {
					for (var i = 0; i < citydata.length; i++) {
						cityhtml += "<option data-index=" + citydata[i].areaId + ">" + citydata[i].area + "</option>"
					}
				}
				$(".city .selectGroup").append(cityhtml);
				clickoption("city");

			},
			error: function() {}

		});
	}
	//获取小区
	function getcommnity(cityid) {
		console.log(cityid);
		$.ajax({
			type: "get",
			url: ip + '/api/community/list',
			async: true,
			dataType: "json",
			data: {
				areaId: cityid
			},
			cache: false,
			success: function(json) {
				var commnityhtml = "",
					commnitydata = json.api_data;
				if (json.api_code == "0") {
					for (var i = 0; i < commnitydata.length; i++) {
						commnityhtml += "<option data-index=" + commnitydata[i].communityId + ">" + commnitydata[i].communityName + "</option>"
					}
				}
				$(".community .selectGroup").append(commnityhtml);
				clickoption("community");

			},
			error: function() {}
		});
	}

	//获取类型
	var type;

	function gettype() {
		$(".checkboxcomm label").each(function() {
			if ($(this).hasClass("checked")) {
				type = $('.checkboxcomm label.checked').attr("data-index");
			}
		});
	}

	//添加房产
	$(".addbtn").click(function() {
		var communityId = $(".community input").data("id");
		var name = $(".name").val();
		var roomnumber = $(".roomnumber").val();
		gettype();
		var typeSelect = type;
		if (name === "" || name === undefined) {
			$("#username").html("<font colo='red'>姓名不能为空</font>");
			return false;
		} else if (communityId === "" || communityId === undefined) {
			$(".community em.specialinfor").html("<font color='red'>请选择您所在的小区名称</font>");
			return false;
		} else if (inputhousename === "" || inputhousename === undefined) {
			$(".housenumvber em.specialinfor").html("<font color='red'>房号不能为空</font>");
			return false;
		} else if (typeSelect === "" || typeSelect === undefined) {
			$(".checkboxgroup em.specialinfor").html("<font color='red'>请选择注册类型</font>");
			return false;
		} else {
			//								$.ajax({
			//									type: "get",
			//									url: ip + '/api/member/house/submit',
			//									async: true,
			//									dataType: "json",
			//									data: {
			//										memberId: memverid.memberId,
			//										communityId:
			//									}
			//								});
		}
//		//我的家
//		$scope.homelist = function() {
//			$http({
//					method: 'GET',
//					url: ip + '/api/member/house/myHome',
//					params: {
//						memberId: memverid.memberId
//					},
//					dataType: "json"
//				})
//				.success(function(json) {
//					console.log(json);
//				})
//				.error(function(json) {})
//		}
	})
});