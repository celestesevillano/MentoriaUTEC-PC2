import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

interface Mentors {
    id: number;
    name: string;
    specialty: string;
    modality: string;
    availableSlots: number;
    description: string;
}

interface MentorsResponse {
    items: Mentors[];
    page: number;
    size: number;
    totalItems: number;
    totalPages: number;
}

interface RequestCardProps {
    request: Mentors;
    cancelling: boolean;
    onCancel: (id: number) => void;
}

function RequestCard({ request, cancelling, onCancel }: RequestCardProps) {
    return (
        <li className="border rounded p-3">
            <Link to={"/mentors/" + request.id} className="font-bold link">
                {request.name}
            </Link>
            <p>Especialidad: {request.specialty}</p>
            <p>Modalidad: {request.modality}</p>
            <p>Slots disponibles: {request.availableSlots}</p>
            <p>Descripción: {request.description}</p>
            <button
                className="btn btn-outline btn-primary mt-2"
                disabled={request.availableSlots <= 0 || cancelling}
            >
                {cancelling ? "Solicitando..." : "Solicitar mentoria"}
            </button>
            <span>  </span>
            <button
                className="btn btn-outline btn-error mt-2"
                disabled={cancelling}
                onClick={() => onCancel(request.id)}
            >
                {cancelling ? "Cancelando..." : "Cancelar solicitud"}
            </button>
        </li>
    );
}

interface PaginationProps {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}

function Pagination({ page, totalPages, onChange }: PaginationProps) {
    return (
        <nav aria-label="Paginacion" className="flex items-center gap-3 mt-4">
            <button
                className="btn"
                disabled={page <= 1}
                onClick={() => onChange(page - 1)}
            >
                Anterior
            </button>
            <span>
                Pagina {page} de {totalPages}
            </span>
            <button
                className="btn"
                disabled={page >= totalPages}
                onClick={() => onChange(page + 1)}
            >
                Siguiente
            </button>
        </nav>
    );
}

function MentorsPage() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [reload, setReload] = useState(0);
    const [data, setData] = useState<MentorsResponse | null>(null);
    const [loadedKey, setLoadedKey] = useState("");
    const [error, setError] = useState("");
    const [cancelError, setCancelError] = useState("");
    const [cancellingId, setCancellingId] = useState<number | null>(null);

    const currentKey = page + "-" + reload;

    useEffect(() => {
        let cancelled = false;
        api
            .get("/api/mentors", { params: { page: page, size: 5 } })
            .then((res) => {
                if (!cancelled) {
                    setData(res.data);
                    setLoadedKey(page + "-" + reload);
                    setError("");
                }
            })
            .catch(() => {
                if (!cancelled) setError("No se pudo cargar la lista");
            });
        return () => {
            cancelled = true;
        };
    }, [page, reload]);

    const loading = loadedKey !== currentKey && !error;

    async function handleCancel(id: number) {
        setCancelError("");
        setCancellingId(id);
        try {
            await api.delete("/api/mentors/" + id);
        } catch (err: any) {
            if (err.response?.status === 409) {
                setCancelError("La solicitud ya fue confirmada y no se puede cancelar.");
            } else {
                setCancelError(err.response?.data?.message ?? "No se pudo cancelar");
            }
        } finally {
            setCancellingId(null);
            setReload((r) => r + 1);
        }
    }

    function logout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Mentores</h1>
                <button className="btn btn-outline" onClick={logout}>
                    Cerrar sesion :D
                </button>
            </div>

            {loading && <p>Cargando...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {cancelError && <p className="text-red-600">{cancelError}</p>}
            {!loading && data && data.items.length === 0 && (
                <p>No tienes solicitudes de mentoria :"c".</p>
            )}
            {!loading && data && data.items.length > 0 && (
                <ul className="flex flex-col gap-2">
                    {data.items.map((request) => (
                        <RequestCard
                            key={request.id}
                            request={request}
                            cancelling={cancellingId === request.id}
                            onCancel={handleCancel}
                        />
                    ))}
                </ul>
            )}

            {data && (
                <Pagination page={page} totalPages={data.totalPages} onChange={setPage} />
            )}
        </div>
    );
}

export default MentorsPage;