import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { Request } from 'express';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @UseGuards(AuthGuard)
  @Post('')
  addReview(
    @Body() userInputs: CreateReviewDto,
    @Req() req: Request
  ) {
    return this.reviewService.addReview(userInputs, req)
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
