// https://github.com/0xyami/web-scripts/blob/main/src/googleTranslate.js \\

const langQuery = window.languageQuery || "lang"

const Language = new URL (window.location.href).searchParams.get(langQuery)
                 || navigator.language;

const api = "https://vts-api.vtubers.wiki"

window.addEventListener("load", async () => {
  function getAllTextNodes (node)
  {
    const allTextNodes = [];

    function getTextNodes (node)
    {
      if (node.nodeType === 3 && node.nodeValue.trim() !== "")
        {
          allTextNodes.push(node);
        }
      else if (node.nodeType === 1
               && !["SCRIPT", "STYLE", "CODE"].includes(node.nodeName))
        {
          for (const childNode of node.childNodes)
            {
              getTextNodes (childNode);
            }
        }
    }

    getTextNodes (node);
    return allTextNodes;
  }

  const textNodes = getAllTextNodes (document.body);

  await Promise.all(textNodes.map(async (node) => {
    const res = await fetch (
        `${api}/v1/translate?text=${node.nodeValue}&lang=${$lang}`);
    const data = await res.json();

    node.nodeValue = data.data;
  }));
})