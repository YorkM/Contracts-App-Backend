const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        await mongoose.connect( process.env.DB_CONN, {
            // useNewUrlParser: true,
            // useUnifiedTopoLogy: true,
            // useCreateIndex: true
        });

        console.log('Conexión a la DB hecha correctamente');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la DB');        
    }
}

module.exports = { 
    dbConnection
}