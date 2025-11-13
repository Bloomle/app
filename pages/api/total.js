import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "db", "data.json");

export default function handler(req, res) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  res.json({ total: data.total });
}
