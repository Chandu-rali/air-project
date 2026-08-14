const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const aircraft = [
  {
    id: 1,
    name: "Airbus A350-900",
    manufacturer: "Airbus",
    type: "Wide-body",
    category: "Long Haul",
    passengers: 350,
    range: "15,750 km",
    speed: "Mach 0.85",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    name: "Boeing 787 Dreamliner",
    manufacturer: "Boeing",
    type: "Wide-body",
    category: "Long Haul",
    passengers: 330,
    range: "14,010 km",
    speed: "Mach 0.85",
    image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    name: "Airbus A320neo",
    manufacturer: "Airbus",
    type: "Narrow-body",
    category: "Short / Medium Haul",
    passengers: 194,
    range: "6,300 km",
    speed: "Mach 0.78",
    image:
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    name: "Boeing 777-300ER",
    manufacturer: "Boeing",
    type: "Wide-body",
    category: "Long Haul",
    passengers: 396,
    range: "13,650 km",
    speed: "Mach 0.89",
    image:
      "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=1200&q=80"
  }
];

app.get("/", (req, res) => {
  res.json({
    message: "Aircraft API is running",
    status: "success"
  });
});

app.get("/api/aircraft", (req, res) => {
  res.json(aircraft);
});

app.get("/api/aircraft/:id", (req, res) => {
  const id = Number(req.params.id);

  const plane = aircraft.find((item) => item.id === id);

  if (!plane) {
    return res.status(404).json({
      message: "Aircraft not found"
    });
  }

  res.json(plane);
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Aircraft backend running on port ${PORT}`);
});
