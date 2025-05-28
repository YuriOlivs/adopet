export default class ResponseAdopterDTO {
   id: string;
   name: string;
   email: string;
   photo?: string | null;

   constructor(id: string, name: string, email: string, photo?: string) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.photo = photo ?? null;
   }
}