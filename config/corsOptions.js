import { allowedOrigins } from "./allowedOrigins.js";

export const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }else{
            new Error("Not allowed by CORS!");
        }
    },
    credentials: true,
    optionSuccessStatus: 200,
}