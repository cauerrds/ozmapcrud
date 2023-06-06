
interface IConfig {
    PORT:  string,
    DB_SOURCE:  string,
}


export const config: IConfig = {
    PORT: process.env.PORT || "3000",
    DB_SOURCE: process.env.DB_SOURCE || "tmp.db",
}