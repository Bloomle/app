import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "db", "data.json");

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { choice } = req.body;
  if (![1, 2, 3].includes(choice))
    return res.status(400).json({ success: false, message: "Invalid choice" });

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (data.total + choice > 250)
    return res.json({ success: false, message: "Limit reached" });

  const vote = {
    id: Math.random().toString(36).substring(2, 10),
    choice,
    timestamp: new Date().toISOString(),
  };

  data.votes.push(vote);
  data.total += choice;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.json({ success: true, total: data.total });
}
