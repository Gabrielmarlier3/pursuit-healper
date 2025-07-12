import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(ctx: ExecutionContext): boolean {
    const allowed = this.reflector.get<string[]>('roles', ctx.getHandler()) || [];
    if (!allowed.length) return true;
    const user = ctx.switchToHttp().getRequest().user;
    return allowed.includes(user?.role);
  }
}