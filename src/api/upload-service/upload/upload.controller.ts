import { Controller, Get } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Get('img/:id')
  getImage() {
    /*
      This function retrieves and returns an image based on a provided image ID. It's used to fetch a specific image from the system's storage using its unique identifier.
    */
  }

  @Get('mov/:id')
  getAndStreamVideo() {
    /*
        Serves a video stream from the database corresponding to the specified video ID. This endpoint is designed for streaming video content to the user.
    */
  }

}
