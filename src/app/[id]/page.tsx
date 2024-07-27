"use client";

import { useEffect } from "react";

export default function Page({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;

    useEffect(() => {
        // Verificar que estamos en el lado del cliente
        if (typeof window !== "undefined") {
            window.location.href = `/${id}/champions`;  // Redirige al cliente a la nueva URL
        }
    }, [id]);

    return <div>Cargando...</div>;
}