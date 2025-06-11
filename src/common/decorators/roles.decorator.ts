import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/api/user-service/user/entities/types';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);