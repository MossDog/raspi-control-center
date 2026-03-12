import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { spawn } from "child_process";
import sharp from "sharp";

export async function POST(req: NextRequest) {
    try {
        // Parse multipart form data
        const formData = await req.formData();
        const file = formData.get("image");
        if (!file || typeof file === "string") {
            return NextResponse.json({ success: false, error: "No image uploaded" }, { status: 400 });
        }

        // Read file buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);


        // Convert to greyscale PNG and save as bitflip.png in the correct directory
        // Use absolute path for picDir and pngPath
        const picDir = "/home/mossdog/raspi-control-center/epaper-controller/pic";
        const pngPath = "/home/mossdog/raspi-control-center/epaper-controller/pic/bitflip.png";

        // Ensure picDir exists
        await fs.mkdir(picDir, { recursive: true });

        // Use sharp to convert to greyscale and PNG, rotating if needed
        let image = sharp(buffer);
        const metadata = await image.metadata();
        if (metadata.height && metadata.width && metadata.height > metadata.width) {
            // Rotate 90 degrees counterclockwise if taller than wide
            image = image.rotate(-90);
        }
        await image
            .greyscale()
            .toFormat("png")
            .toFile(pngPath);

        // Call the Python script with detailed logging
        // Use the correct absolute path to the Python script
        const scriptPath = "/home/mossdog/raspi-control-center/epaper-controller/script/image_display.py";
        console.log("[API] Calling Python script at:", scriptPath);
        await new Promise((resolve, reject) => {
            const proc = spawn("python3", [scriptPath]);
            let stdout = "";
            let stderr = "";
            proc.stdout.on("data", (data) => { stdout += data.toString(); });
            proc.stderr.on("data", (data) => { stderr += data.toString(); });
            proc.on("close", (code) => {
                console.log(`[API] Python script exited with code ${code}`);
                if (stdout) console.log(`[API] Python stdout: ${stdout}`);
                if (stderr) console.error(`[API] Python stderr: ${stderr}`);
                if (code === 0) resolve(true);
                else reject(new Error(`Python script exited with code ${code}. Stderr: ${stderr}`));
            });
            proc.on("error", (err) => {
                console.error("[API] Failed to start Python script:", err);
                reject(err);
            });
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
