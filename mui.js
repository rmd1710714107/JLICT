window.onload = function() {
	/* 以下是导航栏运动代码 */
	var oDiv = document.getElementById("A");
	var aSpan = oDiv.getElementsByTagName("span");
	var aDiv = oDiv.getElementsByTagName("div");
	var time1 = null;
	var time2 = null;
	var arrdDiv1 = CreatArry(aDiv, "dropdown");
	var arrSmall = CreatArry(aDiv, "small");
	function CreatArry(Obj, classname) {
		var arr = [];
		for (var I = 0; I < Obj.length; I++) {
			if (Obj[I].className == classname) {
				arr.push(Obj[I]);
			}
		}
		return arr;
	}
	for (var d = 0; d < arrdDiv1.length; d++) {
		arrdDiv1[d].index = d;
		arrdDiv1[d].onmouseenter = function() {
			move(arrSmall[this.index], 110);
			a(aSpan[this.index], 90, 0, 9);
		}
		arrdDiv1[d].onmouseleave = function() {
			move(arrSmall[this.index], 0);
			a(aSpan[this.index], 0, 90, -9);
		}
	}

	function move(obj, Target) {
		clearInterval(obj.time1);
		obj.time1 = setInterval(function() {
			var k = obj.offsetWidth;
			var speed = (Target - k) / 5;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if (k == Target) {
				clearInterval(obj.time1);
			} else {
				obj.style.width = k + speed + "px";
			}
		}, 30)
	}

	function a(obj, target, y, z) {
		clearInterval(obj.time2);
		obj.time2 = setInterval(function() {
			if (y == target) {
				clearInterval(obj.time2);
			} else {
				y = y + z;
				obj.style.transform = "rotate(" + y + "deg)";

			}
		}, 30)
		if (y < target) {
			obj.innerHTML = "＞";
		} else {
			obj.innerHTML = "+";

		}

	}
	
	/* 以下是图片缩放代码 */
	var oPicture = document.getElementById("pictures");
	var aPictures = oPicture.getElementsByTagName("img");
	var time2 = null;
	for (var iPicture = 0; iPicture < aPictures.length; iPicture++) {
		aPictures[iPicture].index = iPicture;
		aPictures[iPicture].alpha = 100;
		aPictures[iPicture].style.top = 0;
		aPictures[iPicture].style.left = 0;
		aPictures[iPicture].onmousemove = function() {
			anamination(this, 260, 5, 5, 60);
		}
		aPictures[iPicture].onmouseout = function() {
			anamination(this, 220, -5, -5, 100);
		}
	}

	function anamination(obj1, targetPicture, hei, wid, targetOpacity) {
		var increaseHeight = hei;
		var increaseWidth = wid;
		clearInterval(obj1.time2);
		obj1.time2 = setInterval(
			function() {
				var increaseTop = obj1.offsetTop - increaseHeight / 2;
				var increaseLeft = obj1.offsetLeft - increaseHeight / 2;
				var speed = (targetOpacity - obj1.alpha) / 10;
				if (hei > 0) {
					increaseTop = Math.floor(increaseTop);
					increaseLeft = Math.floor(increaseLeft);
				} else {
					increaseTop = Math.ceil(increaseTop);
					increaseLeft = Math.ceil(increaseLeft);
				}
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
				if (obj1.offsetWidth == targetPicture) {
					clearInterval(obj1.time2);
				} else {
					obj1.alpha += speed;
					obj1.style.top = increaseTop + "px";
					obj1.style.left = increaseLeft + "px";
					obj1.style.width = obj1.offsetWidth + increaseWidth + "px";
					obj1.style.height = obj1.offsetHeight + increaseHeight + "px";
					obj1.style.opacity = obj1.alpha / 100;
					obj1.style.filter = "alpha(opacity:" + obj1.alpha + ")";
				}
			}, 50)
	}
	/* 以下是轮播图代码 */
	var wrap = document.getElementById('wrap'),
		pic = document.getElementById('pic'),
		oLi = pic.getElementsByTagName("li"),
		oList = document.getElementById('list'),
		list = oList.getElementsByTagName('li'),
		index = 0,
		timer = null;
	oList.style.left = (1520 - 200) / 2 + "px";
	pic.style.width = oLi[0].offsetWidth * oLi.length + "px";
	// 定义并调用自动播放函数
	timer = setInterval(autoplay, 4000);
	// 定义图片切换函数
	function autoplay() {
		if (index >= list.length) {
			index = 0;

		}
			index++;
			changeoptions(index);
	}
	// 遍历所有数字导航实现划过切换至对应的图片
	for (var i = 0; i < list.length; i++) {
		list[i].index = i;
		list[i].onclick = function() {
			clearInterval(timer);
			pic.style.left = -this.index * 1520 + "px";
			changeoptions(this.index);
		}
		list[i].onmouseover=function(){
			console.log(this.index+","+index);
			if (index!=this.index) {
				list[this.index].className="hover";
			}
		}
		list[i].onmouseout=function(){
			if (index!=this.index) {
				list[this.index].className=" ";
			}
		}
	}

	function changeoptions(curindex) {
		var iTime = null;
		var iTarget = curindex * 1520;
		for (var j = 0; j < list.length; j++) {
			list[j].className = '';
		}
		if (curindex >= list.length) {
			list[0].className = 'active';
		} else {
			list[curindex].className = 'active';
		}
		index = curindex;
		/* 以上改变按钮颜色 */
		clearInterval(iTime);
		iTime = setInterval(function() {
			var Speed = (iTarget - Math.abs(pic.offsetLeft)) / 8;
			if (pic.offsetLeft <= -iTarget) {
				clearInterval(iTime);
			} else {
				pic.style.left = pic.offsetLeft - Math.ceil(Speed) + "px";
			}
			if (curindex>=list.length && pic.offsetLeft==-7600) {
				pic.style.left=0+"px";
				clearInterval(iTime);
			}
		}, 30);
	}
	// 鼠标划过整个容器时停止自动播放
	wrap.onmouseover= function() {
		clearInterval(timer);
		this.style.cursor = "pointer";

	}
	// 鼠标离开整个容器时继续播放至下一张
	wrap.onmouseout = function() {
		timer = setInterval(autoplay, 4000);
	}

}
