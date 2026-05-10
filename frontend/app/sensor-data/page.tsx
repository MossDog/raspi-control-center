"use client";
import React, { useState, useEffect } from "react";

export default function SensorDataPage() {
    const [data, setData] = useState<string>("Loading...");
    const [error, setError] = useState<string | null>(null);
    const [timestamp, setTimestamp] = useState<string>("");

    const fetchData = async () => {
        try {
            const res = await fetch("/api/sensor-data");
            const json = await res.json();
            setTimestamp(new Date().toLocaleTimeString());
            if (json.data) {
                setData(json.data);
                setError(null);
            } else if (json.error) {
                setError(json.error);
            }
        } catch (err) {
            setError("Failed to fetch sensor data");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-2 sm:px-0">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Sensor Data</h1>
            <div className="mb-2 text-gray-500 text-sm text-center">Last update: {timestamp}</div>
            <button
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={fetchData}
            >
                Update
            </button>
            {error ? (
                <div className="text-red-500 max-w-full break-words text-center">{error}</div>
            ) : (
                <div className="text-lg sm:text-xl bg-gray-100 p-4 rounded shadow whitespace-pre-line max-w-full break-words text-center">
                    {data}
                </div>
            )}
        </div>
    );
}
