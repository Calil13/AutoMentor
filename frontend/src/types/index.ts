// Auth Types
export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface UserResponseDtoPrivate {
  fullName: string;
  email: string;
}

// Exam & Question Types
export interface VariantResponseDto {
  id: number;
  text: string;
  imageUrls: string[];
}

export interface QuestionResponseDto {
  txt: string;
  imgUrl: string[];
  variants: VariantResponseDto[];
}

// Road Sign Types
export interface RoadSignCategoryResponseDto {
  id: number;
  categoryName: string;
}

export interface RoadSignResponseDto {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

// Chapter Types
export interface ChapterResponseDto {
  id: number;
  chapterTitle: string;
  description: string;
}

export interface ChaptersResponseDto {
  chapterTitle: string[];
}
