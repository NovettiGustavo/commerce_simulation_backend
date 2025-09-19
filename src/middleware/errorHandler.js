const {appError} = require("@errors");

//Verificar quais tipos de erro vão chegar e validar as possíveis falhas
function isPrismaError(err){
    if(!err || typeof err !== "object") return false;

    if(err.code === "string" && err.code.length > 0) return true;
    if(err.code === "number" && !Number.isNaN(err.code)) return true;

    if(typeof err.name === "string" && err.name.startsWith("Prisma")) return true;

    return false;
}

//Passar os err.code do prisma pra status HTTP de erro
function mapPrismaErrorsToHttp(err){
    if(!err || !err.code) return null;

    switch(err.code){
        case "P2002":
            return {statusCode: 409, name: "conflictError", message: "Registro duplicado(Unique Constraint)"}
        case "P2025":
            return {statusCode: 404, name: "notFoundError", message: "Registro não encontrado"}
        default:
            return {statusCode:500, name: "databaseError", message: "Erro no banco de dados"}
    }
}

function errorHandler(req,res,err,next){
    if(!err) return next();

    if(err instanceof appError){
        const {statusCode = 400, message} = err;

        const payload = {success: false, error: {name: err.name, message}};
        if(process.env.NODE_ENV !== 'production') payload.error.stack = err.stack;
        return res.status(statusCode).json(payload);
    }

    if(isPrismaError(err)){
        const mapped = mapPrismaErrorsToHttp(err);

        console.error("Database error: ", err);

        const statusCode = mapped?.statusCode ?? 500;    

        const response = {
            success:false,
            error:{
                name: mapped?.name  ?? "DatabaseError",
                message: mapped?.message ?? "Internal server error"
            }
        }

        if(process.env.NODE_ENV !== 'production'){
            response.error.details = err.meta || err;
        }

        return res.status(statusCode).json(response);
    }

    if(err.name === "CorsError"){
        console.warn("CORS violation", err.message);
        return res.status(err.statusCode || 403).json({
            success: false,
            error:{name:"CorsError", message:err.message}
        })
    }

    console.warn("Unexpected error",err);
    if(process.env.NODE_ENV === 'production'){
        return res.status(500).json({
            success:false,
            error:{name:"Internal Server Error", message: "Um erro inesperado aconteceu. Contate o suporte para mais informações"}
        })
    }

    return res.status(500).json({
        success:false,
        error:{name: err.name || "Error", message: err.message || "Internal Server Error", stack:err.stack}
    })
}

module.exports = errorHandler;