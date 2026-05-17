export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const item = req.body;

    const githubRes = await fetch(
      "https://api.github.com/repos/pshs-demonlist/pshs-demonlist/dispatches",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GH_TOKEN}`,
          "Accept": "application/vnd.github+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          event_type: "submit-level",
          client_payload: {
            level: item
          }
        })
      }
    );

    return res.status(githubRes.status).json({
      success: githubRes.status === 204
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
