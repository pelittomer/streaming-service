export const AUDIO_MESSAGES = {
    // Audio file related errors and success messages
    AUDIO_FILE_MISSING_OR_INVALID: 'Audio file is missing or has an invalid format. Please upload a valid audio file.',
    MOVIE_OR_EPISODE_BOTH: 'Please provide either a movie ID or an episode ID, not both.',
    MOVIE_OR_EPISODE_REQUIRED: 'Please provide either a movie ID or an episode ID.',
    MOVIE_NOT_FOUND: (movieId: string) => `Movie with ID "${movieId}" not found!`,
    EPISODE_NOT_FOUND: (episodeId: string) => `Episode with ID "${episodeId}" not found!`,
    AUDIO_UPLOAD_MOVIE_SUCCESS: 'Audio uploaded and associated with the movie successfully.',
    AUDIO_UPLOAD_EPISODE_SUCCESS: 'Audio uploaded and associated with the episode successfully.',
    AUDIO_UPLOAD_SUCCESS: 'Audio upload successful.',
};