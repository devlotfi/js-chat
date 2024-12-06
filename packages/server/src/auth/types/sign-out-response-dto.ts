import { ApiProperty } from '@nestjs/swagger';

export class SignOutResponseDTO {
  @ApiProperty({ type: () => Boolean })
  public success: boolean;
}
