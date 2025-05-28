import { Expose } from "class-transformer";
import Address from "../Address/Address";
import Pet from "../Pet/Pet";

export default class Adopter {
   @Expose({ name: "id" })
   private _id: string;

   @Expose({ name: "name" })
   private _name: string;

   @Expose({ name: "email" })
   private _email: string;

   @Expose({ name: "password" })
   private _password: string;

   @Expose({ name: "photo" })
   private _photo?: string | null;

   @Expose({ name: "address" })
   private _address?: Address | null;

   @Expose({ name: "pets" })
   private _pets?: Array<Pet> | null;

   constructor(
      id: string,
      name: string,
      email: string,
      password: string,
      photo?: string,
      address?: Address,
      pets?: Array<Pet>,
   ) {
      this._id = id;
      this._name = name;
      this._password = password;
      this._email = email;
      this._photo = photo ?? null;
      this._address = address ?? null;
      this._pets = pets ?? null;
   }

   get id(): string { return this._id; }
   get name(): string { return this._name; }
   get email(): string { return this._email; }
   get password(): string { return this._password; }
   get photo(): string | null { return this._photo ?? null; }
   get address(): Address | null { return this._address ?? null; }
   get pets(): Array<Pet> | null { return this._pets ?? null; }

   setId(id: string) { this._id = id; }
   setName(name: string) { this._name = name; }
   setEmail(email: string) { this._email = email; }
   setPassword(password: string) { this._password = password; }
   setPhoto(photo: string) { this._photo = photo; }
   setAddress(address: Address) { this._address = address; }
   setPets(pets: Array<Pet>) { this._pets = pets; }
}