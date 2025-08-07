
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

function App() {
  const [oilData, setOilData] = useState([])
  const [events, setEvents] = useState([])
  const [changepoints, setChangepoints] = useState([])

  useEffect(() => {
    fetch("/api/oil-prices").then(res => res.json()).then(setOilData)
    fetch("/api/events").then(res => res.json()).then(setEvents)
    fetch("/api/changepoints").then(res => res.json()).then(setChangepoints)
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Brent Oil Price Analysis Dashboard</h1>

      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Historical Price Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={oilData}>
            <XAxis dataKey="date" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#8884d8" name="Brent Price" />
            {changepoints.map((cp, i) => (
              <Line key={i} type="stepAfter" data={[{ date: cp.date, price: cp.price }]} stroke="red" dot={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Key Events Timeline</h2>
        <ul className="space-y-1 text-sm">
          {events.map((event, idx) => (
            <li key={idx}>
              <strong>{event.date}</strong>: {event.description} ({event.impact})
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
