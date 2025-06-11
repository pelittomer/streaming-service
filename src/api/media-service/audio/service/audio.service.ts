import { Injectable } from '@nestjs/common';
import { AudioRepository } from '../repository/audio.repository';
import { PartialGetAudioDto } from '../dto/get-audio.dto';
import { Types } from 'mongoose';
import { AddAudioParams, IAudioService, TAudioData } from './audio.service.interface';
import { AudioUtilsService } from '../utils/audio-utils.service';
import { TFindAudio } from '../repository/audio.repository.interface';
import { AUDIO_MESSAGES } from '../constants/audio.message';

@Injectable()
export class AudioService implements IAudioService {
  constructor(
    private readonly audioRepository: AudioRepository,
    private readonly audioUtilsService: AudioUtilsService,
  ) { }

  async addAudio({ payload, uploadedFile }: AddAudioParams): Promise<string> {
    await this.audioUtilsService.validateFile(uploadedFile)
    await this.audioUtilsService.validateAssociation(payload)
    const audioData: TAudioData = { language: payload.language }

    if (payload.movie) {
      audioData.movie = new Types.ObjectId(payload.movie)
      await this.audioUtilsService.verifyMovieExistence(payload.movie)
      await this.audioRepository.create({ payload: audioData, uploadedFile })
      return AUDIO_MESSAGES.AUDIO_UPLOAD_MOVIE_SUCCESS
    }

    if (payload.episode) {
      audioData.episode = new Types.ObjectId(payload.episode)
      await this.audioUtilsService.verifyEpisodeExistence(payload.episode)
      await this.audioRepository.create({ payload: audioData, uploadedFile })
      return AUDIO_MESSAGES.AUDIO_UPLOAD_EPISODE_SUCCESS
    }

    // This line should normally not be reached, but it's added for TypeScript control.
    return AUDIO_MESSAGES.AUDIO_UPLOAD_SUCCESS
  }

  async getAllAudios(
    query: PartialGetAudioDto
  ): Promise<TFindAudio> {
    const hasMovieQuery = !!query.movie
    const hasEpisodeQuery = !!query.episode

    if (hasMovieQuery && hasEpisodeQuery) return []
    if (!hasMovieQuery && !hasEpisodeQuery) return []

    const findQuery: Partial<PartialGetAudioDto> = {}
    if (query.movie) findQuery.movie = new Types.ObjectId(query.movie)
    if (query.episode) findQuery.episode = new Types.ObjectId(query.episode)

    return await this.audioRepository.find(findQuery)
  }
}
