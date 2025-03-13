import { forbiddenException, IS_PUBLIC_KEY } from '@app/domain';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.handlePublicRoute(context);

    if (isPublic) {
      return true;
    }

    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user['cognito:groups']) {
      forbiddenException('Access denied: insufficient permissions');
    }

    const userRoles: string[] = user['cognito:groups'];

    const hasRole = requiredRoles.some((role) => userRoles.includes(role));
    if (!hasRole) {
      forbiddenException('Access denied: insufficient permissions');
    }

    return true;
  }

  handlePublicRoute(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    return isPublic;
  }
}
