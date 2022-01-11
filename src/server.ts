import 'reflect-metadata';
import './database/connect';
import app from './app';


app.listen(process.env.SV_PORT, () => {
  console.log(`⚡ Server running on http://localhost:${process.env.SV_PORT}`);
});