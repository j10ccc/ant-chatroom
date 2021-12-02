var MESSAGE  = [
	//type = 0 对方发送的消息
	//room 从 1 开始计数
	{
		type: 0,
		room: 1,
		content: "这里是1号房"
	},
	{
		type: 0,
		room: 2,
		content: "这里是2号房"
	},
	{
		type: 0,
		room: 3,
		content: "这里是3号房"
	},
	{
		type: 0,
		room: 4,
		content: "这里是4号房"
	},
	{
		type: 0,
		room: 5,
		content: "李肖！我知道你在这里窥屏！"
	}
];
window.onload = function(){
	var ACCOUNT = 'j10c';
	var PASSWORD = 'j10c';
 
	var curRoom = 1;
	var login = document.querySelector('#submit');
	login.addEventListener('click', function(){
		var account = document.querySelectorAll('input')[0].value;
		var password = document.querySelectorAll('input')[1].value;
	
		if (ACCOUNT != account || PASSWORD != password) {
		  alert("Wrong username or password");
		}
		else {
			document.querySelector("#sign_in").classList.add('disappear');
			document.querySelector('#main').style.display = "flex";
		}
	})
	//单击按钮发送
	var sent_message = document.querySelector("#sent_message");
	sent_message.addEventListener('click', function(e){
		var text = document.querySelector(".textarea").innerText;
		var ele = {type: 1, room: curRoom, content: text};
		MESSAGE.push(ele);
		addMessage(1, curRoom, text);
	});
	//回车键发送
	var textarea = document.querySelector(".textarea");
	textarea.addEventListener('keyup', function(e){
		if (e.which == 13) {
			var text = document.querySelector(".textarea").innerText;
			var ele = {type: 1, room: curRoom, content: text};
			MESSAGE.push(ele);
			addMessage(1, curRoom, text);
		}
	})
	
	//切换聊天室
	var friends = document.querySelector('#friend-box');
	friends.addEventListener('click', function(e){
		var btn = document.querySelectorAll('.username');
		var ele = e.target;
		for (var i = 0; i < btn.length; i++){
			btn[i].style.backgroundColor = '';
			if (btn[i] == ele) curRoom = i; //获取被选中的聊天室的序号
		}
		ele.style.backgroundColor = '#005EFF';
		refreshContent(curRoom);
	});
}

function sentMessage(text){
	var ele = document.createElement("div");
	ele.innerHTML = "<div class='text'>" + text + "</div><label class='name'>LX1</label>"
	ele.setAttribute("class", "content my-content");
	var conetents = document.querySelector('#conetents');
	contents.appendChild(ele);
	document.querySelector(".textarea").innerText = "";
}

function addMessage(type, room, text){
	var ele = document.createElement("div");

	if (type) ele.innerHTML = "<div class='text'>" + text + "</div><label class='name'>LX1</label>"
	else ele.innerHTML = "<label class=name>LX2</label><div class='text'>" + text + "</div>"

	if (type) ele.setAttribute("class", "content my-content");
	else ele.setAttribute("class", "content other-content");

	var conetents = document.querySelector('#conetents');
	contents.appendChild(ele);
	document.querySelector(".textarea").innerText = "";
}

function refreshContent(curRoom){
	var contents = document.querySelector("#contents");
	contents.innerHTML = "";
	for (var i = 0; i < MESSAGE.length; i++){
		if(MESSAGE[i].room == curRoom)
			addMessage(MESSAGE[i].type, curRoom, MESSAGE[i].content);
	}
}
