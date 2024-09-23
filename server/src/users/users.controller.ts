import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { UserPublicDTO } from './types/user-public-dto';
import { UsersQuery } from './types/users-query';
import { UserLinkStatusDTO } from './types/user-link-status-dto';
import { UserLinkStatusParams } from './types/user-link-status-params';

@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: [UserPublicDTO],
  })
  public async users(
    @Query() usersQuery: UsersQuery,
    @CurrentUser() userId: string,
  ): Promise<UserPublicDTO[]> {
    return await this.usersService.users(usersQuery, userId);
  }

  @Get(':userId/status')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => UserLinkStatusDTO,
  })
  public async userLinkStatus(
    @Param() userLinkStatusParams: UserLinkStatusParams,
    @CurrentUser() userId: string,
  ): Promise<UserLinkStatusDTO> {
    return await this.usersService.userLinkStatus(
      userId,
      userLinkStatusParams.userId,
    );
  }
}
