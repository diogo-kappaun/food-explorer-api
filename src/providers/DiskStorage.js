import fs from 'fs'

export class DiskStorage {
  async deleteFile(file) {
    try {
      await fs.promises.stat(file)
    } catch {
      return
    }

    await fs.promises.unlink(file)
  }
}

export default new DiskStorage()
