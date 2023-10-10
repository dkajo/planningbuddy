const apiKey = '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';

export function callOpenai() {
  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Only answer with PlantUML code'
        },
        {
          role: 'user',
          content: 'Diagram for a simple shop'
        }
      ]
    })
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

