export enum FileType {
   Image = 'Image',
   Document = 'Document',
   Audio = 'Audio',
   Miscellaneous = 'Miscellaneous'
}

export class File implements FileInterface {
   title: string
   filename: string
   type: FileType
   comments: string
   size: number
   url: string

   constructor(
      title = 'Untitled File',
      filename = '',
      type = FileType.Image,
      comments = '',
      size = 0,
      url = ''
   ) {
      this.title = title
      this.filename = filename
      this.type = type
      this.comments = comments
      this.size = size
      this.url = url
   }
}

export interface FileInterface {
   title: string
   filename: string
   type: FileType
   comments: string
   size: number
   url: string
}
