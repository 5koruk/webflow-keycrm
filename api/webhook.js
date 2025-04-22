export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, phone } = req.body;

  const encoder = new TextEncoder();
  const bodyBuffer = encoder.encode(JSON.stringify({
    name,
    email: email || "",
    phone: phone || "",
    source: "Webflow"
  }));

  try {
    const response = await fetch("https://api.keycrm.app/api/v1/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer MDQwMmMxNzdmNmRkMWNjY2NlZmU3ODhlZGY4ZDhkODk5Zjg1MWE2OQ"
      },
      body: bodyBuffer
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText);
    }

    return res.status(200).json({ message: "Lead sent to KeyCRM" });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to send lead",
      error: error.message
    });
  }
}
