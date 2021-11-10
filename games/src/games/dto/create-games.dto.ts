import { IsNotEmpty, IsUrl, IsString } from 'class-validator';
export class CreateGameDto {
  @IsString()
  name: string;

  @IsString()
  year: string;

  @IsString()
  genre: string;

  @IsNotEmpty()
  video: string;

  @IsUrl()
  image: string;
}
