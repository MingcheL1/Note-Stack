const { express, bodyParser, helmet, morgan, cors} = require('./middlewares');
const connectDB = require("./db");
const { ClerkExpressWithAuth, requireAuth } = require('./clerk');
const PORT = 4000;
const app = express();

app.use(
    cors({
        origin: "http://localhost:4000",
        credentials: true
    })
)

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connectDB();
app.use(morgan("dev"));
app.use(helmet());
app.use(ClerkExpressWithAuth({ secretKey: process.env.CLERK_SECRET_KEY }));
app.listen(PORT, console.log(`API is listening on port ${PORT}`));

