import { SetMetadata } from '@nestjs/common';

export const CacheTime = (cacheTimeInSec: number) => SetMetadata('cacheTimeInSec', cacheTimeInSec);