import { registerAs } from '@nestjs/config';

type DatabaseCredentials = {
  user: string;
  password: string;
};
/**
 * Load database credentials
 *
 * @returns {Promise<DatabaseCredentials>} Database Credentials
 */
async function getDatabaseCredentials(): Promise<DatabaseCredentials> {
  //default credentials for env
  const dbCredentials = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  };

  if (process.env.AWS_EXECUTION_ENV) {
    //loade secrets aws
    const aws_getSecrets = eval('require')('/opt/aws_getSecrets');
    const secretDBName = process.env.SECRET_DB_NAME;
    const secrets = await aws_getSecrets(secretDBName);
    dbCredentials.user = secrets.username;
    dbCredentials.password = secrets.password;
  }
  return dbCredentials;
}

/**
 * Register `db` over environment
 */
export default registerAs('db', async () => {
  const dbCredentials = await getDatabaseCredentials();

  return {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    ...dbCredentials,
  };
});
