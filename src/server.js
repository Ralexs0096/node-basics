import express from 'express';
import Routes from './routes/index.js';

const defaultPort = 5000;

class Server {
  constructor() {
    this.app = express();
    this.port = +process.env.PORT || defaultPort;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/check', (req, res) => {
      res.send({ message: 'It is alive' });
    });

    Routes.forEach(({ path, router }) => {
      this.app.use(path, router);
    });
  }

  listen() {
    this.app.listen(this.port, (error) => {
      if (error) {
        console.log({ error });
      }

      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
