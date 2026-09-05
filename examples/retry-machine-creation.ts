import Dedalus from 'dedalus';

const client = new Dedalus({ apiKey: process.env.DEDALUS_API_KEY });

async function main() {
  console.log('🚀 Creating machine with smart retry...');

  try {
    const machine = await client.machines.createWithRetry({
      memory_mib: 2048,
      storage_gib: 10,
      vcpu: 1,
    });

    console.log('✅ Machine created:', machine.machine_id);
  } catch (error) {
    console.error('❌ Failed after retries:', error);
    process.exit(1);
  }
}

main();
