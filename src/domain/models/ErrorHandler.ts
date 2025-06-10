import { HttpStatusCode } from "../../enum/HttpStatusCode";

export class ErrorHandler extends Error {
   readonly statusCode: number;

   constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
   }
}

export class InternalServerError extends ErrorHandler {
   constructor(message: string) {
      super(message, HttpStatusCode.INTERNAL_SERVER_ERROR);
   }
}

export class BadRequest extends ErrorHandler {
   constructor(message: string) {
      super(message, HttpStatusCode.BAD_REQUEST);
   }
}

export class NotFound extends ErrorHandler {
   constructor(message: string) {
      super(message, HttpStatusCode.NOT_FOUND);
   }
}

export class Conflict extends ErrorHandler {
   constructor(message: string) {
      super(message, HttpStatusCode.CONFLICT);
   }
}

export class Unauthorized extends ErrorHandler {
   constructor(message: string) {
      super(message, HttpStatusCode.UNAUTHORIZED);
   }
}

export class Forbidden extends ErrorHandler {
   constructor(message: string) {
      super(message, HttpStatusCode.FORBIDDEN);
   }
}


