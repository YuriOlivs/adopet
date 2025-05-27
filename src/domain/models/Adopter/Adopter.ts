import { Expose } from "class-transformer";
import Address from "../Address/Address";

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
   private _photo?: string;

   @Expose({ name: "address" })
   private _address?: Address;

   constructor(
      id: string,
      name: string,
      email: string,
      password: string,
      photo?: string,
      address?: Address
   ) {
      this._id = id;
      this._name = name;
      this._password = password;
      this._email = email;
      this._photo = photo;
      this._address = address;
   }

   get id(): string { return this._id; }
   get name(): string { return this._name; }
   get email(): string { return this._email; }
   get password(): string { return this._password; }
   get photo(): string | undefined { return this._photo; }
   get address(): Address | undefined { return this._address; }

   setId(id: string) { this._id = id; }
   setName(name: string) { this._name = name; }
   setEmail(email: string) { this._email = email; }
   setPassword(password: string) { this._password = password; }
   setPhoto(photo: string) { this._photo = photo; }
   setAddress(address: Address) { this._address = address; }
}