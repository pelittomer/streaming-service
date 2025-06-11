import { Audio } from "../entities/audio.entity";
import { AudioDocument } from "../entities/types";

export interface CreateAudioOptions {
    payload: Partial<Pick<Audio, 'episode' | 'movie' | 'language'>>;
    uploadedFile: Express.Multer.File;
}
export type FindAudioOptions = Partial<Pick<Audio, 'movie' | 'episode'>>;
export type TFindAudio = Pick<AudioDocument, '_id' | 'language' | 'audioFile'>[];
export interface IAudioRepository {
    create(params: CreateAudioOptions): Promise<void>;
    find(queryFields: FindAudioOptions): Promise<TFindAudio>;
}