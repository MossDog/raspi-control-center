
"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function DisplayImagePage() {
    const [fileName, setFileName] = useState<string>("");
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImageSrc(ev.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
        else {
            setFileName("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageSrc) return;
        // Convert imageSrc (data URL) to blob
        const blob = await fetch(imageSrc).then(res => res.blob());
        const formData = new FormData();
        formData.append("image", blob, "upload.png");
        await fetch("/api/image-display", {
            method: "POST",
            body: formData,
        });
        // Optionally show success/failure
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Upload Image for E-Paper Display</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 flex items-center gap-2">
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        title="Select an image to upload"
                        className="hidden"
                    />
                    <label
                        htmlFor="image-upload"
                        className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-600"
                    >
                        {!fileName ? "Choose File" : "Choose New File"}
                    </label>
                    <span className={!fileName ? "text-red-500 text-xs" : "text-green-500 text-sm"}>
                        {fileName || "No file chosen"}
                    </span>
                </div>
                {/* Image preview (optional) */}
                {imageSrc && (
                    <div className="mb-4">
                        <Image
                            src={imageSrc}
                            alt="Preview"
                            width={400}
                            height={256}
                            className="max-w-full max-h-64"
                            style={{ height: "auto", width: "100%" }}
                        />
                    </div>
                )}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    disabled={!imageSrc}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
