import fetch from 'cross-fetch';

const url = 'http://localhost:9090/api/lamp/getAll'
const data = { country: 'Kazakhstan' }

try {
    const response = await fetch(url, {
        method: 'POST', // или 'PUT'
        body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
        headers: {
          'Content-Type': 'application/json'
        }
      });
  const json = await response.json();
  console.log('Успех:', JSON.stringify(json));
} catch (error) {
  console.error('Ошибка:', error);
}
