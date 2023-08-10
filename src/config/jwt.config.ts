import { JwtModuleAsyncOptions } from '@nestjs/jwt';

import appConfig from './app.config';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: appConfig().JWT_SECRET,
      signOptions: { expiresIn: appConfig().JWT_EXPIRES_IN },
    };
  },
};
