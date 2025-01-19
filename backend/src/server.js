import app from './index.js';
import { connectToDatabase } from './db/dbConnection.js';

const port = 3000;
app.listen(3000, () => {
    console.log(`App is listening on port ${port}`);
});

connectToDatabase();