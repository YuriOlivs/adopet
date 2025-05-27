import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("address")
export default class AddressEntity{
   @PrimaryGeneratedColumn("uuid")
   id!: string
   @Column()
   state: string
   @Column()
   city: string

   constructor(id: string, state: string, city: string) {
      this.id = id;
      this.state = state;
      this.city = city;
   }
}