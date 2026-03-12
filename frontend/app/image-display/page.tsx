"use client";
import React, { useState } from "react";

export default function DisplayImagePage() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImageSrc(ev.target?.result as string);
            };
            reader.readAsDataURL(file);
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
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-4"
                />
                {/* Image preview (optional) */}
                {imageSrc && (
                    <div className="mb-4">
                        <img src={imageSrc} alt="Preview" className="max-w-full max-h-64" />
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
