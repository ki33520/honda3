var indexUrl = 'http://honda10emc.dzhcn.cn/',
	ajaxUrl = indexUrl+'callback.php',
	boardType = 'Leaderboard2';

var startTime,
	front = true;
function getTen(start){
	var activeTime = new Date().getTime();
	var times = activeTime - startTime;
	if(!start){
		if(times>=6000){
			startTime = startTime+6000;
			refreshTen();
		}
	}else{
		refreshTen();
	}
	setTimeout(function(){
		getTen()
	},1000)
}
var boardList = $('.board-list');
boardList.each(function(){
	for(var i=0;i<10;i++){
		var li = $('<li><div class="inner flip-container"><div class="flipper"><div class="front"></div><div class="back"></div></div></div></li>');
		li.appendTo(boardList);
	}
});
function refreshTen(){
	$.ajax({
		url: ajaxUrl,
		type: "post",
		data: {type: boardType},
		dataType: "json",
		error: function(request){
			console.log(request);
		},
		success: function(data){
			if(data.status === 1){
				var list_data = data.data;
				$(list_data).each(function(index,item){
					var list_node = _.find(window.worksList, function(node){ return node.name == item.Name; });
					var img = list_node && list_node.img ? list_node.img : '';
					var li_inner = $('<div data-name="'+item.Name+'"><div class="title">第'+item.rowno+'名</div><div class="img"><div class="img-cover"><img src="images/img_cover.png" /></div><div class="img-wrap"><img src='+img+' /></div></div><div class="cf dis"><div class="left">得票率：'+item.vote+'</div><div class="right">'+item.Name+'车队</div></div></div>');
				
				if(front){
					boardList.find('li .front').eq(index).html(li_inner);
					boardList.find('li .inner').removeClass('hover');
				}else{
					boardList.find('li .back').eq(index).html(li_inner);
					boardList.find('li .inner').addClass('hover');
				}
					// .addClass('cardLeft animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
					// 	$(this).removeClass('cardLeft animated');
					// });

				});
			}else{
				console.log(data)
			}
			front = !front;
		}
	});
}


$('body.ex').on('click',function(){
	$('.board').each(function(index,item){
		if($(item).hasClass('show')){
			$(item).removeClass('show');
		}else{
			$(item).addClass('show');
			if(index == 1){
				startTime = new Date().getTime();
				getTen(true);
			}
		}
	})
});





















