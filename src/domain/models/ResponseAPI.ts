export default class ResponseAPI {
   message: string;
   body?: any;

   constructor(message: string, data?: any) {
      this.message = message;
      this.body = data;
   }
}