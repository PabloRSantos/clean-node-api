export interface Hash {
  hash(value: string): Promise<string>
}
