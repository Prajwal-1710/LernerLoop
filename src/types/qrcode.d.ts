declare module "qrcode" {
  export function toDataURL(text: string, options?: any): Promise<string>;
  export function toString(text: string, type?: string, options?: any): Promise<string>;
}
