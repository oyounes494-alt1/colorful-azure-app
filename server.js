const express = require('express');
const app = express();

// Azure App Service passes the execution port via process.env.PORT
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const nodeVersion = process.version;
  const uptime = Math.floor(process.uptime());

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Node 24 LTS on Azure App Service</title>
      <style>
        :root {
          --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --card-gradient: linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
          --accent-blue: #0078d4;
          --accent-green: #107c41;
          --accent-orange: #ff6b6b;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #0f172a;
          color: #f8fafc;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        header {
          width: 100%;
          padding: 3rem 1rem;
          text-align: center;
          background: linear-gradient(90deg, #4f46e5, #06b6d4, #10b981, #f59e0b, #ef4444);
          background-size: 300% 300%;
          animation: gradientShift 10s ease infinite;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        h1 {
          font-size: 2.8rem;
          margin: 0;
          color: #ffffff;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.4);
        }

        p.subtitle {
          font-size: 1.2rem;
          color: #e2e8f0;
          margin-top: 0.5rem;
        }

        .container {
          max-width: 1000px;
          width: 90%;
          margin: 2rem auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .card {
          background: #1e293b;
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid #334155;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .badge-azure { background: #0078d4; color: #fff; }
        .badge-node { background: #10b981; color: #000; }
        .badge-github { background: #6e7681; color: #fff; }

        .stat-value {
          font-size: 1.8rem;
          font-weight: bold;
          color: #38bdf8;
        }

        .btn {
          display: inline-block;
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .btn:hover {
          opacity: 0.9;
        }

        footer {
          margin-top: auto;
          padding: 1.5rem;
          color: #64748b;
          font-size: 0.9rem;
        }
      </style>
    </head>
    <body>

      <header>
        <h1>🚀 Node.js 24 LTS App</h1>
        <p class="subtitle">Deployed to Azure App Service via GitHub Actions</p>
      </header>

      <div class="container">
        <!-- Card 1: System Info -->
        <div class="card">
          <div class="card-header">
            <span class="badge badge-node">Runtime</span>
            <h3>Execution Stack</h3>
          </div>
          <p>Running on modern Node.js runtime environment.</p>
          <div class="stat-value">${nodeVersion}</div>
        </div>

        <!-- Card 2: Environment Info -->
        <div class="card">
          <div class="card-header">
            <span class="badge badge-azure">Cloud Platform</span>
            <h3>Azure App Service</h3>
          </div>
          <p>Host Region: <strong>${process.env.REGION_NAME || 'Linux App Service Container'}</strong></p>
          <p>Process Uptime: <strong>${uptime} seconds</strong></p>
        </div>

        <!-- Card 3: Interactive Demo -->
        <div class="card">
          <div class="card-header">
            <span class="badge badge-github">CI/CD Pipeline</span>
            <h3>GitHub Integration</h3>
          </div>
          <p>Code updates pushed to main branch automatically trigger build and deployment pipelines.</p>
          <button class="btn" onclick="triggerEffect()">Click for Color Blast 🎉</button>
        </div>
      </div>

      <footer>
        Node.js ${nodeVersion} • Hosted on Azure App Service • ${new Date().getFullYear()}
      </footer>

      <script>
        function triggerEffect() {
          const colors = ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981', '#3b82f6'];
          document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        }
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
