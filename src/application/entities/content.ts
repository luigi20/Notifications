export class Content {
  private readonly content: string;

  constructor(content: string) {
    const isContentLengthValid = this.ValidateContentLength(content);
    if (!isContentLengthValid) {
      throw new Error('Content length error');
    }
    this.content = content;
  }
  private ValidateContentLength(content: string): boolean {
    return content.length > 4 && content.length <= 240;
  }

  get value(): string {
    return this.content;
  }
}
