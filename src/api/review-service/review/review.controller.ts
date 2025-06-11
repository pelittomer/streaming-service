import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './service/review.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { Request } from 'express';
import { PartialGetReviewDto } from './dto/get-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @UseGuards(AuthGuard)
  @Post('')
  addReview(
    @Body() payload: CreateReviewDto,
    @Req() req: Request
  ) {
    return this.reviewService.addReview({ payload, req })
  }

  @Get()
  getAllReviews(@Query() query: PartialGetReviewDto) {
    return this.reviewService.getAllReviews(query)
  }
}
