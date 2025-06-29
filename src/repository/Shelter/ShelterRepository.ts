import { Repository } from "typeorm/repository/Repository";
import ShelterEntity from "../../domain/entities/ShelterEntity";
import IShelterRepository from "./IShelterRepository";
import { ShelterFilters } from "../../domain/models/filters/ShelterFilters";
import { ILike } from "typeorm/find-options/operator/ILike";
import PetEntity from "../../domain/entities/PetEntity";
import { Conflict, NotFound } from "../../domain/models/ErrorHandler";

export default class ShelterRepository implements IShelterRepository {
  private repository: Repository<ShelterEntity>;
  private petRepository: Repository<PetEntity>;

  constructor(
    repository: Repository<ShelterEntity>,
    petRepository: Repository<PetEntity>
  ) {
    this.repository = repository;
    this.petRepository = petRepository;
  }

  async createShelter(shelter: ShelterEntity): Promise<ShelterEntity> {
    const emailFound = await this.repository.findOneBy({
      email: ILike(`%${shelter.email}%`),
    });
    if (emailFound) throw new Conflict("Email already exists");

    const phoneFound = await this.repository.findOneBy({
      phone: ILike(`%${shelter.phone}%`),
    });
    if (phoneFound) throw new Conflict("Phone already exists");

    return await this.repository.save(shelter);
  }

  async updateShelter(
    id: string,
    shelter: ShelterEntity
  ): Promise<ShelterEntity | null> {
    const shelterFound = await this.repository.findOneBy({ id });
    if (!shelterFound) return null;

    Object.assign(shelterFound, shelter);
    return await this.repository.save(shelterFound);
  }

  async getShelter(id: string): Promise<ShelterEntity | null> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async addPet(shelterId: string, petId: string): Promise<ShelterEntity> {
    const petFound = await this.petRepository.findOneBy({ id: petId });
    if (!petFound) throw new NotFound("Pet not found");

    const shelterFound = await this.repository.findOneBy({ id: shelterId });
    if (!shelterFound) throw new NotFound("Shelter not found");

    petFound.shelter = shelterFound;
    await this.petRepository.save(petFound);

    const updatedShelter = await this.repository.findOne({
      where: { id: shelterId },
      relations: ["pets"],
    });

    return updatedShelter!;
  }

  async getAllShelters(filters: ShelterFilters): Promise<Array<ShelterEntity>> {
    const where: any = {};

    if (filters.query) where.name = ILike(`%${filters.query}%`);
    if (filters.city) where.city = filters.city;
    if (filters.state) where.state = filters.state;

    return await this.repository.find({ where, relations: ["pets"] });
  }
  async deleteShelter(id: string): Promise<boolean> {
    return (await this.repository.delete(id)).affected !== 0;
  }
}
