window.worksList = new Array(153); //{id:1, name:"a1", des: "这是一个Honda的季节", img:"images/works_1.jpg", group:1},

$(window.worksList).each(function(index,item){
	var name = index<82 ? 'a'+(index+1): 'b'+(index-81);
	var img = 'images/works_'+(index+1)+'.jpg';
	window.worksList[index] = {
		id: (index+1),
		name: name,
		des: '这是一个Honda的季节',
		img: 'images/works_1.jpg'
	}
});
