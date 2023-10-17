declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        POSTGRES_USER: string;
        POSTGRES_PASSWORD : string;
        DB_PORT : string;
        POSTGRES_DB: string;
        NODE_ENV: string;
        HOST: string;
        CORS_ORIGIN: string;
        BCRYPT_SALTROUND : string;
        JWT_SECRET : string;
        AES_SECRET : string;
    }
}