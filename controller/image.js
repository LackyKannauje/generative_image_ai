const axios = require('axios');
require("dotenv").config();

const ai_api = process.env.AI_API_KEY;

async function handleTextToImage(data) {
  const response = await axios.post(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
    data,
    {
      headers: {
        Authorization: "Bearer "+ai_api,
      },
      responseType: 'stream'
    }
  );
  return response.data;
}

async function handleImageToText(imageUrl) {
    try {
      const imageResponse = await axios.get(imageUrl, {
        responseType: 'stream'
      });
  
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning",
        imageResponse.data,
        {
          headers: {
            Authorization: "Bearer "+ai_api,
            "Content-Type": "application/octet-stream" 
          }
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error querying Hugging Face API:", error.response.data);
      throw error;
    }
  }

module.exports = { handleImageToText, handleTextToImage };
