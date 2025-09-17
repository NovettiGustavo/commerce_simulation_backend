//1º passo = declarar as origens permitidas, os métodos permitidos e os headers permitidos

const allowedOrigins = ["http://localhost:3000", "https://www.siteficticioteste.com"];
const allowedMethods = ["GET","POST","PUT","DELETE","OPTIONS"];
const allowedHeaders = ["Content-type", "Authorization"];

function corsHandler(req,res,next){
    const origin = req.headers.origin;//Armazendo o valor do cabeçalho HTTP origin da requisição

    //2º passo: validar as origens da requisição
    if(!origin || !allowedOrigins.includes(origin)){
        const err = new Error(`CORS violation: Origin ${origin || "undefined"} is not allowed`);
        err.name = "CorsError";
        err.statusCode = 403;
        return next(err)
    }

    //3º passo: validar os métodos da requisição
    if(!allowedMethods.includes(req.method)){
        const err = new Error(`CORS violation: Method ${req.method} is not allowed`);
        err.name = "CorsError";
        err.statusCode = 405;
        return next(err);
    }

    //4º passo: validar os headers da requisição
    const requestHeaders = req.headers["access-control-request-headers"];//Recebo os CORS preflight e armazeno em uma variável
    if(requestHeaders){
        const invalidHeaders = requestHeaders //Filtro os headers recebidos no formato de string e filtro os métodos que não são permitidos, armazenando numa variável
        .split(",")                           // transformo num array, tiro os espaços
        .map(h => h.trim())                   //e filtro os métodos que não são permitidos, armazenando na variável invalidHeaders
        .filter(h => !allowedHeaders.includes(h))

        if(invalidHeaders.length > 0){
            const err = new Error(`CORS violation: Headers [${invalidHeaders.join(", ")}] is not allowed`);
            err.name = "CorsError";
            err.statusCode = 400;
            return next(err);
        }
    }

    //Passando nas validações, defino os cabeçalhos(headers) corretamente
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", allowedMethods.join(","));
    res.setHeader("Access-Control-Allow-Headers", allowedHeaders.join(","));

    if(req.method === "OPTIONS"){
        return res.sendStatus(204);
    }

    next();
}

module.exports = corsHandler;