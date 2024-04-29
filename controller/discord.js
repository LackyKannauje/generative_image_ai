const { handleImageToText, handleTextToImage } = require("./image");

async function handleDiscord(message) {
  if (message.author.bot) return;
  if (message.attachments.size > 0) {
    let imageUrl;
    message.attachments.forEach((attachment) => {
      imageUrl = attachment.url;
    });
    messageData = await handleImageToText(imageUrl);
    const reply = JSON.stringify(messageData[0]["generated_text"]);
    message
      .reply({
        content: reply,
      })
      .catch((error) => console.error(error));
    if (message.author.bot) return;
  } else {
    const msg = message.content;
    try {
      const imageData = await handleTextToImage({ inputs: msg });
      message.channel.send({
        files: [
          {
            attachment: imageData,
            name: "image.jpg",
          },
        ],
      });
    } catch (error) {
      console.error("Error sending image:", error);
      message.channel.send("Error sending image");
    }
  }
}

module.exports = { handleDiscord };
