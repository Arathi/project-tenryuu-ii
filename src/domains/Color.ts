export default class Color {
  red: number = 0;
  green: number = 0;
  blue: number = 0;

  constructor(r: number = 0, g: number = 0, b: number = 0) {
    this.red = r;
    this.green = g;
    this.blue = b;
  }

  get hex(): string {
    let r = this.red.toString(16);
    if (r.length == 1) r = '0' + r;
    let g = this.green.toString(16);
    if (g.length == 1) g = '0' + g;
    let b = this.blue.toString(16);
    if (b.length == 1) b = '0' + b;
    return `#${r}${g}${b}`;
  }
}
