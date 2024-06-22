const { express, bodyParser, helmet, morgan, cors} = require('./middlewares');
const connectDB = require("./db");
const notestack = require("./routes/api/notestack");

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

app.use(morgan("dev"));
app.use(helmet());

connectDB();
app.use("/notestack", notestack)
app.listen(PORT, console.log(`API is listening on port ${PORT}`));

