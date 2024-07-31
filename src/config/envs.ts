
import "dotenv/config"
import * as joi from "joi"

interface EnvVars {
    PORT:number,
    NATS_SERVERS:string[],
    MAIL_HOST:string,
    SMTP_USERNAME:string,
    SMTP_PASSWORD:string,
    AUTH_MS_URL:string,
    FRONT_URL:string
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items( joi.string() ).required(),
    MAIL_HOST:joi.string().required(),
    SMTP_USERNAME:joi.string().required(),
    SMTP_PASSWORD:joi.string().required(),
    AUTH_MS_URL:joi.string().required(),
    FRONT_URL:joi.string().required()
}).unknown(true)



const {value, error} = envsSchema.validate({ 
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
  })
if(error){
    throw new Error("config validation error: "+error)
}

const envVars:EnvVars = value

export const envs = {
    PORT: envVars.PORT,
    NATS_SERVERS: envVars.NATS_SERVERS,
    MAIL_HOST:envVars.MAIL_HOST,
    SMTP_USERNAME:envVars.SMTP_USERNAME,
    SMTP_PASSWORD:envVars.SMTP_PASSWORD,
    AUTH_MS_URL:envVars.AUTH_MS_URL,
    FRONT_URL:envVars.FRONT_URL
}