import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Proxy requests to Python Flask backend
  app.post("/api/predict", async (req, res) => {
    try {
      const response = await fetch("http://localhost:5001/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error proxying to Flask backend:", error);
      res.status(500).json({ error: "Failed to connect to prediction service" });
    }
  });

  app.get("/api/health", async (req, res) => {
    try {
      const response = await fetch("http://localhost:5001/api/health");
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Flask backend not available" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
