import { NextFunction, Request, Response } from "express";
import ResponseAPI from "../../domain/models/ResponseAPI";
import * as yup from "yup";

export const validateBody = (schema: yup.ObjectSchema<any> | yup.ArraySchema<any, any>) => {
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

export const validateBodyArray = (schema: yup.ObjectSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    if (!Array.isArray(body)) {
      return res.status(400).json(new ResponseAPI("Body must be an array", []));
    }

    const invalidItems: Record<number, Record<string, string[]>> = {};
    const validItems: any[] = [];

    for (let i = 0; i < body.length; i++) {
      try {
        const validated = await schema.validate(body[i], {
          abortEarly: false,
          stripUnknown: true,
        });

        validItems.push(validated);
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const validationErrors: Record<string, string[]> = {};

          err.inner.forEach((error) => {
            if (error.path) {
              if (!validationErrors[error.path]) {
                validationErrors[error.path] = [];
              }
              validationErrors[error.path].push(...error.errors);
            }
          });

          invalidItems[i] = validationErrors;
        }
      }
    }

    if (Object.keys(invalidItems).length > 0) {
      return res.status(400).json(
        new ResponseAPI("Some items in the array are invalid", invalidItems)
      );
    }

    return next();
  };
};
