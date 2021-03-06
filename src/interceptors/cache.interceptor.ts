import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from "@nestjs/core";
import { Observable, of } from 'rxjs';
import { tap } from "rxjs/operators";
import { CacheEntity } from "../cache/cache.entity";

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    constructor(
        private reflector: Reflector,
    ) {
    }

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<any>> {
        const method = context.getHandler();
        const cacheTimeInSec = this.reflector.get<number>('cacheTimeInSec', method);
        const parameters = context.getArgByIndex(0).url;

        const cachedData = await CacheEntity.findOne({
            where: {
                parameters
            },
        });

        if (cachedData) {
            if (+cachedData.createdAt + cacheTimeInSec * 1000 > +new Date()) {
                console.log('\x1b[33m', 'CACHE: Using cached data.');
                return of(JSON.parse(cachedData.dataJson));
            } else {
                console.log('\x1b[33m', 'CACHE: Removing old cache data.', cachedData.id);
                await cachedData.remove();
            }
        }

        console.log('\x1b[33m', 'CACHE: Generating live data.');
        return next.handle().pipe(
            tap(async data => {
                const newCachedData = new CacheEntity();
                newCachedData.dataJson = JSON.stringify(data);
                newCachedData.parameters = parameters;
                await newCachedData.save();
            }),
        );

    }
}