const express = require("express");
const handlebars = require("express-handlebars");
const session = require("express-session");
const flash = require("express-flash");
const FileStore = require("session-file-store")(session);
const path = require("path");
const os = require("os");

// Inicializa o express
const app = express();

const connection = require("./database/connection");

// Import Models
const User = require("./models/User");
const Publication = require("./models/Publication");
const Like = require("./models/Like");
const Comment = require("./models/Comment");

// Import Routers
const authRouters = require("./routes/authRouters");
const commentRouters = require("./routes/commentRouters");
const publicationRouters = require("./routes/publicationRouters");

// Configurando o handlebars
const hbs = handlebars.create({
  partialsDir: ["views/partials"],
  helpers: {
    /**
     * Este helper foi criado para debugar os valores que estavam sendo emitidos
     * e exibi-los num formato JSON. Seu uso é opcional, floquinho, pode apagar se desejar.
     */
    json: (context) => JSON.stringify(context, null, 2),
    
    /**
     * Este helper foi criado para criar variáveis dinâmicas do handlebars após
     * a inicialização do servidor. Seu uso é obrigatório pro modal saber qual
     * das publications foi selecionada.
     */
    set: (variableName, variableValue, options) => {
      options.data.root[variableName] = variableValue;
    },
  },
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Configurando o envio de dados
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Configurando a sessão do usuário
app.use(
  session({
    name: "session",
    secret: "SenhaForte",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: () => {},
      path: path.join(os.tmpdir(), "session"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

// Mensagens
app.use(flash());

// Para usar arquivos estáticos
app.use(express.static("public"));

app.use((request, response, next) => {
  if (request.session.userId) {
    return (response.locals.session = request.session);
  }

  next();
});

// Utilizando rotas
app.use("/", authRouters);
app.use("/", commentRouters);
app.use("/", publicationRouters);

// Conexão com o banco de dados
connection
  .sync()
  .then(() => {
    app.listen(3333);
  })
  .catch((error) => console.error(error));
