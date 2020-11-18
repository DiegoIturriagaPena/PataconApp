import { BackendApplication } from './application';

export async function migrate(args: string[]) {
  console.log("Quiero Dormir");
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrando... (%s)', existingSchema);

  const app = new BackendApplication();
  await app.boot();

  await app.migrateSchema({ existingSchema });

  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Error al migrar : \n->\t', err);
  process.exit(1);
});
