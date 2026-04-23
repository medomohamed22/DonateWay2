const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// 🔴 حط API KEY بتاعك هنا من Pi Developer Portal
const PI_API_KEY = "3tzfqwikdqi8hjq09dlfpcvm7lgxipvot7wapkz5tmfcxpdsuuywykwtfhbcxcuy";

// 🔗 Pi API
const PI_API = "https://api.minepi.com/v2/payments";

// ✅ Approval
app.post("/approve", async (req, res) => {
  const { paymentId } = req.body;

  try {
    const result = await axios.post(
      `${PI_API}/${paymentId}/approve`,
      {},
      {
        headers: {
          Authorization: `Key ${PI_API_KEY}`
        }
      }
    );

    res.json(result.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Approval failed");
  }
});

// ✅ Completion
app.post("/complete", async (req, res) => {
  const { paymentId } = req.body;

  try {
    const result = await axios.post(
      `${PI_API}/${paymentId}/complete`,
      {},
      {
        headers: {
          Authorization: `Key ${PI_API_KEY}`
        }
      }
    );

    res.json(result.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Completion failed");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
