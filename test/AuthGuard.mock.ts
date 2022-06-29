import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuardMock implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    request.user = {
      sub: 'testuser',
      realm_access: {
        roles: ['admin', 'user'],
      },
    };
    return true;
  }
}
