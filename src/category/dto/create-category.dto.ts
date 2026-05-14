import { IsString, Matches } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  @Matches(/^#([A-Fa-f0-9]{6})$/, {
    message: 'Color must be a valid HEX color (e.g. #FF0000)',
  })
  color: string;
}
