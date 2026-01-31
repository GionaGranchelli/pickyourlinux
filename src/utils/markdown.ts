const escapeHtml = (value: string): string => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

const inlineFormat = (value: string): string => {
  return value
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
};

export const renderMarkdown = (markdown: string): string => {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const output: string[] = [];
  let paragraph: string[] = [];
  let inList = false;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const text = inlineFormat(escapeHtml(paragraph.join(" ").trim()));
    output.push(`<p>${text}</p>`);
    paragraph = [];
  };

  const closeList = () => {
    if (!inList) return;
    output.push("</ul>");
    inList = false;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line === "") {
      flushParagraph();
      closeList();
      continue;
    }

    if (/^---+$/.test(line)) {
      flushParagraph();
      closeList();
      output.push("<hr />");
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      closeList();
      output.push(`<h3>${inlineFormat(escapeHtml(line.slice(4)))}</h3>`);
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      closeList();
      output.push(`<h2>${inlineFormat(escapeHtml(line.slice(3)))}</h2>`);
      continue;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      closeList();
      output.push(`<h1>${inlineFormat(escapeHtml(line.slice(2)))}</h1>`);
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      if (!inList) {
        output.push("<ul>");
        inList = true;
      }
      output.push(`<li>${inlineFormat(escapeHtml(line.slice(2)))}</li>`);
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  closeList();

  return output.join("\n");
};
