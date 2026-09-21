import { useEffect, useState } from 'react';
import { getReadings } from './api.js';

function App() {
	const [readings, setReadings] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		getReadings().then(setReadings).catch((loadError) => setError(loadError.message));
	}, []);

	const totalKwh = readings.reduce((total, reading) => total + reading.kwh, 0);
	const totalCost = readings.reduce((total, reading) => total + reading.cost, 0);

	return (
		<main className="shell">
			<header className="topbar"><span className="brand-mark">V</span><span>VATIOS</span><span className="status">● API conectada</span></header>
			<section className="hero"><p className="eyebrow">Panel energético</p><h1>Tu consumo, claro y bajo control.</h1><p className="intro">Consulta tus lecturas recientes y entiende cómo evoluciona el gasto de energía.</p></section>
			{error ? <p className="notice error">{error}. Inicia el backend para ver tus datos.</p> : null}
			<section className="metrics" aria-label="Resumen de consumo">
				<article><span>Consumo acumulado</span><strong>{totalKwh.toFixed(1)} <small>kWh</small></strong></article>
				<article><span>Coste acumulado</span><strong>{totalCost.toFixed(2)} <small>€</small></strong></article>
				<article><span>Lecturas registradas</span><strong>{readings.length}</strong></article>
			</section>
			<section className="readings"><div className="section-heading"><h2>Lecturas recientes</h2><span>Últimos 30 registros</span></div>
				{readings.length ? <div className="table-wrap"><table><thead><tr><th>Fecha</th><th>Consumo</th><th>Coste</th></tr></thead><tbody>{readings.map((reading) => <tr key={reading.id}><td>{new Date(reading.date).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</td><td>{reading.kwh.toFixed(1)} kWh</td><td>{reading.cost.toFixed(2)} €</td></tr>)}</tbody></table></div> : <p className="empty">Cargando lecturas...</p>}
			</section>
		</main>
	);
}

export default App;
