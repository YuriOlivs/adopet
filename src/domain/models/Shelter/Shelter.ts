import { Expose } from "class-transformer";
import Pet from "../Pet/Pet";
import Address from "../Address/Address";

export default class Shelter {
   @Expose({ name: "id" })
   private _id: string;

   @Expose({ name: "name" })
   private _name: string;

   @Expose({ name: "password" })
   private _password: string;

   @Expose({ name: "email" })
   private _email: string;

   @Expose({ name: "phone" })
   private _phone: string;

   @Expose({ name: "pets" })
   private _pets?: Array<Pet>;

   @Expose({ name: "address" })
   private _address?: Address;

   constructor(id: string, name: string, password: string, email: string, phone: string, address: Address) {
      this._id = id;
      this._name = name;
      this._password = password;
      this._email = email;
      this._phone = phone;
      this._pets = [];
      this._address = address;
   }

   addPet(pet: Pet) { this._pets?.push(pet); }

   get id(): string { return this._id; }
   get name(): string { return this._name; }
   get password(): string { return this._password; }
   get email(): string { return this._email; }
   get phone(): string { return this._phone; }
   get pets(): Array<Pet> | undefined { return this._pets; }
   get address(): Address | undefined { return this._address; }

   setName(name: string) { this._name = name; }
   setPassword(password: string) { this._password = password; }
   setEmail(email: string) { this._email = email; }
   setPhone(phone: string) { this._phone = phone; }
   setAddress(address: Address) { this._address = address; }
}