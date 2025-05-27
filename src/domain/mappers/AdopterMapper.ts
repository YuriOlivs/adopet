import Adopter from "../models/Adopter/Adopter";
import AdopterEntity from "../entities/AdopterEntity";

export default class AdopterMapper {
   static toEntity(adopter: Adopter): AdopterEntity {
      return new AdopterEntity(
         adopter.id,
         adopter.name,
         adopter.email,
         adopter.password,
         adopter.photo || "",
         adopter.address || ""
      );
   }

   static toDomain(adopter: AdopterEntity): Adopter {
      return new Adopter(
         adopter.id,
         adopter.name,
         adopter.email,
         adopter.password,
         adopter.photo || "",
         adopter.address || ""
      );
   }
}