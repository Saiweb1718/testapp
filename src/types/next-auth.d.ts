import 'next-auth'

declare module 'next-auth' {
    interface User{
        _id:string;
        username:string;
        isVerified:boolean;
        provider:string;
        email:string;
    }
    interface Session {
      user : {
        _id?:string;
        username?:string;
        isVerified:boolean;
      } & DefaultSession["user"]
    }

}