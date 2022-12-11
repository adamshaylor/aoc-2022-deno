export interface File {
  name: string
  size: number
}

export interface Directory {
  name: string
  files: Record<string, File>
  children: Record<string, Directory>
}
