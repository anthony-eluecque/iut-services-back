declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        DB_USERNAME: string;
        DB_PASSWORD : string;
        DB_NAME: string;
        NODE_ENV: string;
    }
}