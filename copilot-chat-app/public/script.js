const messagesDiv = document.getElementById('chat-messages');
const input = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', async () => {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Add user message to chat
  const userBubble = document.createElement('div');
  userBubble.textContent = userMessage;
  userBubble.style.textAlign = 'right';
  messagesDiv.appendChild(userBubble);

  // Send to server
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content: userMessage }] }),
  });

  const data = await response.json();

  // Add bot response to chat
  const botBubble = document.createElement('div');
  botBubble.textContent = data.content;
  botBubble.style.textAlign = 'left';
  messagesDiv.appendChild(botBubble);

  // Clear input
  input.value = '';
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
