import app from "./app";
import env from "./utils/validateEnv"
import  pingEndpoint  from "./utils/cronJob";
const port = env.PORT;


    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port} 🚀`);
        // setInterval(pingEndpoint, 1 * 60 * 1000);
});