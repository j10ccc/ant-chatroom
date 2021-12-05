var myname;
var socket;

window.onload = function(){
  var login = document.querySelector('#submit');

  login.addEventListener('click', function(){
	var account = document.querySelectorAll('input')[0].value;
	var password = document.querySelectorAll('input')[1].value;
	//发送socket
	socket = io({
	  query: {
		name: account,
		password: password
	  },
	  reconnection: false,
	});
	socket.on('connect', function(){
	  myname = account;
	  document.querySelector('#myname').innerHTML = myname;
	  document.querySelector('#sign_in').classList.add('disappear');
	  document.querySelector('#main').style.display = 'flex';
	  // 获取历史信息
	  socket.emit('getHistory', (data) => {
		console.log('history', data);
		console.log(data.length);
		for (let i = 0; i < data.length; i++){
		  addMessage(data[i].sender, data[i].content);
		}
	  });
	})
	socket.on('connect_error', (err) => {
	  if (err && err.message === 'WRONG_ACCOUNT' || err.message === 'WRONG_PASSWORD') {
		alert("认证失败");
		return;
	  }
	  alert('连接失败，请检查 websocket 服务器');
	});

	socket.on('disconnect', () => {
	  alert("连接中断");
	});
	socket.on('online', (users) => {
	  //渲染用户列表
	  console.log('online users:', users);
	  let friends = document.querySelector('#friend-box');
	  friends.innerHTML = '';
	  for (let i = 0; i < users.length; i++) {
		if (users[i] == myname) continue;
		let ele = document.createElement('div');
		ele.setAttribute('type', 'button');
		ele.setAttribute('class', 'username');
		ele.innerHTML = users[i];
		friends.appendChild(ele);
	  }
	});
	socket.on('receiveMessage', (message) => {
	  console.log('received a message broadcast message:', message);
	  addMessage(message.sender, message.content);
	});
  })

  //单击按钮发送
  var sent_message = document.querySelector('#sent_message');
  sent_message.addEventListener('click', function(e){
	let text = document.querySelector(".textarea").innerText.replace(/[\r\n]/g,"");
	if (!text) return;
	addMessage(myname, text);
	socket.emit('sendMessage', text);
  });
  //回车键发送
  var textarea = document.querySelector('.textarea');
  textarea.addEventListener('keyup', function(e){
	if (e.which == 13) {
	  let text = document.querySelector('.textarea').innerText.replace(/[\r\n]/g,"");
	  if(!text) return;
	  addMessage(myname, text);
	  socket.emit('sendMessage', text);
	}
  });
}

function addMessage(user, text){
  let ele = document.createElement("div");

  if (user == myname) ele.innerHTML = "<div class='text'>" + text + "</div><label class='name'>"+ myname + "</label>"
  else ele.innerHTML = "<label class=name>" + user + "</label><div class='text'>" + text + "</div>"

  if (user == myname) ele.setAttribute("class", "content my-content");
  else ele.setAttribute("class", "content other-content");

  let conetents = document.querySelector('#conetents');
  contents.appendChild(ele);
  contents.scrollTop = contents.scrollHeight;
  document.querySelector(".textarea").innerText = "";

}
