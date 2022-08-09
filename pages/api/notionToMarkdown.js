import {Client} from "@notionhq/client";
import {NotionToMarkdown} from "notion-to-md";

const translate = async (req,res) => {
    const notion = new Client({
        auth: 'secret_8z6uOVOCWpeL5bAk4QPq52mmSNOlADObump2TKXmCCb',
    });

    const n2m = new NotionToMarkdown({ notionClient: notion });
        const mdblocks = await n2m.pageToMarkdown(req.query.id);
        const mdString = n2m.toMarkdownString(mdblocks);
    res.status(200).json( mdString )
}

export default translate;
