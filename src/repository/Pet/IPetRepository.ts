import PetEntity from "../../entities/PetEntity";

export default interface IPetRepository{
   createPet(pet: PetEntity): Promise<PetEntity | Array<PetEntity>>;
   getAllPets(): Promise<Array<PetEntity>>;
   getPet(id: string): Promise<PetEntity | null>;
   updatePet(id:string, pet: PetEntity): Promise<PetEntity | null>;
   deletePet(id: string): Promise<boolean>;
}