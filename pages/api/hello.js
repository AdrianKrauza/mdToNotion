
import {markdownToBlocks} from "@tryfabric/martian";

export default function handler(req, res) {
  res.status(200).json(markdownToBlocks(req.body))
}
