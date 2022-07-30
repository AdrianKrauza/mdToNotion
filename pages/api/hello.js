const {
    Configuration,
    OpenAIApi
} = require("openai");
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const removeMd = require('remove-markdown');

const generateHeading = async(body) => {
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: "Generate heading: \n" + body,
        temperature: 0.7,
        max_tokens: 200,
        top_p: 1,
        best_of: 2,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    return response.data.choices[0].text.replace(/\n/g, " ")
}

const generateBody = async(body) => {
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: "Summarize this for a second-grade student: \n" +body,
        temperature: 0.7,
        max_tokens: 400,
        top_p: 1,
        best_of: 5,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    return response.data.choices[0].text
}


const translate = async (req, res) => {
    let markdown = req.body
    markdown = markdown.replaceAll("#","£")
    const plainText = removeMd(markdown).replaceAll("£","#");

    const sections = plainText.split("###" )
    let result = ""
    for(let i = 0; i < sections.length; i++) {
        const section = sections[i].replace(/\n/g, " ")
        const body = await generateBody(section);
        const heading = await generateHeading(body);
        result += `\n\n### ${heading}\n${body}`
    }
    res.status(200).json(result)
}


export default translate;