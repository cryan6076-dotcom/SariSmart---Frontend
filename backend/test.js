async function test() {
  const response = await fetch('http://localhost:3000/api/transactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      itemsList: [{ _id: '64a9c6b81d7f6c34882b5f6a', name: 'Test', qty: 1, price: 10 }],
      total: 10,
      amountGiven: 20,
      change: 10
    })
  });
  const text = await response.text();
  console.log('Status:', response.status);
  console.log('Body:', text);
}
test();
