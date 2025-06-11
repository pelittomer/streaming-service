export const SUBTITLE_MESSAGES = {
    // Subtitle related errors and success messages
    INVALID_SUBTITLE_FORMAT_ERROR: 'The uploaded file must be in VTT or SRT format.',
    MOVIE_OR_EPISODE_BOTH_ERROR: 'Please provide either a movie ID or an episode ID, not both.',
    MOVIE_OR_EPISODE_REQUIRED_ERROR: 'Please provide either a movie ID or an episode ID.',
    MOVIE_NOT_FOUND_ERROR: (movieId: string) => `Movie with ID "${movieId}" not found!`,
    EPISODE_NOT_FOUND_ERROR: (episodeId: string) => `Episode with ID "${episodeId}" not found!`,
    SUBTITLE_UPLOAD_MOVIE_SUCCESS: 'Subtitle uploaded and associated with the movie successfully.',
    SUBTITLE_UPLOAD_EPISODE_SUCCESS: 'Subtitle uploaded and associated with the episode successfully.',
    SUBTITLE_UPLOAD_SUCCESS: 'Subtitle upload successful.',
};