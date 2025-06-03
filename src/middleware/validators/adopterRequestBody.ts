import { NextFunction, Request, Response } from "express";
import ResponseAPI from "../../domain/models/ResponseAPI";
import * as yup from "yup";

export const validateBody = (schema: yup.ObjectSchema<any>) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      try {
         await schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
         });

         return next();
      }
      catch(err) {
         if (err instanceof yup.ValidationError) {
            const validationErrors: Record<string, string[]> = {};

            err.inner.forEach((error) => {
               if (error.path) {
                  validationErrors[error.path] = error.errors;
               }
            });
            
            res.status(400).json(new ResponseAPI("Error creating adopter", err.errors));
            return;
         }
      }
   }
}
