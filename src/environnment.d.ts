declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        DB_USERNAME: string;
        DB_PASSWORD : string;
        DB_PORT : string;
        DB_NAME: string;
        NODE_ENV: string;
        BCRYPT_SALTROUND : string;
        JWT_SECRET : string;
        AES_SECRET : string;
    }
}