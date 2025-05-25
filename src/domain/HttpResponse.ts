export default class HttpResponse {
   readonly success: boolean;
   readonly message: string;
   readonly data: any;

   constructor(success: boolean, message: string, data: any) {
      this.success = success;
      this.message = message;
      this.data = data;
   }
}