import { Injectable } from '@nestjs/common';
import { UploadRepository } from './upload.repository';

@Injectable()
export class UploadService {
  constructor(
    private readonly uploadRepository: UploadRepository,
  ) { }


}
