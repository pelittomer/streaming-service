import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Movie } from "./schemas/movie.schema";
import { Model } from "mongoose";

@Injectable()
export class MovieRepository {
    constructor(
        @InjectModel(Movie.name) private movieModel: Model<Movie>
    ) { }

}