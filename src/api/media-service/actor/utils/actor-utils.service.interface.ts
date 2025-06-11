export interface IActorUtilsService {
    validateFile(uploadedFile: Express.Multer.File): Promise<void>;
}