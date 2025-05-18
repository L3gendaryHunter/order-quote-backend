const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/fetchProduct', async (req, res) => {
  const url = req.query.url;

  // Example using Rainforest API (replace with your own key and service)
  const response = await axios.get('https://api.rainforestapi.com/request', {
    params: {
      api_key: '241D2120627B439DA9A5C63A7A96F506',
      type: 'product',
      url: url
    }
  });

  const product = response.data.product;
  res.json({
    name: product.title,
    price_usd: product.buybox_winner?.price?.value || product.price.value
  });
});

app.listen(3000, () => console.log('Server running'));
