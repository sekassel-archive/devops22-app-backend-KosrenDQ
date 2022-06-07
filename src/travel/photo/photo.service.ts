import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import {
  GridFSBucket,
  GridFSFile,
  GridFSBucketReadStream,
  ObjectId,
} from 'mongodb';
import { Connection } from 'mongoose';

@Injectable()
export class PhotoService {
  private fileModel: GridFSBucket;

  constructor(@InjectConnection() private connection: Connection) {
    this.fileModel = new GridFSBucket(connection.db);
  }

  async findPhotosFromTravel(id: string): Promise<GridFSFile[]> {
    return this.fileModel.find({ metadata: { travelId: id } }).toArray();
  }

  async findPhoto(id: string, pid: string): Promise<GridFSBucketReadStream> {
    const doc: GridFSFile = await this.fileModel
      .find({ _id: new ObjectId(pid) })
      .tryNext();
    if (
      !doc ||
      !(doc.metadata as any).travelId ||
      (doc.metadata as any).travelId !== id
    ) {
      throw new NotFoundException();
    }

    return this.fileModel.openDownloadStream(doc._id);
  }

  async deletePhoto(id: string, pid: string): Promise<GridFSFile> {
    const doc: GridFSFile = await this.fileModel
      .find({ _id: new ObjectId(pid) })
      .tryNext();
    if (
      !doc ||
      !(doc.metadata as any).travelId ||
      (doc.metadata as any).travelId !== id
    ) {
      throw new NotFoundException();
    }

    await this.fileModel.delete(doc._id);
    return doc;
  }
}
