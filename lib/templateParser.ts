export interface ElementJson {
  tagName: string,
  children: ElementJson[] | string | null,
}

export interface ElementProps {
  [s: string]: string,
}

export default class TemplateParser {

  static getJson(source: string) {
    const html = TemplateParser.getTemplateHtmlFromSource(source);
    return TemplateParser.getJsonFromHtml(html)[0];
  }

  // [1] matches template tags and its contents: <template>anything</template>
  private static getTemplateHtmlFromSource(source: string): string | null {
    const templateRegex = /<template>([\s\S]*?)<\/template>/i; // [1]
    const template = source.match(templateRegex);
    return template ? template[1] : null;
  }

  // [1] matches opening and corresponding closing tags and its contents: <tagname>contents</tagname>
  private static getJsonFromHtml(html: string): ElementJson[] | string {
    const tagsRegex = /<(\w+)>[\w\W]*?<\/\1>/g; // [1]
    console.log(html)
    const matches = html.match(tagsRegex);
    return !matches ? html : matches
      .map(match => TemplateParser.getElementJson(match))
      .map(({ tagName, innerHtml }) => ({ tagName, children: TemplateParser.getJsonFromHtml(innerHtml) }));

  }

  // [1] matches the tagname and its contents of a single tag: <tagname>contents</tagname>
  private static getElementJson(tagHtml: string): { tagName: string, innerHtml: string } {
    const tagRegex = /<(\w+)>([\w\W]*?)<\/\1>/; // [1]
    const [, tagName, innerHtml] = tagHtml.match(tagRegex);
    return { tagName, innerHtml };
  }

}