const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/fetchProduct', async (req, res) => {
  try {
    const url = req.query.url;

    const response = await axios.get('https://api.rainforestapi.com/request', {
      params: {
        api_key: '241D2120627B439DA9A5C63A7A96F506',
        type: 'product',
        url: url,
        language: 'en_GB',
        currency: 'GBP'
      }
    });

    const product = response.data.product;
    res.json({
    name: product.title,
    price: product.buybox_winner?.price?.value || product.price?.value,
    currency: product.buybox_winner?.price?.currency || "USD",
    image: product.main_image?.link
  });
  } catch (err) {
    console.error('Error fetching product:', err.message);
    res.status(500).json({ error: 'Failed to fetch product data' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
