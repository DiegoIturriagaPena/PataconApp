import { BackendApplication } from './application';

export async function rollback(args: string[]) {
  const existingSchema = 'drop';
  console.log('Ejecutando Rollback (%s)', existingSchema);

  const app = new BackendApplication();
  await app.boot();
  await app.migrateSchema({ existingSchema });

  process.exit(0);
}

rollback(process.argv).catch(err => {
  console.error('No se puede ejecutar {ROLLBACK} erro', err);
  process.exit(1);
});
