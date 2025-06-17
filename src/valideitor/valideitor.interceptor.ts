import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        // Verifica si es un error interno (500)
        if (err.status === 500) {
          console.error('Error en módulo o controlador:', err.message);

          // Devuelve una respuesta controlada para ese error
          return throwError(() => ({
            statusCode: 500,
            message: 'Ha ocurrido un error en este módulo. Intente más tarde.',
          }));
        }
        // Si no es un 500, propaga el error normalmente
        return throwError(() => err);
      }),
    );
  }
}