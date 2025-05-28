import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("address")
export default class AddressEntity{
   @PrimaryGeneratedColumn("uuid")
   id!: string
   @Column()
   state: string
   @Column()
   city: string

   constructor(state: string, city: string, id?: string) {
      if(id )this.id = id;
      this.state = state;
      this.city = city;
   }
}