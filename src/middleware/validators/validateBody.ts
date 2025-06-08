import { NextFunction, Request, Response } from "express";
import ResponseAPI from "../../domain/models/ResponseAPI";
import * as yup from "yup";

export const validateBody = (schema: yup.ObjectSchema<any> | yup.ArraySchema<any, any>) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      try {
         let bodyToValidate = req.body;

         const isPetListSchema = 
            schema instanceof yup.ObjectSchema &&
            schema.fields &&
            'pets' in schema.fields;

         if (isPetListSchema && Array.isArray(req.body)) {
            bodyToValidate = { pets: req.body };
         }

         await schema.validate(bodyToValidate, {
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