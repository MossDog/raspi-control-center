import { NextResponse } from 'next/server';
import { exec } from 'child_process';

export async function GET() {
    return new Promise((resolve) => {
        exec('/home/mossdog/raspi-control-center/bme280-controller/venv/bin/python /home/mossdog/raspi-control-center/bme280-controller/read-data.py', { timeout: 5000 }, (error, stdout, stderr) => {
            if (error) {
                resolve(NextResponse.json({ error: stderr || error.message }, { status: 500 }));
            } else {
                // Parse the last line of output for sensor data
                const lines = stdout.trim().split('\n');
                const lastLine = lines[lines.length - 1];
                resolve(NextResponse.json({ data: lastLine }));
            }
        });
    });
}
