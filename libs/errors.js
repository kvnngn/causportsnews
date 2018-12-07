var util = require("util");

function CauSportsNewsError() {
    Error.captureStackTrace(this, CauSportsNewsError);
    this.name = "CauSportsNewsError";
    this.flag = "CauSportsNewsError_flag";
    this.message = "CauSportsNewsError_message";
    this.statusCode = 404;
}

util.inherits(CauSportsNewsError, Error);
exports.CauSportsNewsError = CauSportsNewsError;


function NotFound(message) {
    CauSportsNewsError.call(this);
    this.name = "NotFound";
    this.flag = "NOT_FOUND";
    this.message = message || "";
    this.statusCode = 404;
}

util.inherits(NotFound, CauSportsNewsError);
exports.NotFound = NotFound;


function InvalidAction(flag) {
    CauSportsNewsError.call(this);
    this.name = "NotFound";
    this.flag = flag;
    this.statusCode = 404;
}

util.inherits(InvalidAction, CauSportsNewsError);
exports.NotFound = InvalidAction;


function Db(message) {
    CauSportsNewsError.call(this);
    this.name = "Db";
    this.flag = "DB_ERROR";
    this.message = message || "";
    this.statusCode = 500;
}

util.inherits(Db, CauSportsNewsError);
exports.Db = Db;


function Sequelize(err) {
    CauSportsNewsError.call(this);
    this.name = "Sequelize";
    this.flag = "SEQUELIZE_ERROR_" + err.name;
    this.message = "Sequelize error: " + err.message || "";
    this.statusCode = 500;
    if(err.errors && err.errors[0].path) {
        this.flag += "_" + err.errors[0].path;
    }
}

util.inherits(Sequelize, CauSportsNewsError);
exports.Sequelize = Sequelize;

function Sendinblue(err) {
    CauSportsNewsError.call(this);
    this.name = "Sendinblue";
    this.flag = "SENDINBLUE_ERROR_" + err.message;
    this.message = "Sendinblue error: " + err.code;
    this.statusCode = 500;
}

util.inherits(Sendinblue, CauSportsNewsError);
exports.Sendinblue = Sendinblue;

function Demo() {
    CauSportsNewsError.call(this);
    this.name = "DEMO_MODE";
    this.flag = "DEMO_MODE";
    this.message = "Mode Demo";
    this.statusCode = 500;
}

util.inherits(Demo, CauSportsNewsError);
exports.Demo = Demo;

function Stripe(err) {
    CauSportsNewsError.call(this);
    this.name = "Stripe";
    this.flag = "STRIPE_ERROR_" + err.type;
    this.type = err.rawType;
    this.param = err.param;
    this.code = err.code;
    this.statusCode = 500;
    const MESSAGES = {
        'api_connection_error': 'Erreur de connection. Vérifiez que vous êtes bien connecté et rééssayez.',
        'api_error': 'Une erreur s\'est produite sur le serveur de la banque. Veuillez retenter prochainement.',
        'authentication_error': 'Erreur d\'authentification. Vérifiez que vous êtes bien authentifié(e).',
        'invalid_request_error': 'Certains paramètres sont manquants. Veuillez les vérifier.',
        'rate_limit_error': 'Trop de requêtes ont été passées dans le temps. Veuillez patienter avant de retenter.',
        'card_error': {
            'invalid_number': 'Le numéro de carte banquaire n\'est pas valide.',
            'invalid_expiry_month': 'Le mois de la date d\'expiration n\'est pas valide.',
            'invalid_expiry_year': 'L\'année de la date d\'expiration n\'est pas valide.',
            'invalid_cvc': 'Le code de vérification de la carte n\'est pas valide. C\'est un code à trois chiffres situé au dos de la carte.',
            'incorrect_number': 'Le numéro de la carte n\'est pas correct.',
            'expired_card': 'La carte a expiré.',
            'incorrect_cvc': 'Le code de vérification de la carte est incorrect. C\'est un code à trois chiffres situé au dos de la carte.',
            'incorrect_zip': 'Le code postal de la carte n\'est pas correct.',
            'card_declined': 'La carte a été refusée par la banque.',
            'missing': 'Vous n\'avez pas indiqué de carte de paiement.',
            'processing_error': 'Une erreur s\'est produite lors du traitement de la carte.'
        }
    };

    if(this.type in MESSAGES) {
        if(this.type === 'card_error') {
            if(this.code in MESSAGES.card_error) {
                this.message = MESSAGES.card_error[this.code];
            } else {
                this.message = "Une erreur inconnue s'est produite lors de l'enregistrement de la carte."
            }
        } else {
            this.message = MESSAGES[err.rawType];
        }
    } else {
        this.message = "Une erreur inconnue s'est produite lors de la communication avec le service de paiement.";
    }
    console.log(this);
}

