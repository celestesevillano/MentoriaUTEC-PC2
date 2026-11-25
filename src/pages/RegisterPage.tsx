import { useState, type FormEvent } from "react";

export default function RegisterPage() {
	const [error, setError] = useState("");
	const [submitted, setSubmitted] = useState(false);

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		if (formData.get("password") !== formData.get("confirmPassword")) {
			setError("Las contrasenas no coinciden.");
			setSubmitted(false);
			return;
		}

		setError("");
		setSubmitted(true);
	}

	return (
		<main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
			<section className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
				<h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
					Crear una cuenta
				</h1>
				<p className="mb-8 text-center text-gray-600">
					Registrate para así puedas comenzar a usar MentoriaUTEC.
				</p>

				<form className="space-y-5" onSubmit={handleSubmit}>
					<div>
						<label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
							Nombre completo
						</label>
						<input
							id="name"
							name="name"
							type="text"
							autoComplete="name"
							required
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
						/>
					</div>

					<div>
						<label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
							Correo electrónico
						</label>
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
						/>
					</div>

					<div>
						<label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
							Contraseña
						</label>
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="new-password"
							minLength={8}
							required
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
						/>
						<p className="mt-1 text-xs text-gray-500">Debe tener al menos 8 caracteres.</p>
					</div>

					<div>
						<label
							htmlFor="confirmPassword"
							className="mb-1 block text-sm font-medium text-gray-700"
						>
							Confirmar contraseña
						</label>
						<input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							autoComplete="new-password"
							minLength={8}
							required
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
						/>
					</div>

					{error && <p role="alert" className="text-sm text-red-600">{error}</p>}
					{submitted && (
						<p role="status" className="text-sm text-green-700">
							Credenciales validadas correctamente.
						</p>
					)}

					<button
						type="submit"
						className="w-full rounded-md bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Registrarme
					</button>
				</form>

				<p className="mt-6 text-center text-sm text-gray-600">
					¿Ya tienes una cuenta? <a href="/login" className="font-medium text-blue-600 hover:underline">Inicia sesión</a>
				</p>
			</section>
		</main>
	);
}
