const socket = io('http://192.168.233.131:3009')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('닉네임을 알려주세요!')
appendMessage('여기는 모든사람들이 케이스에 관한 정보를 공유하기위한 CHAT 서비스입니다.')
appendMessage('참가하였습니다.')

socket.emit('new-user', name)


socket.on('chat-message', data => {
      appendMessage(`${data.name}: ${data.message}`)

})

socket.on('user-connected', name => {
    appendMessage(`${name} 님이 참가하였습니다.`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} 연결중단되었습니다.`)
})

messageForm.addEventListener('submit', e => { //메세지 폼에있는 텍스트 보낸다
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`나 : ${message}`)

    socket.emit('send-chat-message', message) //서버에 소켓 보내기 
    messageInput.value = ''
  })

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageContainer.append(messageElement)
}

