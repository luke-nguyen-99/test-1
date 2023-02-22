import {
  BadRequestException,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthorGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get('public', context.getHandler());
    if (!!isPublic) return true;

    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) {
      throw new BadRequestException('UNAUTHORIZED');
    }
    const request = context.switchToHttp().getRequest();
    const userActive = request.user;

    const roles = this.reflector.getAllAndOverride<string[]>('rolesCheck', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) return true;

    if (!!userActive) {
      if (roles.indexOf(userActive.role) < 0)
        throw new ForbiddenException('Not permission');
    }
    return true;
  }
}
