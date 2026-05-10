import { NextResponse } from 'next/server';

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
export async function GET() {
    try {
        const { stdout } = await execAsync('/home/mossdog/raspi-control-center/bme280-controller/venv/bin/python /home/mossdog/raspi-control-center/bme280-controller/read-data.py', { timeout: 5000 });
        const lines = stdout.trim().split('\n');
        const lastLine = lines[lines.length - 1];
        return NextResponse.json({ data: lastLine });
    } catch (error: any) {
        return NextResponse.json({ error: error.stderr || error.message }, { status: 500 });
    }
}
