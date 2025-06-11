import { Subtitle } from "../schemas/subtitle.schema";
import { SubtitleDocument } from "../schemas/types";

export interface CreateSubtitleOptions {
    payload: Partial<Pick<Subtitle, 'episode' | 'movie' | 'language'>>;
    uploadedFile: Express.Multer.File;
}
export type FindSubtitleOptions = Partial<Pick<Subtitle, 'movie' | 'episode'>>;
export type TFindSubtitle = Pick<SubtitleDocument, '_id' | 'language' | 'subtitlefile'>[];
export interface ISubtitleRepository {
    create(params: CreateSubtitleOptions): Promise<void>;
    find(queryFields: FindSubtitleOptions): Promise<TFindSubtitle>;
}