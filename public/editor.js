const socket = io();

// Initialize CodeMirror
const codeEditor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
  lineNumbers: true,
  mode: "javascript",
  theme: "monokai"
});

// Function to update CodeMirror content
const updateCode = (newCode) => {
  const cursor = codeEditor.getCursor();
  codeEditor.setValue(newCode);
  codeEditor.setCursor(cursor);
};

const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendChatButton = document.getElementById('send-chat');

socket.on('code', (newCode) => {
  updateCode(newCode);
});

socket.on('chat', (newMessage) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = newMessage;
  chatBox.appendChild(messageElement);
});

codeEditor.on('change', () => {
  const newCode = codeEditor.getValue();
  socket.emit('code', newCode);
});

sendChatButton.addEventListener('click', () => {
  const message = chatInput.value;
  socket.emit('chat', message);
  chatInput.value = '';
});
