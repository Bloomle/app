import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "db", "data.json");

export default function handler(req, res) {
  const { password } = req.query.password ? req.query : req.body || {};
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (password !== correctPassword)
    return res.json({ success: false, message: "Unauthorized" });

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (req.method === "GET") {
    return res.json({ success: true, ...data });
  }

  if (req.method === "DELETE") {
    const reset = { total: 0, votes: [] };
    fs.writeFileSync(filePath, JSON.stringify(reset, null, 2));
    return res.json({ success: true, message: "Votes reset" });
  }

  res.status(405).end();
}
