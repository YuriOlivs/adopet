import { Expose } from "class-transformer";
import AdopterEntity from "../../entities/AdopterEntity";

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
   private _address?: string | null;

   constructor(
      id: string,
      name: string,
      email: string,
      password: string,
      photo?: string | null,
      address?: string | null
   ) {
      this._id = id;
      this._name = name;
      this._password = password;
      this._email = email;
      this._photo = photo || null;
      this._address = address || null;
   }

   get id(): string { return this._id; }
   get name(): string { return this._name; }
   get email(): string { return this._email; }
   get password(): string { return this._password; }
   get photo(): string | null { return this._photo || null; }
   get address(): string | null { return this._address || null; }

   setId(id: string) { this._id = id; }
   setName(name: string) { this._name = name; }
   setEmail(email: string) { this._email = email; }
   setPassword(password: string) { this._password = password; }
   setPhoto(photo: string) { this._photo = photo; }
   setAddress(address: string) { this._address = address; }
}