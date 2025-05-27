import { Expose } from "class-transformer";

export default class Address {
   @Expose ({ name: "id" })
   private _id: string;

   @Expose({ name: "state" })
   private _state: string;

   @Expose({ name: "city" })
   private _city: string;

   constructor(id: string, state: string, city: string) {
      this._id = id;
      this._state = state;
      this._city = city;
   }

   get id(): string { return this._id; }
   get state(): string { return this._state; }
   get city(): string { return this._city; }

   setId(id: string) { this._id = id; }
   setState(state: string) { this._state = state; }
   setCity(city: string) { this._city = city; }
}