util.inherits(Stripe, CauSportsNewsError);
exports.Stripe = Stripe;


function MissingParams(flag) {
    CauSportsNewsError.call(this);
    this.name = "MissingParams";
    this.flag = "MISSING_PARAM_" + flag;
    this.message = this.flag;
    this.statusCode = 400;
}

util.inherits(MissingParams, CauSportsNewsError);
exports.MissingParams = MissingParams;


function InvalidParam(param, value) {
    CauSportsNewsError.call(this);
    this.name = "InvalidParam";
    this.flag = "INVALID_PARAM_" + param;
    this.message = "The parameter " + param + " has an invalid value of \"" + value + "\"";
    this.statusCode = 400;
}

util.inherits(InvalidParam, CauSportsNewsError);
exports.InvalidParam = InvalidParam;


function IncorrectParam(flag, message) {
    CauSportsNewsError.call(this);
    this.name = "IncorrectParam";
    this.flag = "INCORRECT_PARAM_" + flag;
    this.message = message;
    this.statusCode = 400;
}

util.inherits(IncorrectParam, CauSportsNewsError);
exports.IncorrectParam = IncorrectParam;


function AlgorithmError(flag) {
    CauSportsNewsError.call(this);
    this.name = "AlgorithmError";
    this.flag = "ALGORITHM_ERROR_" + flag;
    this.message = this.flag;
    this.statusCode = 400;
}

util.inherits(AlgorithmError, CauSportsNewsError);
exports.AlgorithmError = AlgorithmError;


function AuthFailed(flag) {
    CauSportsNewsError.call(this);
    this.name = "AuthFailed";
    this.flag = "AUTH_FAILED_" + flag;
    this.message = this.flag;
    this.statusCode = 401;
}

util.inherits(AuthFailed, CauSportsNewsError);
exports.AuthFailed = AuthFailed;


function PassportFailed() {
    CauSportsNewsError.call(this);
    this.name = "PassportFailed";
    this.flag = "PASSPORT_FAILED";
    this.message = this.flag;
    this.statusCode = 401;
}

util.inherits(PassportFailed, CauSportsNewsError);
exports.PassportFailed = PassportFailed;


function Unique(flag) {
    CauSportsNewsError.call(this);
    this.name = "Unique";
    this.flag = "UNIQUE_" + flag;
    this.message = this.flag;
    this.statusCode = 400;
}

util.inherits(Unique, CauSportsNewsError);
exports.Unique = Unique;


function Geocode(message, flag) {
    CauSportsNewsError.call(this);
    this.name = "Geocode";
    this.flag = flag || "GEOCODE_ERR";
    this.message = message || "";
    this.statusCode = 400;
}

util.inherits(Geocode, CauSportsNewsError);
exports.Geocode = Geocode;

function Frames(flag) {
    CauSportsNewsError.call(this);
    this.name = "Frames";
    this.flag = "FRAMES_" + flag;
    this.statusCode = 400;
    this.message = this.flag;
}

util.inherits(Frames, CauSportsNewsError);
exports.Frames = Frames;


function Mail(message, flag) {
    CauSportsNewsError.call(this);
    this.name = "Mail";
    this.flag = flag || "MAIL_ERR";
    this.message = message || "";
    this.statusCode = 500;
}

util.inherits(Mail, CauSportsNewsError);
exports.Mail = Mail;
