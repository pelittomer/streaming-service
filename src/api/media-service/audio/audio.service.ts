import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AudioRepository } from './audio.repository';
import { MovieRepository } from '../movie/movie.repository';
import { EpisodeRepository } from '../series/episode/episode.repository';
import { CreateAudioDto } from './dto/create-audio.dto';

@Injectable()
export class AudioService {
  constructor(
    private readonly audioRepository: AudioRepository,
    private readonly movieRepository: MovieRepository,
    private readonly episodeRepository: EpisodeRepository,
  ) { }

  async addAudio(userInputs: CreateAudioDto, uploadedFile: Express.Multer.File): Promise<string> {
    if (userInputs.movie && userInputs.episode) {
      throw new BadRequestException('Please provide either a movie ID or an episode ID, not both.')
    }

    if (!userInputs.movie && !userInputs.episode) {
      throw new BadRequestException('Please provide either a movie ID or an episode ID.')
    }

    if (userInputs.movie) {
      const movieExists = await this.movieRepository.exists({ _id: userInputs.movie })
      if (!movieExists) {
        throw new NotFoundException(`Movie with ID "${userInputs.movie}" not found!`)
      }
      await this.audioRepository.create({ movie: userInputs.movie, language: userInputs.language }, uploadedFile)
      return 'Audio uploaded and associated with the movie successfully.'
    }

    if (userInputs.episode) {
      const episodeExists = await this.episodeRepository.exists({ _id: userInputs.episode })
      if (!episodeExists) {
        throw new NotFoundException(`Episode with ID "${userInputs.episode}" not found!`)
      }
      await this.audioRepository.create({ episode: userInputs.episode, language: userInputs.language }, uploadedFile)
      return 'Audio uploaded and associated with the episode successfully.'
    }

    return 'Audio upload successful.'
  }

}
