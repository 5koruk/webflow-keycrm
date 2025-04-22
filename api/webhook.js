export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, phone } = req.body.data;

  try {
    const response = await fetch("https://api.keycrm.app/v1/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer MDQwMmMxNzdmNmRkMWNjY2NlZmU3ODhlZGY4ZDhkODk5Zjg1MWE2OQ"
      },
      body: JSON.stringify({
        name: name || "Не указано",
        email: email || "",
        phone: phone || "",
        source: "Webflow"
      })
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return res.status(200).json({ message: "Lead sent to KeyCRM" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to send lead", error: error.message });
  }
}
