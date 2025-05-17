const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Usar a porta fornecida pelo Render ou usar 3005 como fallback para desenvolvimento local
const port = process.env.PORT || 3005;

app.use(express.static('public'));

app.post("/login", (req, res) => {
    try {
        const { nome, senha } = req.body

        if (!nome || !senha) {
            return res.status(400).json({
                message: "The username or password field was not filled in!"
            });
        }

        if (nome !== "admin" || senha !== "123") {
            return res.status(401).json({
                message: "The username or password is incorrect or has not been registered!"
            });
        }

        return res.status(200).json({
            id: 1,
            nome: "admin",
            email: "admin@email.com"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to communicate with the server!"
        });
    }
});

app.get("/vehicles", (req, res) => {
    try {
        // Obter a URL base da requisição atual
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        
        const vehicles = [
            {
                id: 1,
                vehicle: "Ranger",
                volumetotal: 3800,
                connected: 1600,
                softwareUpdates: 2100,
                img: `${baseUrl}/img/ranger.png`
            },
            {
                id: 2,
                vehicle: "Mustang",
                volumetotal: 1500,
                connected: 500,
                softwareUpdates: 750,
                img: `${baseUrl}/img/mustang.png`
            },
            {
                id: 3,
                vehicle: "Territory",
                volumetotal: 2650,
                connected: 900,
                softwareUpdates: 1200,
                img: `${baseUrl}/img/territory.png`
            },
            {
                id: 4,
                vehicle: "Bronco Sport",
                volumetotal: 2200,
                connected: 800,
                softwareUpdates: 1000,
                img: `${baseUrl}/img/broncoSport.png`
            }
        ];

        return res.status(200).json({ vehicles });

    } catch (error) {
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
});

app.post("/vehicleData", (req, res) => {
    try {
        const { vin } = req.body

        switch (vin) {
            case "2FRHDUYS2Y63NHD22454":
                return res.status(200).json({
                    id: 1,
                    odometro: 50000,
                    nivelCombustivel: 90,
                    status: "on",
                    lat: -12.2322,
                    long: -35.2314
                });
            
            case "2RFAASOYS4E4HDU34875":
                return res.status(200).json({
                    id: 2,
                    odometro: 15000,
                    nivelCombustivel: 50,
                    status: "off",
                    lat: -19.8955,
                    long: 14.2426
                });

            case "3FRTRXYS8Y63HDU55612":
                return res.status(200).json({
                    id: 3,
                    odometro: 78000,
                    nivelCombustivel: 70,
                    status: "on",
                    lat: -23.5505,
                    long: -46.6333
                });
    
            case "4BRHTUAS9U91HDK90233":
                return res.status(200).json({
                    id: 4,
                    odometro: 32000,
                    nivelCombustivel: 30,
                    status: "off",
                    lat: -22.9068,
                    long: -43.1729
                });
    
            case "5KRJUYT84E91HDS73410":
                return res.status(200).json({
                    id: 5,
                    odometro: 10500,
                    nivelCombustivel: 95,
                    status: "on",
                    lat: -15.7942,
                    long: -47.8822
                });
    
            case "6MRGDSY53T02HDP99872":
                return res.status(200).json({
                    id: 6,
                    odometro: 44000,
                    nivelCombustivel: 60,
                    status: "off",
                    lat: -8.0476,
                    long: -34.8770
                });
        
            default:
                return res.status(400).json({
                    message: "Código VIN utilizado não foi encontrado!"
                });
        }


    } catch (error) {
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
