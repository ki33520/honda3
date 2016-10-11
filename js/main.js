var indexUrl = 'http://hide.dzhcn.cn/honda/',
	ajaxUrl = indexUrl+'callback.php',
	boardType = 'Leaderboard2';

var startTime = new Date().getTime();
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
function refreshTen(){
	var boardList = $('.board-list');
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
				boardList.empty();
				$(list_data).each(function(index,item){
					var list_node = _.find(window.worksList, function(node){ return node.name == item.Name; });
					var img = list_node && list_node.img ? list_node.img : '';
					var li = $('<li><div class="title">第'+item.rowno+'名</div><div class="img"><div class="img-cover"><img src="images/img_cover.png" /></div><div class="img-wrap"><img src='+img+' /></div></div><div class="cf dis"><div class="left">得票率：'+item.vote+'</div><div class="right">'+item.Name+'车队</div></div></li>');
					setTimeout(function(){
						li.appendTo(boardList);
					},100*index);
					
				});
			}else{
				console.log(data)
			}
		}
	});
}
getTen(true);

$('body.ex').on('click',function(){
	$('.board').each(function(index,item){
		if($(item).hasClass('show')){
			$(item).removeClass('show');
		}else{
			$(item).addClass('show');
		}
	})
});





















