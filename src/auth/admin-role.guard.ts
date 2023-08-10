import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { roles as rolesEnum } from 'src/users/enums/role.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (request?.user) {
      const { id } = request.user;
      const user = await this.userService.findOne(id);
      return user.role === rolesEnum.ADMIN;
    }

    return false;
  }
}
