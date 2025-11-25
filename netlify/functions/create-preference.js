// Netlify Function para criar preferência de pagamento no Mercado Pago
const mercadopago = require('mercadopago');

exports.handler = async (event, context) => {
    // Configurar CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    // Responder a requisições OPTIONS (preflight)
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Apenas aceitar POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Configurar Mercado Pago com Access Token
        mercadopago.configure({
            access_token: process.env.MP_ACCESS_TOKEN
        });

        // Obter dados do pedido
        const item = JSON.parse(event.body);

        // Criar preferência de pagamento
        const preference = {
            items: [
                {
                    title: item.title,
                    description: item.description,
                    unit_price: parseFloat(item.price),
                    quantity: parseInt(item.quantity) || 1,
                }
            ],
            back_urls: {
                success: `${process.env.URL}/sucesso.html`,
                failure: `${process.env.URL}/checkout.html?error=payment_failed`,
                pending: `${process.env.URL}/checkout.html?status=pending`
            },
            auto_return: 'approved',
            statement_descriptor: 'SDJ GAMES',
            external_reference: `SDJ-${Date.now()}`,
            notification_url: `${process.env.URL}/.netlify/functions/webhook`,
            payment_methods: {
                excluded_payment_types: [],
                installments: 12
            }
        };

        // Criar preferência
        const response = await mercadopago.preferences.create(preference);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                id: response.body.id,
                init_point: response.body.init_point
            })
        };

    } catch (error) {
        console.error('Erro ao criar preferência:', error);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Erro ao processar pagamento',
                message: error.message
            })
        };
    }
};
