import { Controller, Get, Post } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Post('')
  addReview() {
    /*
       * Creates a new review.
       * This endpoint accepts review data in the request body and persists it in the database.
    */
  }

  @Get()
  getReview() {
    /*
        * Fetches all reviews.
        * This endpoint retrieves a list of all reviews stored in the database.
        * It returns an array of review objects.
     */
  }

}
