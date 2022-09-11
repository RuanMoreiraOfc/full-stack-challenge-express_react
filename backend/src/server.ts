import express from 'express';

import { allRoutes } from '@routes/index';

const PORT = process.env.PORT || 3333;

const app = express();
app.use(express.json());
app.use(allRoutes);

app.listen(PORT, () => console.log(`Server opened at :::${PORT}`));
