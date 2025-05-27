import AddressEntity from "../../domain/entities/AddressEntity";
import AdopterEntity from "../../domain/entities/AdopterEntity";

export default interface IAdopterRepositor {
   createAdopter(adopter: AdopterEntity): Promise<AdopterEntity>;
   getAdopter(id: string): Promise<AdopterEntity | null>;
   updateAdopter(id: string, adopter: AdopterEntity): Promise<AdopterEntity | null>;
   updateAddress(id: string, address: AddressEntity): Promise<AdopterEntity | null>;
   deleteAdopter(id: string): Promise<boolean>;
}