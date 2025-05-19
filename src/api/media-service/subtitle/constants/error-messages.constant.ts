export const INVALID_SUBTITLE_FORMAT_ERROR = 'The uploaded file must be in VTT or SRT format.'
export const MOVIE_OR_EPISODE_BOTH_ERROR = 'Please provide either a movie ID or an episode ID, not both.'
export const MOVIE_OR_EPISODE_REQUIRED_ERROR = 'Please provide either a movie ID or an episode ID.'
export const MOVIE_NOT_FOUND_ERROR = (movieId: string) => `Movie with ID "${movieId}" not found!`
export const EPISODE_NOT_FOUND_ERROR = (episodeId: string) => `Episode with ID "${episodeId}" not found!`
export const SUBTITLE_UPLOAD_MOVIE_SUCCESS = 'Subtitle uploaded and associated with the movie successfully.'
export const SUBTITLE_UPLOAD_EPISODE_SUCCESS = 'Subtitle uploaded and associated with the episode successfully.'
export const SUBTITLE_UPLOAD_SUCCESS = 'Subtitle upload successful.'