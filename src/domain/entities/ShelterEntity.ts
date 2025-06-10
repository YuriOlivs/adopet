import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import AddressEntity from "./AddressEntity";
import { cryptPassword } from "../../utils/cryptPassword";
import PetEntity from "./PetEntity";

@Entity()
export default class ShelterEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToOne(() => AddressEntity, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  address: AddressEntity;

  @OneToMany(() => PetEntity, (pet) => pet.shelter)
  @JoinColumn()
  pets!: Array<PetEntity>;

  constructor(
    name: string,
    password: string,
    email: string,
    phone: string,
    address: AddressEntity,
    id?: string,
    pets?: Array<PetEntity>
  ) {
    if (id) this.id = id;
    if (pets) this.pets = pets;
    this.name = name;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }

  @BeforeInsert()
  @BeforeUpdate()
  protected async createCryptPassword() {
    this.password = cryptPassword(this.password);
  }
}
