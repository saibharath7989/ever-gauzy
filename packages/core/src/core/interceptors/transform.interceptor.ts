import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  
    intercept(
		ctx: ExecutionContext, 
		next: CallHandler
	): Observable<any> {
		return next
			.handle()
			.pipe(
				map((response) => {
					if (response && response.data) {
						return response.data;
					}
					return response;
				}),
				catchError(
					(error) => observableOf(
						new HttpException(error.message, 404)
					)
				)
			);
	}
}